import { ReactNode } from "react";

export default function Card({
  title,
  className,
  children,
}: {
  title?: string;
  className?: string;
  children: ReactNode | ReactNode[];
}) {
  return (
    <div
      className={
        `bg-secondary w-100 p-8 rounded-lg flex flex-col gap-3` + (className
          ? " " + className
          : "")
      }
    >
      {title && (
        <h2 className="text-center rounded-full bg-primary text-2xl p-2">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}
