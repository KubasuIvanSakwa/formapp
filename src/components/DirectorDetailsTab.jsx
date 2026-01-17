import React from "react";

function DirectorDetailsTab() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50 animate-fadeIn">
      <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3">
        <svg
          className="w-6 h-6 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <p className="text-slate-500 font-medium">No records to display</p>
      <p className="text-xs text-slate-400 mt-1">
        Director details have not been added yet.
      </p>
    </div>
  );
}

export default DirectorDetailsTab;
