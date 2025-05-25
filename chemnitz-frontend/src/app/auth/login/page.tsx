'use client'
import "@/styles/loginstyle.css";
import React, { useState } from 'react';
import image1 from "../../../../public/assets/image/image.png"
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";

function Login() {
    const [active, setActive] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const handleRegisterClick = () => {
        setActive(true);
    };

    const handleLoginClick = () => {
        setActive(false);
    };

    return (
        <>
            <div className="hidden lg:block">
                <div className="test relative flex items-center justify-center">
                    <div className={`container${active ? ' active' : ''}`} id="container">
                        <div className="form-container sign-up">
                            <form>
                                <SignupForm />
                            </form>
                        </div>
                        <div className="form-container sign-in mt-2 flex items-center">
                            <SigninForm />
                        </div>
                        <div className="toggle-container">
                            <div className="toggle">
                                <div className="toggle-panel toggle-left">
                                    <h1 className="text-[30px] font-semibold">Welcome Back!</h1>
                                    <p>Enter your personal details to use all of site features</p>
                                    <button onClick={handleLoginClick} id="login">Sign In</button>
                                </div>
                                <div className="toggle-panel toggle-right">
                                    <h1 className="text-[30px] font-semibold">Hello, Friend!</h1>
                                    <p>Register with your personal details to use all of site features</p>
                                    <button onClick={handleRegisterClick} id="register">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div
                className={`flex  justify-center bg-blue-200 perspective-1000 lg:hidden ${isRegister ? "sm:min-h-[127vh] items-center" : "items-center"}`}
                style={{
                    minHeight: isRegister ? "100vh" : "100vh",
                    transition: "min-height 0.5s ease",
                }}
            >
                <div
                    className={`h-full min-h-[40rem] m-6 w-[25rem] relative rounded-3xl shadow-lg bg-white transition-transform duration-700 transform-style-preserve-3d ${isRegister ? "rotate-y-180 min-h-[43rem]" : "rotate-y-0 "
                        }`}
                >
                    <div className="absolute inset-0 backface-hidden flex flex-col">
                        <div className="bg-blue-500 text-white p-8 rounded-b-[6rem] text-center font-semibold">
                            <h2 className="text-xl font-bold mb-2">Hello, Welcome!</h2>
                            <p className="text-sm mb-4">Don't have an account?</p>
                            <button
                                onClick={() => setIsRegister(true)}
                                className="border border-white rounded px-5 py-2 hover:bg-white hover:text-blue-500 transition"
                            >
                                Register
                            </button>
                        </div>

                        <div className="">
                            <div className="">
                                <SigninForm />
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col">
                        <div className="bg-blue-500 text-white p-8 rounded-b-[6rem] text-center font-semibold">
                            <h2 className="text-xl font-bold mb-2">Create Account</h2>
                            <p className="text-sm mb-4">Already have an account?</p>
                            <button
                                onClick={() => setIsRegister(false)}
                                className="border border-white rounded px-5 py-2 hover:bg-white hover:text-blue-500 transition"
                            >
                                Login
                            </button>
                        </div>
                        <div className="flex-grow mt-6">
                            <SignupForm />
                        </div>
                    </div>
                </div>

                <style>{`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-0 {
            transform: rotateY(0deg);
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
            </div>
        </>
    );
}

export default Login;
