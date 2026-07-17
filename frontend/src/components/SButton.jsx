export default function SButton({action,onchange}) {
    return <div>
        <button onClick={onchange} className="hover:cursor-pointer relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-red-200 via-red-300 to-yellow-200 p-0.5 text-sm font-medium hover:from-red-300 hover:via-red-400 hover:to-yellow-300 focus:outline-none focus:ring-4 focus:ring-red-100">
            <span className="rounded-md bg-white px-4 py-2 transition duration-200 group-hover:bg-transparent">
                {action}
            </span>
        </button>
    </div>
}