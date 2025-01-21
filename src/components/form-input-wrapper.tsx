import { JSX } from "react";

export default function FormInputWrapper({label, children, name}:{label:string, children:JSX.Element, name:string}){
	return <div className="flex flex-col gap-3">
		<label htmlFor={name} className="text-theme-blue-light font-regular text-sm">{label}</label>
		{children}
	</div>
}
