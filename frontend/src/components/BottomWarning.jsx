import { Link } from "react-router-dom";

export default function BottomWarning({ warning, text, to }) {
    return (
        <div className="flex justify-center py-2 text-sm text-slate-500">
            <span>{warning}</span>
            <Link className="pl-1 font-semibold text-blue-700 transition hover:text-blue-900" to={to}>
                {text}
            </Link>
        </div>
    );
}
