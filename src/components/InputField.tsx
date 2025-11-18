interface InputProps {
  name: string;
  id: string;
  type: string;
  placeholder?: string;
  className?: string;
}

export default function InputField({
  name,
  id,
  type,
  placeholder = "",
  className,
}: InputProps) {
  return (
    <input
      name={name}
      id={id}
      type={type}
      placeholder={placeholder}
      className={
        `block bg-light-secondary rounded-full py-2 px-4` +
        (className ? " " + className : "")
      }
    />
  );
}
