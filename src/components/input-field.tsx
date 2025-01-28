
export function InputField(props:Record<string,string|boolean|undefined>) {
  return (
    <input
      className="border border-theme-gray-200 rounded-lg text-sm p-4 text-foreground bg-theme-gray-300 placeholder:text-theme-gray-100"
      {...props}
    />
  );
}
