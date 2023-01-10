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

	const orgs = url.searchParams.getAll('orgs');
	const boards = await fetchAll(orgs);
	const aggregatedBoards = boards
		// put the cards in the board object
		.map((board) => ({
			...board,
			cards: board.lists.flatMap((list) => list.cards)
		}))
		.map((board) => {
			const cards = board.cards

				// filter out cards that don't have actions
				.filter((card) => card.actions.length > 0)
				.filter((card) => card.name.match(/cp/i) || card.name.match(/WD/i))
				.filter((card) =>
					card.actions.some(
						(action) => action.after!.match(/Needs Action/i) && action.before!.match(/For Review/i)
					)
				)
				.flatMap(({ id, shortUrl, name, actions }) => ({
					id,
					name,
					shortUrl: shortUrl,
					bounces: actions.filter(
						(action) => action.before!.match(/For Review/i) && action.after!.match(/Needs Action/i)
					).length
				}));
			return {
				name: board.name,
				shortUrl: board.shortUrl,
				cards,
				totalBounces: cards.reduce((acc, card) => acc + card.bounces, 0)
			};
		})
		.sort((a, b) => b.totalBounces - a.totalBounces);

	//TODO: this should be stored in a cookie or something, will fix it later
	const organisations = await fetchMyOrganisations();
	return {
		organisations: organisations,
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
