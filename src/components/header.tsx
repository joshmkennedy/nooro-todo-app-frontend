import Link from "next/link";
import AppLogo from "./app-logo";

export default function Header() {
	return (
		<header className="bg-[#0D0D0D] py-[72px]">
		<Link href={`/`} className="flex items-center justify-center font-bold text-[40px]  gap-3 ">
			<AppLogo/>
			<h1 className="font-bold">
				<span className="text-[#4EA8DE]">Todo</span> <span className="text-[#5E60CE]">App</span>
			</h1>
			</Link>
		</header>
	);
}
