import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom"


export const Signup = () => {
    
    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
                <Heading label="Sign Up"/>
                <SubHeading label="Enter your infromation to create an account"/>
                <InputBox onChange= {(e) => {
                    setFirstname(e.target.value);
                }}label =  "First Name" placeholder="Hemant"/>
                <InputBox onChange= {(e) => {
                    setLastname(e.target.value);
                }} label =  "Last Name" placeholder="Kumar"/>
                <InputBox onChange= {(e) => {
                    setUsername(e.target.value);
                }} label =  "Email" placeholder="Hemant@gmail.com"/>
                <InputBox onChange= {(e) => {
                    setPassword(e.target.value);
                }} label =  "Password" placeholder="123456"/>
                <div className="pt-4">
                     <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                            username,
                            firstname,
                            lastname,
                            password
                        });
                        localStorage.setItem("token", response.data.token)   // key : value pair  // token : token returned from backend
                        navigate("/dashboard");
                     }} label={"Sign Up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Login"} to={"/signin"} />
                

            </div>
            
        </div>
    </div>
}