import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance.1"
import { Users } from "../components/Users"

export const Dashboard = () => {
    return <div>
         <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>

    </div>
}