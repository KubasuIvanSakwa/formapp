import React from "react";

function SideBarButton({ label, active, primary, color, onClick }) {
  
  const getIcon = () => {
    const iconClass = "w-5 h-5 text-white transition-all duration-300 group-hover:translate-y-[140%] group-hover:opacity-50";
    
    switch (label.toLowerCase()) {
      case 'view':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case 'add':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        );
      case 'edit':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'save':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        );
      case 'exit':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        );
      default:
        return null;
    }
  };

  let hoverColorClass = "";
  let baseBgClass = "bg-[rgb(20,20,20)]"; 

  if (primary) {
    hoverColorClass = "hover:bg-emerald-500"; 
  } else if (label.toLowerCase() === 'exit') {
    hoverColorClass = "hover:bg-rose-500"; 
  } else if (active) {
    hoverColorClass = "hover:bg-blue-600";
    baseBgClass = "bg-blue-600"; 
  } else {
    hoverColorClass = "hover:bg-blue-500"; 
  }

  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center justify-center 
        w-12 h-12 rounded-full border-none cursor-pointer 
        shadow-[0px_0px_20px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-300
        hover:w-32 hover:rounded-[50px] hover:shadow-lg
        ${baseBgClass} ${hoverColorClass} ${color || ''}
      `}
    >
      <div className="flex items-center justify-center w-full h-full">
         {getIcon()}
      </div>

      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-[12px] font-bold tracking-widest opacity-0 transition-all duration-300 group-hover:top-1/2 group-hover:-translate-y-1/2 group-hover:opacity-100 whitespace-nowrap">
        {label}
      </span>

    </button>
  );
}

export default SideBarButton;