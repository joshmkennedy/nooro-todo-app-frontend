import {signout} from "@/server-api"
export function Footer(){
	return <footer>
		<div className="flex justify-end w-full max-w-[740px] mx-auto sm:p-2 xs:px-8">
			<button onClick={async ()=>{
				'use server'
				await signout()
			} } className="text-theme-gray-100 hover:text-white">
				signout
			</button>
		</div>
	</footer>
}
