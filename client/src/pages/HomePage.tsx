import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const carouselImages = [
  "[https://placehold.co/1200x500/000000/FFFFFF?text=Strength+Training](https://placehold.co/1200x500/000000/FFFFFF?text=Strength+Training)",
  "[https://placehold.co/1200x500/111827/FFFFFF?text=Cardio+%26+Endurance](https://placehold.co/1200x500/111827/FFFFFF?text=Cardio+%26+Endurance)",
  "[https://placehold.co/1200x500/1e293b/FFFFFF?text=Flexibility+%26+Yoga](https://placehold.co/1200x500/1e293b/FFFFFF?text=Flexibility+%26+Yoga)",
];

const testimonials = [
  { name: 'Alex Johnson', review: "FitForge transformed my workout routine. The predefined plans are amazing for getting started!" },
  { name: 'Maria Garcia', review: "Finally, an app that's simple to use but powerful enough to keep me motivated. Tracking progress is a breeze." },
  { name: 'Sam Lee', review: "As someone new to fitness, the variety of workouts helped me find what I love. Highly recommend!" },
];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);

  return (
    <div className="animate-fade-in text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
        Forge Your <span className="text-cyan-500">Ultimate Fitness</span> Journey
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
        Welcome to FitForge. Your personalized platform to track workouts, discover new routines, and achieve your health goals.
      </p>

      <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl mb-12">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {carouselImages.map((src, index) => (
            <img key={index} src={src} alt={`Slide ${index}`} className="w-full flex-shrink-0" />
          ))}
        </div>
        <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"><ChevronLeft/></button>
        <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"><ChevronRight/></button>
      </div>

      <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map(testimonial => (
          <div key={testimonial.name} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <p className="italic text-slate-600 dark:text-slate-300">"{testimonial.review}"</p>
            <p className="font-semibold text-right mt-4 text-cyan-500">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
