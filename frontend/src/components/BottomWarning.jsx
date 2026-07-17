import {Link} from "react-router-dom"


export default function BottomWarning({warning,text,to}) {
    return <div className="py-2 text-sm flex justify-center">
        <span>{warning}</span>
        <Link className="pointer underline pl-1 cursor-pointer" to={to} >{text}</Link>
    </div>
}