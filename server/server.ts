import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- In-Memory Data Store (Seeded from your Java project) ---
const predefinedWorkouts = [
  { id: 1, name: "Weight Loss", days: {
      "Day-1": ["Squats", "Push-ups", "Burpees", "Mountain Climbers", "Jump Rope"],
      "Day-2": ["HIIT Running", "Russian Twists", "Plank", "Bicycle Crunches"],
      "Day-3": ["Deadlifts", "Lunges", "Steps-Ups", "Jump Squats"],
      "Day-4": ["Pull-Ups", "Dumbbell Shoulder Press", "Push-ups", "Plank to Push-Up", "Russian twists"],
      "Day-5": ["Light Cardio", "Yoga"]
  }},
  { id: 2, name: "Weight Gain", days: {
      "Day-1": ["Bench Press", "Incline Dumbbell Press", "Cable Chest Fly", "Triceps Dips", "Overhead Triceps Extension"],
      "Day-2": ["Deadlifts", "Pull-Ups", "Barbell Rows", "Dumbbell Curls", "Hammer Curls"],
      "Day-3": ["Squats", "Leg Press", "Romanian Deadlifts", "Lunges", "Calf Raises"],
      "Day-4": ["Military Press", "Dumbbell Lateral Raises", "Face Pull", "Hanging Leg Raise", "Side Plank"],
      "Day-5": ["Squats", "Bench", "Deadlift", "Hypertrophy"]
  }},
  { id: 3, name: "Power Lifting", days: {
      "Day-1": ["Squats", "Front Squats", "Bulgarian Split Squats", "Core Work"],
      "Day-2": ["Bench Press(Heavy)", "Incline Bench Press", "Triceps Dips", "Overhead Press", "Core Work"],
      "Day-3": ["Deadlift(Heavy)", "Romanian Deadlift", "Barbell Rows", "Pull-Ups"],
      "Day-4": ["Glutes", "Hamstrings", "Core"]
  }},
  { id: 4, name: "Endurance Training", days: {
      "Day-1": ["Running at a steady pace for 45 mins", "Cool Down(breathing control)", "Stretching and foam roller"],
      "Day-2": ["Squats", "Pull-Ups", "Pushups", "Burpees"],
      "Day-3": ["Sprints(10*400mts)", "Cycling(20-25mins)"],
      "Day-4": ["Yoga", "Light Cardio"]
  }},
  { id: 5, name: "Sports Specific Training", days: {
      "Day-1": ["Agility Drills", "Plyometrics", "Speed Work", "Skill Drills"],
      "Day-2": ["Squats", "Deadlifts", "Explosive Pushups"],
      "Day-3": ["HIIT", "Long-distance cardio", "Core Stability"],
      "Day-4": ["Yoga", "Mobility Drills"]
  }},
  { id: 6, name: "Rehabilitation Training", days: {
      "Day-1": ["Squats", "Lunges", "Gentle Stretches"],
      "Day-2": ["Resistance band exercises for shoulders", "light dumbbell presses", "Stretching"],
      "Day-3": ["Cycling", "Walking"]
  }},
  { id: 7, name: "Mental Well Being Training", days: {
      "Day-1": ["Yoga (30 minutes)", "Meditation (10 minutes)"],
      "Day-2": ["Jogging", "Swimming", "Stretching"],
      "Day-3": ["Yoga"],
      "Day-4": ["hiking", "Walking", "Cycling"]
  }},
  { id: 8, name: "HIIT", name_long: "High Intensity Interval Training", days: {
      "Day-1": ["Jump Squats", "Burpees", "Push-Ups", "Mountain Climbers"],
      "Day-2": ["Sprint (30 seconds)", "Walk (1 minute)"],
      "Day-3": ["Plank to Push-Up", "Bicycle Crunches", "Russian Twists"]
  }},
   { id: 9, name: "Postpartum Training", days: {
      "Day-1": ["Pelciv tilts", "Bird Dogs", "Glute Bridges", "Gentle Stretch for lower back and hips"],
      "Day-2": ["Walking (20-30 minutes)", "Cycling at comfortable pace (20-30 minutes)", "Light Stretching"],
      "Day-3": ["Bodyweight Squats", "Seated Shoulder Press", "Resistance Band Rows", "Gentle core exercises"]
  }},
  { id: 10, name: "Flexibility", days: {} },
  { id: 11, name: "General Fitness", days: {} },
];

let users: any[] = [];
let contactMessages: any[] = [];
let userWorkouts: any = {};
let userLogs: any = {};

// --- API Endpoints ---
app.post('/api/auth/signin', (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email === 'user@demo.com' && password === 'Password@123') {
        res.status(200).json({ 
            message: 'Login successful!',
            user: { id: 'demo-user', fullName: 'Demo User', username: 'demouser', email: 'user@demo.com' }
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials. Please use the demo credentials.' });
    }
});

app.post('/api/auth/signup', (req: Request, res: Response) => {
    const { fullName, username, email, phone, password, agreedToTerms } = req.body;
    if (!fullName || !username || !email || !phone || !password || !agreedToTerms) {
        return res.status(400).json({ message: "All fields are required." });
    }
    console.log('New signup received (in-memory only):', { fullName, username, email });
    users.push(req.body);
    res.status(201).json({ message: 'Signup successful! Please proceed to sign in with the demo credentials.' });
});

app.get('/api/workouts/predefined', (req: Request, res: Response) => {
    res.status(200).json(predefinedWorkouts);
});

app.post('/api/workouts/your', (req: Request, res: Response) => {
    const { userId, workoutIds } = req.body;
    if (!userId || !workoutIds) {
        return res.status(400).json({ message: "User ID and workout IDs are required."});
    }
    const selected = predefinedWorkouts.filter(p => workoutIds.includes(p.id));
    userWorkouts[userId] = selected;
    console.log(`Workouts for user ${userId}:`, userWorkouts[userId].map((w: any) => w.name));
    res.status(200).json(userWorkouts[userId]);
});

app.get('/api/workouts/your/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    res.status(200).json(userWorkouts[userId] || []);
});

app.post('/api/logs', (req: Request, res: Response) => {
    const { userId, workoutId, day, exercise, sets, reps } = req.body;
    if (!userLogs[userId]) userLogs[userId] = {};
    if (!userLogs[userId][workoutId]) userLogs[userId][workoutId] = {};
    if (!userLogs[userId][workoutId][day]) userLogs[userId][workoutId][day] = {};
    userLogs[userId][workoutId][day][exercise] = { sets, reps };
    console.log('Logged progress for user:', userId, userLogs[userId]);
    res.status(201).json({ message: 'Progress logged successfully!' });
});

app.get('/api/logs/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    res.status(200).json(userLogs[userId] || {});
});

app.post('/api/contact', (req: Request, res: Response) => {
    const message = req.body;
    message.receivedAt = new Date().toISOString();
    contactMessages.push(message);
    console.log('--- New Contact Form Submission ---', message, '-----------------------------------');
    res.status(200).json({ message: 'Your message has been received. We will get back to you shortly!' });
});

app.listen(PORT, () => {
    console.log(`✅ Backend server is running at http://localhost:${PORT}`);
});