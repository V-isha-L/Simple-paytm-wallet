import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SButton from "../components/SButton";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api";

export default function SendMoney() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const userId = searchParams.get("id");
    const name = searchParams.get("name") || "User";
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const transferMoney = async () => {
        setLoading(true);
        setMessage("");

        try {
            await api.post("/account/transfer", {
                amount: Number(amount),
                to: userId
            });
            setMessage("Transfer completed successfully.");
            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (err) {
            setMessage(err.response?.data?.message || "Transfer failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell grid min-h-screen place-items-center px-4 py-10">
            <div className="glass-card w-full max-w-xl overflow-hidden rounded-[2rem]">
                <div className="bg-gradient-to-br from-blue-600 to-slate-950 p-8 text-white">
                    <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">Secure Transfer</div>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-2xl font-black text-blue-600 shadow-xl">
                            {name[0]}
                        </div>
                        <div>
                            <div className="text-sm text-blue-100">Sending money to</div>
                            <div className="text-2xl font-black">{name}</div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <Heading label="Enter Amount" />
                    <p className="mx-auto mt-3 max-w-sm text-center text-sm text-slate-500">The backend will validate balance and complete debit/credit using a MongoDB transaction.</p>
                    <div className="mt-8">
                        <InputBox label="Amount" type="number" placeHolder="Enter amount in rupees" value={amount} onchange={(e) => setAmount(e.target.value)} />
                    </div>
                    {message && (
                        <div className={message.includes("success") ? "mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700" : "mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700"}>
                            {message}
                        </div>
                    )}
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <SButton variant="secondary" action="Cancel" onchange={() => navigate("/dashboard")} />
                        <SButton action={loading ? "Transferring..." : "Initiate Transfer"} disabled={loading || !amount} onchange={transferMoney} />
                    </div>
                </div>
            </div>
        </div>
    );
}
