
export default function InputBox({label,placeHolder,onchange}) {
    return (
        <>
        <div className="w-full text-left ms-5 font-medium">{label}</div>
        <div className="w-full text-left ms-10"><input type="text" placeholder={placeHolder} onChange={onchange} className="w-4/5" /></div>
        </>
    )
}