export default async function TaskStatus({
	completedCount,
	total,
}: {
	completedCount: number;
	total: number;
}) {
	return (
		<div className="flex justify-between items-center">
			<div className="flex gap-1 text-sm font-regular">
				<span className="text-theme-blue-light">Tasks</span>
				<span className="bg-slate-700 text-foreground flex items-center justify-center aspect-square px-2 rounded-full text-xs ">
					{total}
				</span>
			</div>

			<div className="flex gap-1 text-sm font-regular">
				<span className="text-theme-purp-light">Completed</span>
				<span className="bg-slate-700 text-foreground flex items-center justify-center  px-1.5 rounded-full text-xs ">
					{completedCount} of {total}
				</span>
			</div>
		</div>
	);
}
