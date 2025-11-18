interface TextAreaProps {
	name: string;
	id: string;
	placeholder?: string;
	className?: string;
	rows?: number;
}

export default function TextArea({name, id, placeholder, className, rows = 3}: TextAreaProps) {
	const propsObj: TextAreaProps = {
		name,
		id,
		//                                                           py-2 * 2 + 4 + 2
		//                                                                    should be exactly 6 lines
		className: "block bg-light-secondary rounded-2.5xl py-2 px-4 min-h-10 max-h-40",
		rows
	}

	if (placeholder && placeholder.trim().length > 0) {
		propsObj.placeholder = placeholder;
	}

	if (className && className.trim().length > 0) {
		propsObj.className += " " + className;
	}

	return <textarea {...propsObj} />
}