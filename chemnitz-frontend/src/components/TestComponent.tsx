'use client'
import React, { useEffect, useState } from 'react';
import { logoutUser } from '@/api/authenticationAPI';

function TestComponent() {
  const [loginResponse, setLoginResponse] = useState<any>(null);
  const [userResponse, setUserResponse] = useState<any>(null);
  const [logoutResponse, setLogoutResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const email = 'test@example.com';
  const password = 'mypassword123';

  // Login on mount with fetch
  useEffect(() => {
    const doLogin = async () => {
      setError(null);
      setLoginResponse(null);
      setLogoutResponse(null);
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) throw new Error('Login failed');
        const data = await res.json();
        setLoginResponse(data);
      } catch (err: any) {
        setError(err.message || 'Login failed');
      }
    };
    doLogin();
  }, []);

  // Fetch user handler (now only runs on button click)
  const fetchUser = async () => {
    setError(null);
    setUserResponse(null);
    try {
      const res = await fetch('http://localhost:5000/api/user/getUser', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Get user failed');
      const data = await res.json();
      setUserResponse(data);
    } catch (err: any) {
      setError(err.message || 'Get user failed');
    }
  };

  // Logout handler
const handleLogout = async () => {
  setError(null);
  setLogoutResponse(null);
  try {
    const res = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Logout failed');
    const data = await res.json();
    setLogoutResponse(data);
    setUserResponse(null);
  } catch (err: any) {
    setError(err.message || 'Logout failed');
  }
};

  return (
    <div className='min-h-[30rem] w-full flex flex-col items-center justify-center gap-6 mt-[5rem]'>
      <div className='text-lg font-bold'>Testing loginUser, getUser & logoutUser</div>

      <div className='bg-blue-100 rounded p-3 text-blue-800'>
        <div>loginUser called with:</div>
        <div>
          <span className='font-semibold'>Email:</span> {email}
        </div>
        <div>
          <span className='font-semibold'>Password:</span> {password}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={fetchUser}
          className='bg-green-600 text-white font-semibold rounded p-2 hover:bg-green-700 transition w-48'
        >
          Fetch Current User
        </button>
        <button
          onClick={handleLogout}
          className='bg-red-600 text-white font-semibold rounded p-2 hover:bg-red-700 transition w-32'
        >
          Logout
        </button>
      </div>

      {error && (
        <div className='text-red-500 font-medium bg-red-50 px-4 py-2 rounded'>
          {error}
        </div>
      )}

      {loginResponse && (
        <pre className='bg-gray-100 rounded p-4 w-full max-w-xl overflow-x-auto'>
          <span className="font-bold">Login Response:</span><br />
          {JSON.stringify(loginResponse, null, 2)}
        </pre>
      )}

      {userResponse && (
        <pre className='bg-gray-100 rounded p-4 w-full max-w-xl overflow-x-auto'>
          <span className="font-bold">User Response:</span><br />
          {JSON.stringify(userResponse, null, 2)}
        </pre>
      )}

      {logoutResponse && (
        <pre className='bg-gray-100 rounded p-4 w-full max-w-xl overflow-x-auto'>
          <span className="font-bold">Logout Response:</span><br />
          {JSON.stringify(logoutResponse, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default TestComponent;
