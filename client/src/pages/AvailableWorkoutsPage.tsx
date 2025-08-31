import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Check, Plus } from 'lucide-react';

interface Workout {
  id: number;
  name: string;
}

const AvailableWorkoutsPage = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const res = await fetch('/api/workouts/predefined');
                const data = await res.json();
                setWorkouts(data.filter((w: any) => w.name && Object.keys(w.days).length > 0));
            } catch (error) {
                console.error("Failed to fetch workouts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWorkouts();
    }, []);

    const toggleSelection = (id: number) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };
    
    const handleAddToMyWorkouts = async () => {
        if (!user) return;
        await fetch('/api/workouts/your', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, workoutIds: selected }),
        });
        navigate('/workouts/your');
    };

    return (
        <div className="animate-fade-in">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Available Workout Plans</h1>
                 <button onClick={handleAddToMyWorkouts} disabled={selected.length === 0} className="flex items-center gap-2 bg-cyan-500 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors">
                    <Plus size={20}/>
                    Add to My Workouts ({selected.length})
                </button>
            </div>
            {isLoading ? <p>Loading workouts...</p> : 
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {workouts.map(w => (
                        <div key={w.id} onClick={() => toggleSelection(w.id)} className={`p-4 rounded-lg cursor-pointer border-2 transition-all flex justify-between items-center ${selected.includes(w.id) ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-cyan-400'}`}>
                            <h3 className="font-semibold">{w.name}</h3>
                            {selected.includes(w.id) && <Check className="text-cyan-500"/>}
                        </div>
                    ))}
                </div>
            }
            <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg text-center">
                <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Custom Workout Builder</h3>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">The ability to create your own custom workout plans is coming soon!</p>
            </div>
        </div>
    );
};

export default AvailableWorkoutsPage;