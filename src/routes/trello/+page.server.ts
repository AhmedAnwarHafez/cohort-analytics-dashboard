import type { Actions, PageServerLoad } from './$types';

export type Data = Awaited<ReturnType<typeof load>>;

export const load = (async ({ cookies }) => {
	const data = cookies.get('boards');

	if (data) {
		const boards = JSON.parse(data);
		console.log(boards);

		return {
			boards
		};
	}

	return {
		boards: []
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
