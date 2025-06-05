'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Loading from "@/components/Common/Loading";
import googleIcon from "../../public/assets/icons/googleIcon.png";
import { loginUser } from "@/api/authenticationAPI";



function SigninForm() {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false)
    const router = useRouter();


    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setloading(true);
            const data = await loginUser(email, password);
            console.log('Login successful:', data);
            router.replace('/')
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
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
            <section className="w-full  md:h-auto">
                <div className="flex flex-col lg:items-center lg:justify-center px-6 py-8 h-full">
                    <div className="w-full  ">
                        <div className="pl-5 max-w-[20rem]">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#0e0d0d] whitespace-nowrap  md:text-[27px]  mb-6">
                                <div className="w-full flex justify-center ">
                                    Sign in to your account
                                </div>
                            </h1>
                            <div className="">
                                <div className="space-y-4 md:space-y-6">

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
                                            className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end py-2 pb-4 lg:mt-[-10px]">
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                {error && <div className="text-red-600 p-0 m-0 text-[13px] mt-3 lg:mt-0">{error}</div>}
                                <button
                                    type="submit"
                                    className="w-full flex cursor-pointer justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#0e0d0d]"
                                    onClick={handlesubmit}
                                >
                                    {loading ? (<Loading />) : 'Sign in'}
                                </button>

                                <div className="pt-4 flex items-center text-gray-400 text-sm">
                                    <div className="flex-grow border-t border-gray-300"></div>
                                    <span className="mx-3 text-gray-400">or</span>
                                    <div className="flex-grow border-t border-gray-300"></div>
                                </div>

                                <button className="flex justify-around items-center h-10  w-full hover:bg-[#e6e4e4] text-xs py-2.5 px-11 border border-transparent rounded-lg font-semibold tracking-wide uppercase mt-2 cursor-pointer" style={{ backgroundColor: '#f8f8f8', border: 'none' }}>
                                    <img src={googleIcon.src} alt="" className="h-5 w-5" />
                                    <p className="text-gray-500 hover:text-gray-600">Sign in with Google</p>
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SigninForm;
