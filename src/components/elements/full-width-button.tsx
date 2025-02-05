import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface FullwidthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

export function FullWidthButton({ children, ...props }: FullwidthButtonProps) {
	return (
		<button
			className=" gap-2 w-full flex justify-center items-center px-3 text-btn font-regular py-4 bg-theme-blue-base text-foreground rounded-sm hover:bg-theme-blue-light "
			{...props}
		>
			{children}
		</button>
	);
}
