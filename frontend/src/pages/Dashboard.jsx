import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import {Users} from "../components/Users";


export default function Dashboard() {
    return <div>
        <Appbar></Appbar>
        <div className="my-5 ms-5">
            <Balance amt="10000"></Balance>
        </div>
        <Users></Users>
    </div>
}