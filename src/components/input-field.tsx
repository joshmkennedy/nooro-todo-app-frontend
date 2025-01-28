export function InputField({
  defaultValue,
  inputType,
  id,
  name,
}: {
  defaultValue?: string;
  inputType: string;
  name: string;
  id: string;
}) {
  return (
    <input
      defaultValue={defaultValue}
      className="border border-theme-gray-200 rounded-lg text-sm p-4 text-foreground bg-theme-gray-300 placeholder:text-theme-gray-100"
      type={inputType}
      name={name}
      id={id}
    />
  );
}
