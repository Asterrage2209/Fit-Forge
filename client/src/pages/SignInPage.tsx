import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('user@demo.com');
    const [password, setPassword] = useState('Password@123');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to sign in.');
            }
            login(data.user);
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto animate-fade-in mt-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Sign In to FitForge</h1>
                {error && <p className="text-red-500 text-center mb-4 bg-red-500/10 p-3 rounded-md">{error}</p>}
                
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-md mb-6 text-sm text-cyan-800 dark:text-cyan-200">
                    <h3 className="font-semibold mb-2">Demo Credentials</h3>
                    <p><span className="font-medium">Email:</span> user@demo.com</p>
                    <p><span className="font-medium">Password:</span> Password@123</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                    </div>
                    <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors">
                        Sign In
                    </button>
                </form>
                <p className="text-center text-sm mt-6">
                    Don't have an account? <Link to="/signup" className="text-cyan-500 hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;
