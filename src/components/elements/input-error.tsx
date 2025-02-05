export function InputError({message}:{message:string}){
	if(!message) return null
	return <div className="w-full rounded-md p-4 bg-rose-800 text-rose-50 font-medium text-sm">{message}</div>
}
