import type {LinkButtonProps} from "../../../Type/Type.ts";

function LinkButton({ label, href }: LinkButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
        >
            {label}
        </a>
    )
}

export default LinkButton
