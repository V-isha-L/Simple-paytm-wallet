import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import SButton from "../components/SButton";
import BottomWarning from "../components/BottomWarning";
import api from "../api";

export default function Signin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignin = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await api.post("/user/signin", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setMessage(err.response?.data?.message || "Unable to sign in");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell grid min-h-screen place-items-center px-4 py-10">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] shadow-2xl lg:grid-cols-[1fr_0.95fr]">
                <section className="hidden bg-slate-950 p-10 text-white lg:block">
                    <div className="flex h-full flex-col justify-between rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-slate-900 p-8">
                        <div>
                            <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">SimplePay Wallet</div>
                            <h2 className="mt-8 text-5xl font-black leading-tight">Smart wallet transfers, built with MERN.</h2>
                            <p className="mt-5 text-blue-100">Manage your balance, send money securely, and keep track of every transaction in one place.</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur"><div className="text-2xl font-black">JWT</div><div className="text-xs text-blue-100">Auth</div></div>
                            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur"><div className="text-2xl font-black">ACID</div><div className="text-xs text-blue-100">Transfers</div></div>
                            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur"><div className="text-2xl font-black">UI</div><div className="text-xs text-blue-100">Ready</div></div>
                        </div>
                    </div>
                </section>
                <section className="glass-card flex flex-col items-center gap-5 p-8 sm:p-12">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-600/30">₹</div>
                    <Heading label="Welcome Back" />
                    <SubHeading label="Sign in to manage your SimplePay wallet." />
                    <InputBox label="Email" placeHolder="johndoe123@gmail.com" value={email} onchange={(e) => setEmail(e.target.value)} />
                    <InputBox label="Password" type="password" placeHolder="Your Password..." value={password} onchange={(e) => setPassword(e.target.value)} />
                    {message && <div className="w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{message}</div>}
                    <SButton fullWidth action={loading ? "Signing In..." : "Sign In"} disabled={loading} onchange={handleSignin} />
                    <BottomWarning warning="Don't have an account? " text="Sign Up" to="/signup" />
                </section>
            </div>
        </div>
    );
}
