export default function Appbar(){
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4 text-xl font-medium">
            Paytm App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 text-lg font-medium">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-4">
                <div className="flex flex-col justify-center h-full text-xl font-bold">
                    U
                </div>
            </div>
        </div>
    </div>
}