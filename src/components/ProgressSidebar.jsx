import React from 'react';
import { Link, useLocation } from 'react-router'; 
import { AnimatedCheckmark } from './AnimatedCheckmark';
import { BehindTheScenes } from './BehindTheScenes';

export const ProgressSidebar = ({ 
  formSteps, 
  viewSteps, 
  progress, 
  formData 
}) => {
  
  const location = useLocation();
  const currentPath = location.pathname;

  const getPath = (name) => {
    switch(name) {
      case 'Corporate': return '/';
      case 'Address': return '/address';
      case 'Special Offers': return '/special-offers';
      case 'Directors Details': return '/directors-details';
      default: return '/';
    }
  };

  const checkActive = (tabName) => {
    const path = getPath(tabName);
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <div className="w-full md:w-64 bg-linear-to-b from-slate-800 via-slate-900 to-slate-950 text-slate-300 flex flex-row md:flex-col border-b md:border-r border-slate-800 shrink-0 z-30 overflow-x-auto md:overflow-x-visible">
      
      <div className="p-4 md:p-6 flex md:flex-col gap-2 md:gap-0 w-full md:flex-1">
        <h2 className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Data Entry</h2>
        
        <div className="flex md:flex-col gap-4 md:gap-6 relative">
          <div className="hidden md:block absolute left-4.75 top-2 bottom-2 w-0.5 bg-slate-800 z-0"></div>

          {formSteps.map((tab) => {
            const isActive = checkActive(tab);
            const isDataComplete = progress.tabStatus[tab];
            
            return (
              <Link 
                to={getPath(tab)} 
                key={tab} 
                className="relative z-10 flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
                  <div className={isDataComplete ? "scale-110 transition-transform duration-300" : "scale-90 opacity-80"}>
                      <AnimatedCheckmark isComplete={isDataComplete} />
                  </div>
                  {!isDataComplete && isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                      </div>
                  )}
                </div>
                <span className={`text-sm transition-all duration-300 ${isActive ? 'text-white font-bold tracking-wide' : isDataComplete ? 'text-slate-400' : 'text-slate-500'}`}>
                  {tab}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block my-6 border-t border-slate-800"></div>
        <h2 className="hidden md:block text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Related Info</h2>

        <div className="flex md:flex-col gap-4 md:gap-6 pl-2">
           {viewSteps.map((tab) => {
              const isActive = checkActive(tab);
              return (
                <Link 
                   to={getPath(tab)} 
                   key={tab} 
                   className="flex items-center gap-4 cursor-pointer group"
                >
                   <div className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                       isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'
                   }`}>
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v3h12V6H6zm0 5v3h12v-3H6zm0 5v3h12v-3H6z" /></svg>
                   </div>
                   <span className={`text-sm transition-all ${isActive ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-300'}`}>{tab}</span>
                </Link>
              )
           })}
        </div>
      </div>
      
      <div className="hidden md:flex flex-col p-6 bg-slate-950/30 border-t border-slate-800 gap-4 mt-auto">
         <div>
           <div className="flex justify-between text-[10px] text-slate-500 mb-1 uppercase tracking-wider font-bold">
             <span>Form Completion</span>
             <span>{progress.globalPercentage}%</span>
           </div>
           <div className="w-full bg-slate-800 rounded-full h-1">
             <div className="bg-green-500 h-1 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress.globalPercentage}%` }}></div>
           </div>
         </div>
         <div className=" p-1 opacity-80">
            <BehindTheScenes data={formData} />
        </div>
      </div>
    </div>
  );
};