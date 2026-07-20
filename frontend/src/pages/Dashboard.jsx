import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import { Users } from "../components/Users";
import api from "../api";

export default function Dashboard() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState(0);
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let ignore = false;

        const timer = setTimeout(async () => {
            try {
                const [meResponse, balanceResponse, transactionResponse] = await Promise.all([
                    api.get("/user/me"),
                    api.get("/account/balance"),
                    api.get("/account/transactions")
                ]);

                if (!ignore) {
                    setUser(meResponse.data.user);
                    setBalance(balanceResponse.data.balance);
                    setTransactions(transactionResponse.data.transactions);
                }
            } catch {
                if (!ignore) {
                    setMessage("Please sign in again to view your wallet.");
                    localStorage.removeItem("token");
                    setTimeout(() => navigate("/signin"), 1000);
                }
            }
        }, 0);

        return () => {
            ignore = true;
            clearTimeout(timer);
        };
    }, [navigate]);

    const totalSent = transactions
        .filter((transaction) => transaction.type === "debit")
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Appbar user={user} />
            <main className="mx-auto max-w-6xl px-5 py-8">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <div className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">Wallet Dashboard</div>
                        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">Manage your money beautifully.</h1>
                        <p className="mt-2 max-w-2xl text-slate-500">A polished practical-demo dashboard with live balance, secure recipient search, and transaction records.</p>
                    </div>
                    <div className="rounded-2xl bg-white/80 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm backdrop-blur">
                        Demo Status: <span className="text-green-600">Ready</span>
                    </div>
                </div>

                {message && <div className="mb-4 rounded-2xl bg-red-50 p-4 font-medium text-red-700 shadow-sm">{message}</div>}

                <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                    <Balance amt={balance} />
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                        <Metric label="Recent Transfers" value={transactions.length} helper="latest wallet activity" />
                        <Metric label="Total Sent" value={`₹${totalSent.toLocaleString("en-IN")}`} helper="from recent history" />
                    </div>
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
                    <Users />
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-black text-slate-950">Recent Transactions</h2>
                                <p className="text-sm text-slate-500">Credits and debits from your wallet.</p>
                            </div>
                            <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600">History</div>
                        </div>
                        <div className="mt-5 space-y-3">
                            {transactions.length === 0 && <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-500">No transfers yet.</div>}
                            {transactions.map((transaction) => {
                                const person = transaction.type === "debit" ? transaction.to : transaction.from;
                                return (
                                    <div key={transaction._id} className="flex items-center justify-between rounded-2xl border border-slate-100 p-4 transition hover:bg-slate-50">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <div className={transaction.type === "credit" ? "flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 font-black text-green-700" : "flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 font-black text-red-700"}>
                                                {transaction.type === "credit" ? "↓" : "↑"}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="truncate font-bold text-slate-900">{person.firstName} {person.lastName}</div>
                                                <div className="text-xs text-slate-500">{new Date(transaction.createdAt).toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div className={transaction.type === "credit" ? "font-black text-green-600" : "font-black text-red-600"}>
                                            {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString("en-IN")}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function Metric({ label, value, helper }) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="text-sm font-semibold text-slate-500">{label}</div>
            <div className="mt-2 text-3xl font-black text-slate-950">{value}</div>
            <div className="mt-2 text-sm text-slate-400">{helper}</div>
        </div>
    );
}
