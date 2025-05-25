'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Loading from "@/components/general/Loading";
import googleIcon from "../../public/assets/icons/googleIcon.png"
import { registerUser } from "@/api/userApi";
import axios from "axios";
import { validateParam } from "@/validation/authValidation";
import Alert from "./Common/Alerts/Alert";


function SignupForm() {
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);
    const [activateAlert, setAcitvateAlert] = useState(false);
    const router = useRouter();

    const clearAll = (() => {
        setError("");
        setloading(false);
        setName("")
        setEmail("")
        setPassword("")
    })


    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const value = validateParam(name, email, password);
        if (value != null) {
            setError(value)
            return;
        }
        try {
            setloading(true);
            const data = await registerUser(name, email, password);
            console.log('User register succesfully', data);
            setAcitvateAlert(true)
            clearAll()
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err: unknown) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.message || 'An unexpected error occurred');
            } else {
                setError('An unexpected error occurred');
            }
            setloading(false);
        }
    };

    const handleChange = () => {
        setError("");
    };

    return (
        <div>
            {activateAlert && (
                <Alert
                    title="You have successfully register"
                    text="Please signin in your account"
                    color="green"
                />)}
            <section className="w-full  lg:h-auto">
                <div className="flex flex-col lg:items-center justify-center px-6 lg:py-8 h-full  ">
                    <div className="w-full ">
                        <div className="pl-2 pr-3 lg:pl-0 lg:max-w-[20rem] flex flex-col justify-center">
                            <div className="flex justify-center">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-[#0e0d0d] whitespace-nowrap  md:text-[28px] lg:-ml-10 mb-6">
                                    Signup to your account
                                </h1>
                            </div>
                            <div className="lg:-ml-4 lg:px-3 w-full ">
                                <div className="space-y-4 md:space-y-4  ">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                                        <input
                                            type="name"
                                            id="name"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                handleChange();
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="David Keci"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                handleChange();
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block  text-sm font-medium text-gray-900">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                handleChange();
                                            }}
                                            placeholder="••••••••"
                                            className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            required
                                        />
                                    </div>
                                </div>

                                {error && <div className="text-red-600 p-0 m-0 text-[13px] mt-3 lg:mt-0">{error}</div>}
                                <div className={`${error ? "mt-2" : "mt-8"}`}>
                                    <button
                                        type="submit"
                                        className="w-full  flex cursor-pointer justify-center  text-white bg-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                        onClick={handlesubmit}
                                    >
                                        {loading ? (<Loading />) : 'Signup'}
                                    </button>
                                </div>

                                <div className="pt-4 flex items-center text-gray-400 text-sm">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="mx-3 text-gray-400">or</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                <div className="flex justify-center  items-center h-10 whitespace-nowrap  w-full hover:bg-[#e6e4e4] text-xs py-2.5 px-8 sm:px-8 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer" style={{ backgroundColor: '#f8f8f8', border: 'none' }}>
                                    <img src={googleIcon.src} alt="" className="h-5 w-5" />
                                    <p className="ml-3 lg:pl-3  text-gray-500 hover:text-gray-600" style={{}}>Sign up with Google</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SignupForm