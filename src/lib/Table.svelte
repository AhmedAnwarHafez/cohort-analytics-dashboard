<script lang="ts">
	import _ from 'lodash';
	import type { StudentGithubAggregate } from 'src/routes/+layout.server';

	export let data: StudentGithubAggregate[];
	$: students = _.sortBy(data, ['githubLogin']);
	$: uniqueStudents = _.uniqBy(students, 'githubLogin');
	$: groupedByRepo = _.groupBy(students, 'repo');

	// group by repo and then by student then calculate the average
	$: groupedByRepoAndStudent = _.mapValues(groupedByRepo, (students) =>
		_.mapValues(_.groupBy(students, 'githubLogin'), (student) =>
			_.meanBy(student, 'daysSpentOnChallenge')
		)
	);

	// group by student and then by repo
	$: groupedByStudentAndRepo = _.mapValues(_.groupBy(students, 'githubLogin'), (students) =>
		_.mapValues(_.groupBy(students, 'repo'), (student) => _.meanBy(student, 'daysSpentOnChallenge'))
	);
</script>

<div class="table w-full rounded-xl border-2 border-slate-500 p-4 text-lg text-slate-300">
	<div class="table-header-group bg-slate-700">
		<div class="table-row">
			<div class="table-cell ">Student</div>
			{#each Object.keys(groupedByRepo) as challenge}
				<div class="table-cell text-center">{challenge}</div>
			{/each}
			<div class="table-cell text-center">AVG</div>
		</div>
	</div>
	<div class="table-row-group">
		{#each uniqueStudents as { githubLogin }}
			<div class="table-row hover:bg-slate-600 hover:text-slate-100">
				<div class="table-cell">{githubLogin}</div>
				{#each Object.keys(groupedByRepo) as challenge}
					<div class="table-cell text-center">
						{groupedByRepoAndStudent[challenge][githubLogin]}
					</div>
				{/each}
				<div class="table-cell text-center">
					{_.mean(Object.values(groupedByStudentAndRepo[githubLogin])).toFixed(2)}
				</div>
			</div>
		{/each}
	</div>
	<div class="table-row-group">
		<div class="table-row">
			<div class="table-cell">TOTAL AVG</div>
			{#each Object.keys(groupedByRepoAndStudent) as challenge}
				<div class="table-cell text-center">
					{_.mean(Object.values(groupedByRepoAndStudent[challenge])).toFixed(2)}
				</div>
			{/each}
		</div>
	</div>

	<!-- <div class="table-footer-group">
		<div class="table-row bg-slate-700">
			<div class="table-cell text-right">AVG</div>
			<div class="table-cell text-right">5.5</div>
		</div>
	</div> -->
</div>
