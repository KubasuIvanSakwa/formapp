import React from 'react';

const SearchInput = ({ label, name, value, onChange, placeholder, inputRef, disabled }) => {
  return (
    <div className="flex flex-col w-full relative mt-2 mb-5">
      
      {/* Label sits ON the border (Same as CoolInput) */}
      <label 
        className="absolute -top-2.5 left-3 px-1 bg-white text-[0.6rem] font-bold text-[#676768] uppercase tracking-wide z-10 w-fit"
      >
        {label}
      </label>

      <div className="relative">
        <input 
          ref={inputRef}
          type="text" 
          name={name}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder || "Search..."}
          className="w-full pl-3 pr-10 py-2.5 text-xs font-medium text-slate-800 bg-white border border-[#d4d4d6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#676768] transition-shadow placeholder-opacity-60 disabled:bg-slate-100 disabled:text-slate-400"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
            <path opacity="1" d="M14 5H20" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
            <path opacity="1" d="M14 8H17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
            <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path> 
            <path opacity="1" d="M22 22L20 20" stroke="#000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"></path> 
          </svg>
        </div>
      </div>
    </div>
  );
};

const CoolInput = ({ label, name, value, onChange, type, options, placeholder, inputRef, disabled }) => {
  return (
    <div className="flex flex-col w-full relative mt-2 mb-5">
      
      {/* Label sits ON the border */}
      <label 
        className="absolute -top-2.5 left-3 px-1 bg-white text-[0.6rem] font-bold text-[#676768] uppercase tracking-wide z-10 w-fit"
      >
        {label}
      </label>
      
      {type === 'select' ? (
        <div className="relative">
          <select
            ref={inputRef}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full px-3 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-[#676768] placeholder:opacity-20  rounded-md focus:outline-none focus:ring-1 focus:ring-[#676768] transition-shadow appearance-none cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
          >
            <option value="">-- Select --</option>
            {options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          
          {/* Custom Chevron Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#676768]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      ) : (
        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder || "Write here..."}
          className="w-full px-3 py-2.5 text-xs font-medium text-slate-800 bg-white border border-[#d4d4d6] rounded-md focus:outline-none focus:ring-1 focus:ring-[#676768] transition-shadow placeholder-opacity-60 disabled:bg-slate-100 disabled:text-slate-400"
        />
      )}
    </div>
  );
};

const SplitInput = ({ label, name, value, onChange, inputRef, disabled }) => {
    const parts = (value || '').split(' ');
    const part1 = parts[0] || '';
    const part2 = parts.slice(1).join(' ') || '';
  
    const handleSplitChange = (p1, p2) => {
      onChange({ target: { name, value: `${p1} ${p2}`.trim() } });
    };
  
    return (
      <div className="flex flex-col w-full relative mt-2 mb-5">
         <label className="absolute -top-2.5 left-3 px-1 bg-white text-[10px] font-bold text-[#676768] uppercase tracking-wide z-10 w-fit">
            {label}
         </label>
         <div className="flex w-full bg-white border border-[#676768] rounded-md overflow-hidden h-9.5">
            <input
              ref={inputRef}
              type="text"
              value={part1}
              onChange={(e) => handleSplitChange(e.target.value, part2)}
              disabled={disabled}
              placeholder="BSC"
              className="w-1/4 bg-transparent text-slate-800 text-xs font-bold p-2 text-center border-r border-[#676768] outline-none uppercase placeholder-opacity-60 disabled:bg-slate-100 disabled:text-slate-400"
            />
            <input
              type="text"
              value={part2}
              onChange={(e) => handleSplitChange(part1, e.target.value)}
              disabled={disabled}
              placeholder="0000"
              className="flex-1 bg-transparent text-slate-800 text-xs font-medium p-2 outline-none placeholder-opacity-60 disabled:bg-slate-100 disabled:text-slate-400"
            />
         </div>
      </div>
    );
};

export const InputField = (props) => {
  const { type, label, name, value, onChange } = props;

  if (type === 'search') return <SearchInput {...props} />;
  if (type === 'split') return <SplitInput {...props} />;

  if (type === 'checkbox') {
    return (
      <div className="flex items-center space-x-3 p-2 mb-3 hover:bg-slate-50 rounded transition border border-transparent hover:border-slate-200">
        <input
          type="checkbox"
          name={name}
          checked={value || false}
          onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
          className="w-5 h-5 text-[#676768] bg-white border border-[#676768] rounded focus:ring-[#676768] focus:ring-1 cursor-pointer"
        />
        <label className="text-sm font-bold text-slate-600 cursor-pointer">{label}</label>
      </div>
    );
  }

  return <CoolInput {...props} />;
};