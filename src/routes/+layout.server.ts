// import github token from .env file as a static value
import { GITHUB_TOKEN } from '$env/static/private';

import { responseStudents } from '../lib/data/students';

export async function load() {
	const cohort = 'horoeka-2022';
	const students = await getMembersByOrg(cohort);
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
