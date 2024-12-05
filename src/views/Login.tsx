import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Simpan token di localStorage
      localStorage.setItem('token', data.token);
      // Redirect based on role
      if (data.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/dashboard';
      }
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Something went wrong. Please try again.');
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen min-w-[100vw] bg-white">
      
      <form className="w-full max-w-md p-6 text-center" onSubmit={handleLogin}>
        {/* Nike Logo */}
        <div className="flex justify-center gap-5 mb-8">
          <img src="src/assets/logo_nike.svg.png" alt="Nike Logo" className="w-10" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-normal text-gray-900 mb-4">Login to Nike.</h2>

        {/* Email Input */}
        <div className="w-full pb-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label
              className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left ${
                email ? '-top-2 left-2.5 text-xs scale-90' : ''
              } peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90`}
            >
              Email
            </label>
          </div>
        </div>

        {/* Password Input */}
        <div className="w-full pb-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label
              className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left ${
                password ? '-top-2 left-2.5 text-xs scale-90' : ''
              } peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90`}
            >
              Password
            </label>
          </div>
        </div>

        {/* Login Button */}
        <section className="button flex justify-end">
          <button
            type='submit'
            className="w-30 py-2 text-lg rounded-full font-bold text-white hover:bg-gray-500 border-none right-0"
          >
            Login
          </button>
        </section>

        {/* Agreement Text */}
        <p className="mt-6 text-xs text-gray-600">
          Don't have an account? <Link to="/register" className="underline">Sign up for Nike</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
