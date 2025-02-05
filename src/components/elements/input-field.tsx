import React, { InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> 

export function InputField({ ...props }: InputFieldProps) {
  return (
    <input
      className="border border-theme-gray-200 rounded-lg text-sm p-4 text-foreground bg-theme-gray-300 placeholder:text-theme-gray-100"
      {...props}
    />
  );
}
