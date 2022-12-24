// import github token from .env file as a static value
import { GITHUB_TOKEN } from '$env/static/private';
import { rawResponse } from '$lib/data/commits';
import { rawReposResponse } from '$lib/data/repos';
import { error, type ServerLoad } from '@sveltejs/kit';
import _ from 'lodash';
import { responseStudents } from '../lib/data/students';
import type { RequestEvent } from './$types';

export type Repo = {
	name: string;
	createdAt: Date;
};
type Cohort = typeof cohortsInfo[0];
export type StudentGithubAggregate = {
	org: string;
	repo: string;
	githubId: string;
	githubLogin: string;
	daysSpentOnChallenge: number;
	daysSinceForked: number;
	totalCount: number;
};

const cohortsInfo = [
	{
		name: 'horoeka-2022',
		startDate: '2022-10-09T00:00:00Z'
	}
];

export async function load({ url }: RequestEvent) {
	let repos: Repo[] = [];

	if (!url.searchParams.has('cohort')) {
		return {
			repos: [],
			students: [],
			githubAggregates: []
		};
	}

	const selectedCohort = url.searchParams.get('cohort');
	repos = await getReposByOrg(selectedCohort!);

	if (!url.searchParams.has('repos')) {
		return {
			repos: repos,
			students: [],
			githubAggregates: []
		};
	}
	const selectedRepos: string[] = url.searchParams.getAll('repos');

	const students = await getMembersByOrg(selectedCohort!);

	const cohortInfo = cohortsInfo.find((cohort) => cohort.name === selectedCohort);
	if (!cohortInfo) {
		throw error(404, `Could not find cohort ${selectedCohort}`);
	}

	// get students commit info for each repo
	const commits = (
		await Promise.all(selectedRepos.map(async (repo) => await getCommittsByRepo(repo, cohortInfo)))
	).flat();

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
				Math.round(
					(lastCommit.committedDate.getTime() - firstCommit.committedDate.getTime()) / 86400000
				)
			);
			const daysSinceForked = Math.abs(
				Math.round(
					(firstCommit.committedDate.getTime() - firstCommit.createdAt.getTime()) / 86400000
				)
			);
			const { githubId, githubLogin, repo, org } = firstCommit;
			return {
				org,
				repo,
				githubId,
				githubLogin,
				daysSpentOnChallenge,
				daysSinceForked,
				totalCount: firstCommit.totalCount
			};
		}
	);

	return {
		repos,
		students,
		githubAggregates
	};
}

async function getMembersByOrg(org: string) {
	const query = `
{
  organization(login: "horoeka-2022") {
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

	// const response = await fetch('https://api.github.com/graphql', {
	// 	method: 'POST',
	// 	body: JSON.stringify({ query }),
	// 	headers: {
	// 		Authorization: `Bearer ${GITHUB_TOKEN}`
	// 	}
	// });
	// const data = await response.json();

	return responseStudents.data.organization.membersWithRole.edges
		.filter((edge) => edge.role === 'MEMBER')
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

	// const response = await fetch('https://api.github.com/graphql', {
	// 	method: 'POST',
	// 	body: JSON.stringify({ query }),
	// 	headers: {
	// 		Authorization: `Bearer ${GITHUB_TOKEN}`
	// 	}
	// });
	// const data = await response.json();
	return rawReposResponse.data.organization.repositories.edges.map((edge) => ({
		name: edge.node.name,
		createdAt: new Date(edge.node.createdAt)
	}));
}

async function getCommittsByRepo(repoName: string, org: Cohort) {
	// add 9 weeks to org.startDate
	const bootcampEndDate = new Date(org.startDate);
	bootcampEndDate.setDate(bootcampEndDate.getDate() + 68);

	// const query = makeQuery(repo.name, org.name, forkedDate, bootcampEndDate);
	// const response = await fetch('https://api.github.com/graphql', {
	// 	method: 'POST',
	// 	body: JSON.stringify({ query }),
	// 	headers: {
	// 		Authorization: `Bearer ${GITHUB_TOKEN}`
	// 	}
	// });
	// const data: { data: Data } = await response.json();

	return rawResponse.data.repository.refs.nodes.flatMap((node) =>
		node.target.history.nodes
			// filter out commits that don't have an author
			.filter(
				(commit) =>
					commit.author.user !== null &&
					commit.author.user.id !== null &&
					'user' in commit.author &&
					'id' in commit.author.user
			)
			.flatMap((commit) => ({
				totalCount: node.target.history.totalCount,
				createdAt: new Date(rawResponse.data.repository.createdAt),
				committedDate: new Date(commit.committedDate),
				// ignore this eslint warning, it's a false positive
				githubId: commit.author.user!.id,
				githubLogin: commit.author.user!.login,
				org: org.name,
				repo: repoName
			}))
	);
}

function makeQuery(repoName: string, orgName: string, forkedDate: Date, bootcampEndDate: Date) {
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
            history(first: 50, since: "${forkedDate}", until: "${bootcampEndDate}") {
              totalCount
              nodes {
                ... on Commit {
                  committedDate
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
