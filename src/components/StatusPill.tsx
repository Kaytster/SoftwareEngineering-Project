import { ReactNode } from "react";

export default function StatusPill({
  status,
  children
}: {
  status: "success" | "warning" | "error";
  children: ReactNode;
}) {

	let bgColor = "bg-stone-300";

	switch (status) {
		case "success":
			bgColor = "bg-green-400";
			break;
		case "warning":
			bgColor = "bg-yellow-300";
			break;
		case "error":
			bgColor = "bg-red-400";
			break;
	}

  return <div className={`rounded-full text-center p-1 ${bgColor}`}>
		{children}
	</div>;
}
