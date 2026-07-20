import { useEffect, useState } from "react";
import SButton from "./SButton";
import { useNavigate } from "react-router-dom";
import api from "../api";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await api.get(`/user/bulk?filter=${encodeURIComponent(filter)}`);
                setUsers(response.data.users);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [filter]);

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <div className="text-lg font-black text-slate-950">Send Money</div>
                    <div className="text-sm text-slate-500">Search classmates by name or email.</div>
                </div>
                <div className="rounded-2xl bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700">Pay</div>
            </div>
            <div className="relative mt-5">
                <span className="absolute left-4 top-3.5 text-slate-400">⌕</span>
                <input
                    type="text"
                    placeholder="Search recipient..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-950 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div className="mt-5 space-y-3">
                {loading && <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-500">Searching users...</div>}
                {!loading && users.map((user) => <User key={user._id} user={user} />)}
                {!loading && users.length === 0 && <div className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-500">No users found.</div>}
            </div>
        </div>
    );
};

function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-3 transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-100/60">
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-black text-white">
                    {user.firstName[0]}
                </div>
                <div className="min-w-0">
                    <div className="truncate font-bold text-slate-900">{user.firstName} {user.lastName}</div>
                    <div className="truncate text-sm text-slate-500">{user.email}</div>
                </div>
            </div>
            <SButton action="Send" onchange={() => navigate(`/send?id=${user._id}&name=${encodeURIComponent(user.firstName)}`)} />
        </div>
    );
}
