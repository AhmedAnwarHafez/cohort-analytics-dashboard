import type { Actions, PageServerLoad } from './$types';
import { fetchAll, fetchMyOrganisations } from './trello';
// import { boards } from './boards';

export type Data = Awaited<ReturnType<typeof load>>;

export const load = (async ({ url }) => {
	if (!url.searchParams.has('orgs')) {
		const organisations = await fetchMyOrganisations();
		return {
			organisations,
			boards: []
		};
	}

	const boardNames = url.searchParams.getAll('orgs');
	const boards = await fetchAll(boardNames);
	const aggregatedBoards = boards
		// put the cards in the board object
		.map((board) => ({
			...board,
			cards: board.lists.flatMap((list) => list.cards)
		}))
		.map((board) => ({
			name: board.name,
			bounces: board.cards
				// filter out cards that don't have actions
				.filter((card) => card.actions.length > 0)
				// filter out cards that don't have a CP or WD in the name
				.filter((card) => card.name.match(/cp/i) || card.name.match(/WD/i))
				// calculate the number of moves from For Review to Needs Action
				.reduce(
					(acc, card) =>
						card.actions.some(
							(action) =>
								action.after!.match(/Needs Action/i) && action.before!.match(/For Review/i)
						)
							? acc + 1
							: acc,
					0
				)
		}))
		.sort((a, b) => b.bounces - a.bounces);

	return {
		organisations: [],
		boards: aggregatedBoards
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = await request.formData();
		if (cookies.get('boards')) {
			const boards = JSON.parse(cookies.get('boards') as string);
			const newBoard = data.get('board') ?? [];
			const newBoards = [...boards, newBoard];
			cookies.set('boards', JSON.stringify(newBoards), { path: '/' });
		} else {
			const newBoard = data.get('board') ?? [];
			cookies.set('boards', JSON.stringify([newBoard]), { path: '/' });
		}
	}
};
