import React, { useState } from 'react';
import { Mail, User, MessageSquare } from 'lucide-react';

const ContactPage = () => {
    const [status, setStatus] = useState({ message: '', type: '' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus({ message: 'Sending...', type: 'info' });
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message);
            setStatus({ message: result.message, type: 'success' });
            (e.target as HTMLFormElement).reset();
        } catch (err: any) {
            setStatus({ message: err.message || 'An error occurred.', type: 'error' });
        }
    };

    return (
        <div className="max-w-xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold text-center mb-2">Contact Us</h1>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">Have a question or feedback? Drop us a line!</p>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                        <input name="name" placeholder="Your Name" required className="w-full p-3 pl-10 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500"/>
                    </div>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                        <input name="email" type="email" placeholder="Your Email" required className="w-full p-3 pl-10 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500"/>
                    </div>
                     <div className="relative">
                        <MessageSquare className="absolute left-3 top-4 text-slate-400" size={20}/>
                        <textarea name="message" placeholder="Your Message" rows={5} required className="w-full p-3 pl-10 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-600 transition-colors">
                        Send Message
                    </button>
                    {status.message && (
                        <p className={`text-center mt-4 p-3 rounded-md ${
                            status.type === 'success' ? 'bg-green-500/10 text-green-500' : 
                            status.type === 'error' ? 'bg-red-500/10 text-red-500' :
                            'bg-blue-500/10 text-blue-500'
                        }`}>
                            {status.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContactPage;