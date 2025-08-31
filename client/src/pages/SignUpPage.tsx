import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PasswordMeter from '../components/PasswordMeter';

const SignUpPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
             return setError("Please enter a valid email address.");
        }
         if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
            return setError("Please enter a valid phone number.");
        }
        if (!formData.agreedToTerms) {
            return setError("You must agree to the Terms & Conditions.");
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            setSuccess(data.message);
            setTimeout(() => navigate('/signin'), 3000);

        } catch (err: any) {
            setError(err.message || 'Failed to sign up.');
        }
    };

    return (
        <div className="max-w-md mx-auto animate-fade-in mt-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Create Your Account</h1>
                {error && <p className="text-red-500 text-center mb-4 bg-red-500/10 p-3 rounded-md">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4 bg-green-500/10 p-3 rounded-md">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="fullName" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500"/>
                    <input name="username" placeholder="Username" onChange={handleChange} required className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500"/>
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500"/>
                    <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500"/>
                    <div>
                        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500"/>
                        <PasswordMeter password={formData.password} />
                    </div>
                    <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500"/>
                    <div className="flex items-center pt-2">
                        <input id="terms" name="agreedToTerms" type="checkbox" onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"/>
                        <label htmlFor="terms" className="ml-2 block text-sm">
                            I agree to the <Link to="/terms" className="text-cyan-500 hover:underline">Terms & Conditions</Link>
                        </label>
                    </div>
                    <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-600 transition-colors !mt-6">
                        Sign Up
                    </button>
                </form>
                 <p className="text-center text-sm mt-6">
                    Already have an account? <Link to="/signin" className="text-cyan-500 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;