export default function Heading({ label, align = "center" }) {
    return (
        <h1 className={`${align === "left" ? "text-left" : "text-center"} text-3xl font-black tracking-tight text-slate-950 sm:text-4xl`}>
            {label}
        </h1>
    );
}
