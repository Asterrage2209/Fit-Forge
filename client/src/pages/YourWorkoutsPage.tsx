import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const YourWorkoutsPage = () => {
    const { user } = useAuth();
    const [myWorkouts, setMyWorkouts] = useState<any[]>([]);
    const [logs, setLogs] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [workoutsRes, logsRes] = await Promise.all([
                    fetch(`/api/workouts/your/${user.id}`),
                    fetch(`/api/logs/${user.id}`)
                ]);
                const workoutsData = await workoutsRes.json();
                const logsData = await logsRes.json();
                setMyWorkouts(workoutsData);
                setLogs(logsData);
            } catch (error) {
                console.error("Failed to fetch user workout data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [user]);

    const handleLogChange = (workoutId: number, day: string, exercise: string, field: 'sets' | 'reps', value: string) => {
        const newLogs = JSON.parse(JSON.stringify(logs));
        if (!newLogs[workoutId]) newLogs[workoutId] = {};
        if (!newLogs[workoutId][day]) newLogs[workoutId][day] = {};
        if (!newLogs[workoutId][day][exercise]) newLogs[workoutId][day][exercise] = { sets: '', reps: '' };
        newLogs[workoutId][day][exercise][field] = value;
        setLogs(newLogs);

        if (user) {
            fetch('/api/logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, workoutId, day, exercise, ...newLogs[workoutId][day][exercise] })
            });
        }
    };

    if (isLoading) return <p>Loading your workouts...</p>;

    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Your Workouts</h1>
            {myWorkouts.length === 0 ? (
                <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-lg">
                    <p className="mb-4">You haven't added any workouts yet. Let's find a plan for you!</p>
                    <Link to="/workouts/available" className="bg-cyan-500 text-white font-bold py-2 px-6 rounded-md hover:bg-cyan-600 transition-colors">
                        Browse Available Workouts
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {myWorkouts.map(w => (
                        <div key={w.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4">{w.name}</h2>
                            <div className="space-y-4">
                                {Object.keys(w.days).map(day => (
                                    <div key={day}>
                                        <h3 className="font-semibold text-lg mb-2 text-cyan-500 border-b border-slate-200 dark:border-slate-700 pb-1">{day}</h3>
                                        <ul className="space-y-2 pt-2">
                                            {w.days[day].map((ex: string) => (
                                                <li key={ex} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
                                                    <span className="font-medium">{ex}</span>
                                                    <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-2">
                                                        <input type="number" placeholder="Sets" value={logs[w.id]?.[day]?.[ex]?.sets || ''} onChange={e => handleLogChange(w.id, day, ex, 'sets', e.target.value)} className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md text-sm border border-slate-300 dark:border-slate-600"/>
                                                        <input type="number" placeholder="Reps" value={logs[w.id]?.[day]?.[ex]?.reps || ''} onChange={e => handleLogChange(w.id, day, ex, 'reps', e.target.value)} className="w-full p-2 bg-slate-100 dark:bg-slate-700 rounded-md text-sm border border-slate-300 dark:border-slate-600"/>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YourWorkoutsPage;