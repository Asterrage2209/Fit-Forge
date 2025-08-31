import React from 'react';

interface PasswordMeterProps {
  password?: string;
}

const PasswordMeter: React.FC<PasswordMeterProps> = ({ password = '' }) => {
  const checkStrength = () => {
    let score = 0;
    if (password.length > 0) score++;
    if (password.length > 7) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = checkStrength();
  const label = ['', 'Weak', 'Fair', 'Medium', 'Good', 'Strong'][strength];
  const color = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'][strength];
  
  if (!password) return null;

  return (
    <div className="mt-1">
      <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${(strength / 5) * 100}%` }}
        ></div>
      </div>
      <p className={`text-xs text-right mt-1 font-medium ${strength < 3 ? 'text-red-500' : 'text-green-500'}`}>{label}</p>
    </div>
  );
};

export default PasswordMeter;
