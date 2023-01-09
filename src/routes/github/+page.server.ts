// import github token from .env file as a static value
import _ from 'lodash';
import { z } from 'zod';
import { GITHUB_TOKEN } from '$env/static/private';
import type { RequestEvent } from './$types';
import { error } from '@sveltejs/kit';

export type Cohort = {
	name: string;
	startDate: string;
};
export type Student = Awaited<ReturnType<typeof getMembersByOrg>>[0];
export type Repo = {
	name: string;
	createdAt: string;
};
export type StudentGithubAggregate = {
	org: string;
	repo: string;
	githubId: string;
	githubLogin: string;
	daysSpentOnChallenge: number;
	daysSinceForked: number;
	totalCount: number;
};

export async function load({ url, cookies }: RequestEvent) {
	let availableRepos: Repo[] = [];
	const availableCohortsCookie = cookies.get('availableCohorts');
	if (!availableCohortsCookie) {
		// first time user
		const cohorts = await getJoinedOrgs();
		const anHour = 60 * 60;
		cookies.set('availableCohorts', JSON.stringify(cohorts), { maxAge: anHour });
		return {
			cohorts: cohorts.map((cohort) => cohort.name),
			repos: [],
			students: [],
			githubAggregates: []
		};
	}

	if (!url.searchParams.has('cohort')) {
		return {
			cohorts: JSON.parse(availableCohortsCookie).map((cohort: Cohort) => cohort.name),
			repos: [],
			students: [],
			githubAggregates: []
		};
	}

	// split cohort name and date by the first |
	const selectedCohort = url.searchParams.get('cohort');
	if (!selectedCohort) {
		throw error(400, 'cohort not found');
	}

	const cohorts = JSON.parse(availableCohortsCookie) as Cohort[];

	const bootcampStart = cohorts.find((cohort) => cohort.name === selectedCohort)?.startDate;

	if (!bootcampStart) {
		throw error(400, 'cohort not found');
	}

	availableRepos = await getReposByOrg(selectedCohort);

	if (!url.searchParams.has('repos')) {
		return {
			cohorts: cohorts.map((cohort) => cohort.name),
			repos: availableRepos,
			students: [],
			githubAggregates: []
		};
	}
	const selectedRepos: string[] = url.searchParams.getAll('repos');

	const { githubAggregates, students } = await calculateAggregate(
		selectedCohort,
		selectedRepos,
		bootcampStart,
		availableRepos
	);

	return {
		cohorts: cohorts.map((cohort) => cohort.name),
		repos: availableRepos,
		students,
		githubAggregates
	};
}

async function calculateAggregate(
	selectedCohort: string,
	selectedRepos: string[],
	bootcampStart: string,
	availableRepos: Repo[]
) {
	const students = await getMembersByOrg(selectedCohort);

	// get students commit info for each repo
	const commits = await getAllCommits(selectedRepos, selectedCohort, bootcampStart, availableRepos);

	// map over commits and add student info
	const studentsCommits = commits.map((commit) => {
		const student = students.find((student) => student.id === commit.githubId);
		if (student) {
			commit.githubLogin = student.login;
		}
		return commit;
	});

	// sort commits by date
	const sortedCommits = _.sortBy(studentsCommits, 'committedDate');
	// group commits by student and repo
	const groupedCommits = _.groupBy(
		sortedCommits,
		(commit) => `${commit.githubLogin}-${commit.repo}`
	);

	// aggregate and calculate the difference between the first and last commit
	const githubAggregates: StudentGithubAggregate[] = Object.values(groupedCommits).map(
		(commits) => {
			const firstCommit = commits[0];
			const lastCommit = commits[commits.length - 1];
			const daysSpentOnChallenge = Math.abs(
				(lastCommit.committedDate.getTime() - firstCommit.committedDate.getTime()) / 86400000
			);
			const daysSinceForked = Math.abs(
				(firstCommit.committedDate.getTime() - firstCommit.createdAt.getTime()) / 86400000
			);

			// calculate total commits by counting commitId
			const totalCount = _.uniqBy(commits, 'commitId').length;

			const { githubId, githubLogin, repo, org } = firstCommit;
			return {
				org,
				repo,
				githubId,
				githubLogin,
				daysSpentOnChallenge,
				daysSinceForked,
				totalCount
			};
		}
	);

	return { githubAggregates, students };
}

async function getAllCommits(
	selectedRepos: string[],
	selectedCohort: string,
	bootcampStart: string,
	availableRepos: Repo[]
) {
	const allcommits = await Promise.all(
		selectedRepos.flatMap(async (repo) => {
			const createdAt = availableRepos.find(
				(availableRepo) => availableRepo.name === repo
			)?.createdAt;
			return await getCommitsByRepo(repo, selectedCohort, createdAt!, bootcampStart);
		})
	);

	return allcommits.flat();
}

async function getJoinedOrgs() {
	const query = `
{
	viewer {
		organizations(first: 100) {
			edges {
				node {
					login
					description
				}
			}
		}
	}
}
`;

	const jsonResponse = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		body: JSON.stringify({ query }),
		headers: {
			Authorization: `Bearer ${GITHUB_TOKEN}`
		}
	});
	const response = await jsonResponse.json();
	if (response.errors) {
		throw error(400, response.errors[0].message);
	}

	const responseData = z
		.object({
			data: z.object({
				viewer: z.object({
					organizations: z.object({
						edges: z.array(
							z.object({
								node: z.object({
									login: z.string(),
									description: z.nullable(z.string()) // cohort start date is stored in the description field as ISO format
								})
							})
						)
					})
				})
			})
		})
		.parse(response);

	const edges = responseData.data.viewer.organizations.edges;
	const orgs = edges
		.filter((edge) => edge.node.description) // only include orgs with a description
		.filter((edge) => !isNaN(Date.parse(edge.node.description!))) // only include orgs with a valid date
		.map((edge) => ({ name: edge.node.login, startDate: edge.node.description }));
	return orgs;
}

async function getMembersByOrg(org: string) {
	const query = `
{
  organization(login: "${org}") {
    membersWithRole(first: 50) {
      edges {
        role
        node {
          id
          login
        }
      }
    }
  }
}
`;

	const jsonResponse = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		body: JSON.stringify({ query }),
		headers: {
			Authorization: `Bearer ${GITHUB_TOKEN}`
		}
	});
	const response = await jsonResponse.json();

	const responseData = z
		.object({
			data: z.object({
				organization: z.object({
					membersWithRole: z.object({
						edges: z.array(
							z.object({
								role: z.string(),
								node: z.object({
									id: z.string(),
									login: z.string()
								})
							})
						)
					})
				})
			})
		})
		.parse(response);

	return responseData.data.organization.membersWithRole.edges
		.filter((edge) => edge.role === 'MEMBER')
		.filter((edge) => edge.node.login !== 'toolseda')
		.flatMap((edge) => edge.node);
}

async function getReposByOrg(org: string) {
	const query = `
{
  organization(login: "${org}") {
    repositories(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
      edges {
        node {
          name
		  createdAt
        }
      }
    }
  }
}`;

	const jsonResponse = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		body: JSON.stringify({ query }),
		headers: {
			Authorization: `Bearer ${GITHUB_TOKEN}`
		}
	});

	const response = await jsonResponse.json();

	const data = z
		.object({
			data: z.object({
				organization: z.object({
					repositories: z.object({
						edges: z.array(
							z.object({
								node: z.object({
									name: z.string(),
									createdAt: z.string()
								})
							})
						)
					})
				})
			})
		})
		.parse(response);

	return data.data.organization.repositories.edges.map((edge) => ({
		name: edge.node.name,
		createdAt: edge.node.createdAt
	}));
}

async function getCommitsByRepo(
	repoName: string,
	orgName: string,
	createdAt: string,
	startDate: string
) {
	// add 9 weeks to startDate
	const bootcampEndDate = new Date(startDate);
	bootcampEndDate.setDate(bootcampEndDate.getDate() + 68);

	const query = makeQuery(repoName, orgName, createdAt, bootcampEndDate);

	const jsonResponse = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		body: JSON.stringify({ query }),
		headers: {
			Authorization: `Bearer ${GITHUB_TOKEN}`
		}
	});
	const response = await jsonResponse.json();
	if (response.errors) {
		throw new Error(response.errors[0].message);
	}

	const data = z
		.object({
			data: z.object({
				repository: z.object({
					createdAt: z.string(),
					refs: z.object({
						nodes: z.array(
							z.object({
								target: z.object({
									history: z.object({
										totalCount: z.number(),
										nodes: z.array(
											z.object({
												id: z.string(),
												committedDate: z.string(),
												author: z.object({
													user: z.nullable(
														z.object({
															id: z.optional(z.string()),
															login: z.optional(z.string())
														})
													)
												})
											})
										)
									})
								})
							})
						)
					})
				})
			})
		})
		.parse(response);

	return data.data.repository.refs.nodes.flatMap((node) =>
		node.target.history.nodes
			// filter out commits that don't have an author
			.filter(
				(commit) =>
					commit.author.user !== null &&
					commit.author.user.id !== null &&
					commit.author.user.id !== undefined &&
					commit.author.user.login !== undefined &&
					'user' in commit.author &&
					'id' in commit.author.user
			)
			.flatMap((commit) => ({
				commitId: commit.id,
				totalCount: node.target.history.totalCount,
				createdAt: new Date(data.data.repository.createdAt),
				committedDate: new Date(commit.committedDate),
				// ignore this eslint warning, it's a false positive
				githubId: commit.author.user!.id || 'unknown',
				githubLogin: commit.author.user!.login || 'unknown',
				org: orgName,
				repo: repoName
			}))
	);
}

function makeQuery(repoName: string, orgName: string, createdAt: string, bootcampEndDate: Date) {
	return `
{
  repository(name: "${repoName}", owner: "${orgName}") {
    createdAt
    refs(
      refPrefix: "refs/heads/"
      orderBy: {direction: DESC, field: TAG_COMMIT_DATE}
      first: 100
    ) {
      nodes {
        target {
          ... on Commit {
            history(first: 50, since: "${createdAt}", until: "${bootcampEndDate.toISOString()}") {
              totalCount
              nodes {
                ... on Commit {
                  committedDate
				  id
                  author {
                    name
                    user {
                      id
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

	`;
}
