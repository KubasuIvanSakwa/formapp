import React from 'react';
import { useNavigate, useLocation } from 'react-router';

// --- 1. BACK BUTTON ---
export const BackButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button" // Important so it doesn't submit forms
      className={`
        group flex items-center gap-2 px-6 py-3 rounded-xl 
        border border-slate-200 bg-white text-slate-500 font-bold uppercase tracking-wider text-xs
        transition-all duration-300 ease-out
        hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50
        active:scale-95
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:text-slate-500
      `}
    >
      <svg 
        className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" 
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span>Back</span>
    </button>
  );
};

// --- 2. NEXT BUTTON ---
export const NextButton = ({ onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className={`
        group relative flex items-center gap-3 px-8 py-3 rounded-xl 
        bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold uppercase tracking-wider text-xs
        shadow-lg shadow-blue-500/30
        transition-all duration-300 ease-out
        hover:shadow-blue-500/50 hover:-translate-y-0.5 hover:brightness-110
        active:scale-95 active:translate-y-0
        disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:brightness-100 disabled:hover:translate-y-0
      `}
    >
      <span>Next Step</span>
      <div className="relative flex items-center justify-center">
         <svg 
           className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
           fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
         >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
         </svg>
      </div>
    </button>
  );
};

// --- 3. MAIN COMPONENT ---
export const FormNavigation = ({ steps }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // A. Define the paths (MUST MATCH your ProgressSidebar logic)
  const getPath = (name) => {
    switch(name) {
      case 'Corporate': return '/';
      case 'Address': return '/address';
      case 'Special Offers': return '/special-offers';
      default: return '/';
    }
  };

  // B. Find Current Index based on URL
  const currentStepIndex = steps.findIndex(step => {
     const path = getPath(step);
     // Match strict '/' or startsWith for others
     return path === '/' 
        ? location.pathname === '/' 
        : location.pathname.startsWith(path);
  });

  const isFirst = currentStepIndex <= 0;
  const isLast = currentStepIndex === steps.length - 1;

  // C. Navigation Handlers
  const handleBack = () => {
    if (!isFirst) {
      const prevStep = steps[currentStepIndex - 1];
      navigate(getPath(prevStep));
    }
  };

  const handleNext = () => {
    if (!isLast) {
      const nextStep = steps[currentStepIndex + 1];
      navigate(getPath(nextStep));
    }
  };

  return (
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200">
        
        {/* LEFT: BACK BUTTON */}
        <div className={isFirst ? 'invisible pointer-events-none' : 'block'}>
            <BackButton onClick={handleBack} disabled={isFirst} />
        </div>
        
        {/* RIGHT: NEXT BUTTON */}
        <div className={isLast ? 'invisible pointer-events-none' : 'block'}>
             <NextButton onClick={handleNext} disabled={isLast} />
        </div>
    </div>
  );
};