export default function SButton({ action, onchange, disabled = false, variant = "primary", fullWidth = false }) {
    const variants = {
        primary: "bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 focus:ring-blue-200",
        dark: "bg-slate-950 text-white shadow-lg shadow-slate-950/20 hover:bg-slate-800 focus:ring-slate-200",
        secondary: "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-200",
        danger: "bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-700 focus:ring-red-200"
    };

    return (
        <button
            onClick={onchange}
            disabled={disabled}
            className={`${fullWidth ? "w-full" : ""} rounded-xl px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]}`}
        >
            {action}
        </button>
    );
}
