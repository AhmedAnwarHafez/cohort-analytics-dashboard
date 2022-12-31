import z from 'zod';
import { TRELLO_KEY, TRELLO_TOKEN } from '$env/static/private';

const baseUrl = 'https://api.trello.com/1';
const apiQueryString = `?key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`;

type Board = Awaited<ReturnType<typeof fetchBatchBoardsFromOrgIds>>[0];
type List = Awaited<ReturnType<typeof fetchBatchListsFromBoardIds>>[0]['lists'][0];
type BoardWithLists = Awaited<ReturnType<typeof fetchBatchListsFromBoardIds>>[0];

export async function fetchAll(orgs: string[]) {
	const boards = await fetchBatchBoardsFromOrgIds(orgs);
	const listData = await fetchBatchListsFromBoardIds(boards);
	const boardsWithListsAndCards = await fetchAndProcessLists(listData);
	return boardsWithListsAndCards;
}

const fetchBatchBoardsFromOrgIds = async (orgIds: string[]) => {
	const url = `${baseUrl}/batch${apiQueryString}&urls=${orgIds
		.map((orgId) => `/organizations/${orgId}/boards`)
		.join(',')}`;

	const res = await fetch(url);
	const data = await res.json();

	const schema = z.array(
		z.object({
			'200': z.array(
				z.object({
					name: z.string(),
					id: z.string()
				})
			)
		})
	);

	const boards = schema.parse(data);
	return boards.flatMap((board) => board['200']);
};

const fetchBatchListsFromBoardIds = async (boards: Board[]) => {
	const boardIds = boards.map((board) => board.id);
	const url = `${baseUrl}/batch${apiQueryString}&urls=${boardIds
		.map((boardId) => `/boards/${boardId}/lists`)
		.join(',')}`;

	const response = await fetch(url);
	const data = await response.json();

	const schema = z.array(
		z.object({
			'200': z.array(
				z.object({
					name: z.string(),
					id: z.string()
				})
			)
		})
	);

	const collection = schema.parse(data);
	return collection.map((list, index) => ({
		...boards[index],
		lists: list['200'].map((list) => ({ name: list.name, id: list.id }))
	}));
};

type ListIds = List['id'][];
const fetchBatchCards = async (listIds: ListIds) => {
	return await fetch(
		`${baseUrl}/batch${apiQueryString}&urls=${listIds
			.map((listId) => `/lists/${listId}/cards`)
			.join(',')}`
	)
		.then((res) => res.json())
		.then((data) => {
			const cards = z
				.array(
					z.object({
						'200': z.array(
							z.object({
								name: z.string(),
								id: z.string()
							})
						)
					})
				)
				.parse(data);

			return Promise.all(
				cards
					.map((cards) => cards['200'])
					.map(async (cards) => {
						const cardIds = cards.map((card) => card.id);
						const actionsOfAllCards = cardIds.length > 0 ? await fetchActions(cardIds) : [];
						return cards.map((card) => ({
							id: card.id,
							name: card.name,
							actions: actionsOfAllCards
								.filter((actions) => actions.some((action) => action.data.card.id === card.id))
								.flatMap((action) => action)
								.filter((action) => action.type === 'updateCard')
								.flatMap((action) => ({
									before: action.data?.listBefore?.name,
									after: action.data?.listAfter?.name,
									date: action.date
								}))
						}));
					})
			);
		});
};

const fetchActions = async (cardIds: string[]) => {
	const response = await fetch(
		`${baseUrl}/batch${apiQueryString}&urls=${cardIds
			.map((cardId) => `/cards/${cardId}/actions`)
			.join(',')}`
	);

	const data = z
		.array(
			z.object({
				'200': z.array(
					z.object({
						type: z.string(),
						date: z.string(),
						data: z.object({
							listBefore: z
								.object({
									name: z.string()
								})
								.optional(),
							listAfter: z
								.object({
									name: z.string()
								})
								.optional(),
							card: z.object({
								id: z.string()
							})
						})
					})
				)
			})
		)
		.parse(await response.json());
	return data.map((actions) => actions['200']);
};

const fetchAndProcessLists = async (boards: BoardWithLists[]) => {
	return Promise.all(
		boards.map(async (board) => {
			const listIds = board.lists.map((list) => list.id);
			const cards = await fetchBatchCards(listIds);
			return {
				...board,
				lists: board.lists.map((list, index) => ({
					...list,
					cards: cards[index].flat()
				}))
			};
		})
	);
};
