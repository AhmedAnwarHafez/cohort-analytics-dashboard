// import github token from .env file as a static value
import { GITHUB_TOKEN } from '$env/static/private';
import { rawResponse } from '$lib/data/commits';
import { error } from '@sveltejs/kit';
import _ from 'lodash';
import { responseStudents } from '../lib/data/students';

type Repo = typeof repos[0];
type Cohort = typeof cohortsInfo[0];
const cohortsInfo = [
	{
		name: 'horoeka-2022',
		startDate: '2022-10-09T00:00:00Z'
	}
];
const repos = [
	// {
	// 	name: 'jwt-auth',
	// 	week: 7
	// },
	// {
	// 	name: 'sweet-as-organics-api',
	// 	week: 6
	// },
	// {
	// 	name: 'todo-full-stack',
	// 	week: 6
	// },
	// {
	// 	name: 'react-to-web-api',
	// 	week: 5
	// },
	// {
	// 	name: 'worldwide-routing',
	// 	week: 4
	// },
	// {
	// 	name: 'dreamfest',
	// 	week: 3
	// },
	{
		name: 'pupparazzi',
		week: 2
	}
];

export async function load() {
	// hard code cohort name for now, this will be passed from a dropdown
	const selectedCohort = 'horoeka-2022';

	const students = await getMembersByOrg(selectedCohort);

	const cohortInfo = cohortsInfo.find((cohort) => cohort.name === selectedCohort);
	if (!cohortInfo) {
		throw error(404, `Could not find cohort ${selectedCohort}`);
	}

	// get students commit info for each repo
	const commits = (
		await Promise.all(repos.map(async (repo) => await getCommittsByRepo(repo, cohortInfo)))
	).flat();

	// map over commits and add student info
	const studentsCommits = commits.map((commit) => {
		const student = students.find((student) => student.id === commit.githubId);
		if (student) {
			commit.githubLogin = student.login;
		}
		return commit;
	});

	return {
		students
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

async function getCommittsByRepo(repo: Repo, org: Cohort) {
	// add 9 weeks to org.startDate
	const bootcampEndDate = new Date(org.startDate);
	bootcampEndDate.setDate(bootcampEndDate.getDate() + 68);

	const forkedDate = new Date(org.startDate);
	forkedDate.setDate(forkedDate.getDate() + 10 * (repo.week - 1));

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
				createdAt: new Date(rawResponse.data.repository.createdAt),
				committedDate: new Date(commit.committedDate),
				// ignore this eslint warning, it's a false positive
				githubId: commit.author.user!.id,
				githubLogin: commit.author.user!.login,
				org: org.name,
				repo: repo.name
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
