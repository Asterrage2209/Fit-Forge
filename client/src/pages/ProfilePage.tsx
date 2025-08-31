import React, { useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useAuth();
    const [profileData] = useState({
        fullName: user?.fullName || '',
        username: user?.username || '',
        email: user?.email || '',
        phone: '123-456-7890',
    });
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handlePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                 setProfilePic(reader.result as string);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const defaultPic = `https://api.dicebear.com/8.x/initials/svg?seed=${user?.username}`;

    return (
        <div className="max-w-2xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <div className="flex flex-col items-center space-y-4 mb-8">
                     <div className="relative">
                        <img src={profilePic || defaultPic} alt="Profile" className="h-32 w-32 rounded-full object-cover ring-4 ring-cyan-500 ring-offset-4 ring-offset-white dark:ring-offset-slate-800"/>
                        <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-slate-700 text-white p-2 rounded-full cursor-pointer hover:bg-slate-600 transition-colors">
                            <Camera size={16}/>
                        </button>
                        <input ref={fileInputRef} id="profilePicInput" type="file" accept="image/*" className="hidden" onChange={handlePicChange}/>
                     </div>
                     <h2 className="text-2xl font-bold">{profileData.fullName}</h2>
                </div>
                
                <form className="space-y-4">
                     <div>
                        <label className="text-sm font-medium">Full Name</label>
                        <input value={profileData.fullName} disabled className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-md cursor-not-allowed border border-slate-300 dark:border-slate-600"/>
                    </div>
                     <div>
                        <label className="text-sm font-medium">Username</label>
                        <input value={profileData.username} disabled className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-md cursor-not-allowed border border-slate-300 dark:border-slate-600"/>
                    </div>
                     <div>
                        <label className="text-sm font-medium">Email</label>
                        <input value={profileData.email} disabled className="w-full mt-1 p-2 bg-slate-100 dark:bg-slate-700 rounded-md cursor-not-allowed border border-slate-300 dark:border-slate-600"/>
                    </div>
                    <p className="text-center text-sm pt-4 text-slate-500">Profile editing will be enabled in a future update when a database is integrated.</p>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;