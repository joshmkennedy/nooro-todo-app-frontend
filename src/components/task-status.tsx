export default async function TaskStatus({completedCount, total}:{completedCount:number, total:number}){
	return <p>Tasks: {total}, and Completed {completedCount} of {total}</p>
}
