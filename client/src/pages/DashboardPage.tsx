import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowRight, List, PlusSquare } from 'lucide-react';

const DashboardPage = () => {
    const { user } = useAuth();

    const Card = ({ to, title, icon: Icon }: { to: string, title: string, icon: React.ElementType }) => (
        <Link to={to} className="block bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-105 group">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Icon className="h-8 w-8 text-cyan-500" />
                    <h2 className="text-2xl font-bold">{title}</h2>
                </div>
                <ArrowRight className="h-6 w-6 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.fullName || user?.username}!</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">What would you like to do today?</p>
            <div className="grid md:grid-cols-2 gap-8">
                <Card to="/workouts/your" title="Your Workouts" icon={List} />
                <Card to="/workouts/available" title="Available Workouts" icon={PlusSquare} />
            </div>
        </div>
    );
};

export default DashboardPage;
