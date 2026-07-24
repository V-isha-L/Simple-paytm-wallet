import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import SButton from "../components/SButton";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Signup() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createAccount = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await api.post("/user/signup", { firstName, lastName, email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setMessage(err.response?.data?.message || "Unable to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-shell grid min-h-screen place-items-center px-4 py-10">
            <div className="glass-card w-full max-w-2xl rounded-[2rem] p-8 sm:p-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-lg shadow-blue-600/30">₹</div>
                <div className="mt-5 flex flex-col items-center gap-3">
                    <Heading label="Create Wallet" />
                    <SubHeading label="Create your account to start managing secure wallet transfers." />
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <InputBox label="First Name" placeHolder="John" value={firstName} onchange={(e) => setFirstName(e.target.value)} />
                    <InputBox label="Last Name" placeHolder="Doe" value={lastName} onchange={(e) => setLastName(e.target.value)} />
                    <div className="sm:col-span-2">
                        <InputBox label="Email" placeHolder="johndoe123@gmail.com" value={email} onchange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="sm:col-span-2">
                        <InputBox label="Password" type="password" placeHolder="Minimum 6 characters" value={password} onchange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {message && <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{message}</div>}
                <div className="mt-6">
                    <SButton fullWidth action={loading ? "Creating..." : "Create Account"} disabled={loading} onchange={createAccount} />
                </div>
                <BottomWarning warning="Already have an account? " text="Sign In" to="/signin" />
            </div>
        </div>
    );
}
