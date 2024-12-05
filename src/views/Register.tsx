import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! Please log in.');
        // Redirect ke halaman login
        window.location.href = '/login';
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-[100vw] bg-white">
      <form className="w-full max-w-md p-6 text-center" onSubmit={handleRegister}>
        {/* Nike Logo */}
        <div className="flex justify-center gap-5 mb-8">
          <img src="src/assets/logo_nike.svg.png" alt="Nike Logo" className="w-10" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-normal text-gray-900 mb-4">Now let's make you a Nike Member.</h2>

        {/* First Name and Last Name Inputs */}
        <div className="flex gap-4 pb-4">
          <div className="relative w-full">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label
              className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left ${
                firstName ? '-top-2 left-2.5 text-xs scale-90' : ''
              } peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90`}
            >
              First Name
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label
              className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left ${
                lastName ? '-top-2 left-2.5 text-xs scale-90' : ''
              } peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90`}
            >
              Last Name
            </label>
          </div>
        </div>

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

        {/* Confirm Password Input */}
        <div className="w-full pb-4">
          <div className="relative">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
            <label
              className={`absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-slate-400 text-sm transition-all transform origin-left ${
                confirmPassword ? '-top-2 left-2.5 text-xs scale-90' : ''
              } peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:scale-90`}
            >
              Confirm Password
            </label>
          </div>
        </div>

        {/* Continue Button */}
        <section className="button flex justify-end">
          <button className="w-30 py-2 text-lg rounded-full font-bold text-white hover:bg-gray-500 border-none right-0">
            Register
          </button>
        </section>

        {/* Agreement Text */}
        <p className="mt-6 text-xs text-gray-600">
          Already have an account? <Link to="/login" className="underline">Log in here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Register;
