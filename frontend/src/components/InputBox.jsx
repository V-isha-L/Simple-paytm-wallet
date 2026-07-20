export default function InputBox({ label, placeHolder, onchange, type = "text", value }) {
    return (
        <label className="w-full text-left text-sm font-semibold text-slate-700">
            {label}
            <input
                type={type}
                placeholder={placeHolder}
                onChange={onchange}
                value={value}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />
        </label>
    );
}
