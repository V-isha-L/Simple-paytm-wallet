export default function Balance({ amt }) {
    const formattedAmount = Number(amt || 0).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    });

    return (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-950 p-6 text-white shadow-2xl shadow-blue-900/20">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 right-20 h-44 w-44 rounded-full bg-cyan-300/10" />
            <div className="relative">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium uppercase tracking-[0.25em] text-blue-100">SimplePay Card</div>
                        <div className="mt-6 text-sm text-blue-100">Available Balance</div>
                    </div>
                    <div className="rounded-2xl bg-white/15 px-3 py-2 text-sm font-semibold backdrop-blur">Wallet</div>
                </div>
                <div className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">₹{formattedAmount}</div>
                <div className="mt-8 flex items-center justify-between text-sm text-blue-100">
                    <span>Protected by JWT</span>
                    <span>MongoDB Transactions</span>
                </div>
            </div>
        </div>
    );
}
