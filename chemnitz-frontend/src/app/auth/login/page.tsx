'use client';

import "@/styles/loginstyle.css";
import React, { useState } from 'react';
import SigninForm from "@/components/SigninForm";
import SignupForm from "@/components/SignupForm";

function Login() {
    const [active, setActive] = useState(false);
    const [isRegisterForm, setIsRegisterForm] = useState(false);

    const handleLoginClick = () => {
        setActive(false);
        setIsRegisterForm(false);
    };

    const handleRegisterClick = () => {
        setActive(true);
        setIsRegisterForm(true);
    };

    const backgroundStyle = {
        backgroundImage: "url('/assets/image/img2.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    const loginBackgroundStyle = {
        backgroundImage: "url('/assets/image/logbg.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    return (
        <div style={backgroundStyle}>

            {/* Desktop View */}
            <div className="hidden lg:block">
                <div className="test relative flex items-center justify-center">
                    <div className={`container${active ? ' active' : ''}`} id="container">
                        <div className="form-container sign-up bg-white">
                            <form>
                                <SignupForm />
                            </form>
                        </div>
                        <div className={`${active ? "hidden" : "form-container sign-in flex items-center bg-white"}`}>
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

            {/* Mobile View */}
            <div
                className="flex justify-center items-center perspective-1000 lg:hidden"
                style={{ minHeight: "100vh" }}
            >
                <div
                    className={`relative bg-white m-6 w-[25rem] min-h-[43rem] rounded-3xl transition-transform duration-700 transform-style-preserve-3d ${isRegisterForm ? "rotate-y-180" : "rotate-y-0"}`}
                >
                    <div
                        className={`absolute inset-0 backface-hidden flex flex-col transition-opacity duration-500 ${isRegisterForm ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"}`}
                    >
                        <div className="relative text-white p-8 rounded-b-[6rem] text-center font-semibold overflow-hidden min-h-[11rem] transition-all duration-700">
                            <div
                                className="absolute inset-0 transition-opacity duration-700"
                                style={{
                                    ...loginBackgroundStyle,
                                    filter: 'blur(2px)',
                                    zIndex: 0,
                                }}
                            />
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold mb-2">Hello, Welcome!</h2>
                                <p className="text-sm mb-4">Don't have an account?</p>
                                <button
                                    onClick={handleRegisterClick}
                                    className="border border-white rounded px-5 py-2 hover:bg-white hover:text-blue-500 transition"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <SigninForm />
                        </div>
                    </div>

                    {/* Signup Side */}
                    <div
                        className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col transition-opacity duration-500 ${isRegisterForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    >
                        <div className="relative text-white p-8 rounded-b-[6rem] text-center font-semibold overflow-hidden min-h-[11rem] transition-all duration-700">
                            <div
                                className="absolute inset-0 transition-opacity duration-700"
                                style={{
                                    ...loginBackgroundStyle,
                                    filter: 'blur(2px)',
                                    zIndex: 0,
                                }}
                            />
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold mb-2">Create Account</h2>
                                <p className="text-sm mb-4">Already have an account?</p>
                                <button
                                    onClick={handleLoginClick}
                                    className="border border-white rounded px-5 py-2 hover:bg-white hover:text-blue-500 transition"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                        <div className="flex-grow pt-6 px-2">
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
        </div>
    );
}

export default Login;
