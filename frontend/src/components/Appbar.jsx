import { useNavigate } from "react-router-dom";

export default function Appbar({ user }) {
    const navigate = useNavigate();
    const initial = user?.firstName?.[0]?.toUpperCase() || "U";

    return (
        <header className="sticky top-0 z-20 border-b border-white/70 bg-white/85 px-5 shadow-sm backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-6xl items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-xl font-black text-white shadow-lg shadow-blue-600/25">₹</div>
                    <div>
                        <div className="text-xl font-black tracking-tight text-slate-950">SimplePay</div>
                        <div className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">Digital Wallet</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                        <div className="text-xs text-slate-500">Welcome back</div>
                        <div className="font-bold text-slate-900">{user ? `${user.firstName} ${user.lastName}` : "User"}</div>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-lg shadow-slate-950/20">
                        {initial}
                    </div>
                    <button
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/signin");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
