import React from 'react';

const CustomCheckbox = ({ label, name, checked, onChange }) => {
  // Generate a unique ID for the label association
  const id = `checkbox-${name}`;

  return (
    <div className="checkbox-wrapper relative block overflow-hidden my-2">
      <style>{`
        .checkbox-wrapper .path1 {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          transition: .5s stroke-dashoffset ease-in-out;
          opacity: 0;
        }
        .checkbox-wrapper input:checked + label svg g path {
          stroke-dashoffset: 0;
          opacity: 1;
        }
        /* Hover effect for the box */
        .checkbox-wrapper:hover rect {
           stroke: #818CF8; /* Indigo-400 */
           stroke-width: 2;
        }
      `}</style>

      <input 
        type="checkbox" 
        className="peer hidden" 
        id={id} 
        name={name}
        checked={checked || false}
        onChange={(e) => onChange({ target: { name, value: e.target.checked } })} 
      />
      
      <label htmlFor={id} className="cursor-pointer flex items-center gap-3 select-none group">
        <div className="relative w-11.25 h-11.25 shrink-0">
            <svg width="45" height="45" viewBox="0 0 95 95" className="align-middle">
              <rect 
                x="30" y="20" width="50" height="50" 
                stroke="black" 
                fill="none"
                className="transition-all duration-300 peer-checked:stroke-indigo-500 group-hover:stroke-indigo-400"
              />
              
              {/* The Checkmark */}
              <g transform="translate(0,-952.36222)">
                <path 
                  d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4" 
                  stroke="black" 
                  strokeWidth="3" 
                  fill="none" 
                  className="path1"
                />
              </g>
            </svg>
        </div>
        
        <span className="text-sm font-bold text-slate-600 uppercase tracking-wide group-hover:text-indigo-500 transition-colors">
            {label}
        </span>
      </label>
    </div>
  );
};

export default CustomCheckbox;