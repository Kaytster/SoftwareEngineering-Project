interface InputProps {
  name: string;
  id: string;
  type: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function InputField({
  name,
  id,
  type,
  placeholder = "",
  className,
  required
}: InputProps) {
  return (
    <input
      name={name}
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      className={
        `block bg-light-secondary rounded-full py-2 px-4` +
        (className ? " " + className : "")
      }
    />
  );
}
