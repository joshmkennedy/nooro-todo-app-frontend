import ClipboardIcon from "./elements/icons/clipboard-icon";

export default function NoTasks(){
	return <div className="text-center text-theme-gray-100 flex flex-col items-center gap-4 py-14 border-t border-200">
			<ClipboardIcon />
			<p className="font-regular">You don&apos;t have any tasks registered yet.</p>
			<p>Create tasks and organize your to-do items.</p>
		</div>
}
