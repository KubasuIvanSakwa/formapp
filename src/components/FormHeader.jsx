import React, { useState } from 'react';
import { InputField } from './InputField';
import { AnimatedCheckmark } from './AnimatedCheckmark';

export const FormHeader = ({ formData, handleChange, isComplete, clientIDRef }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border-slate-300 z-20 shrink-0 relative transition-all flex flex-col">
       
       <div className="w-full flex justify-end items-center px-4 md:px-6 pt-3 pb-1 z-30 bg-white">
          <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden md:block">
               Header Status
             </span>
             
             <div className={`relative flex items-center justify-center w-6 h-6 transition-transform duration-500 ${isComplete ? 'scale-110' : 'scale-100 opacity-70'}`}>
                <AnimatedCheckmark isComplete={isComplete} />
             </div>
          </div>
       </div>

       <div className={`transition-all duration-500 ease-in-out overflow-hidden px-4 md:px-6 ${isExpanded ? 'max-h-250' : 'max-h-32'}`}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 max-w-6xl pb-8 pt-2">
               
               <div className="space-y-4">
                 <InputField 
                    label="Client ID" 
                    name="clientID" 
                    value={formData.clientID} 
                    onChange={handleChange} 
                    inputRef={clientIDRef} 
                    type="search" 
                    placeholder="Search by ID..."
                 />

                 <InputField label="Application ID" name="appID" value={formData.appID} onChange={handleChange} />

                 <InputField 
                    label="Client Name" 
                    name="clientName" 
                    value={formData.clientName} 
                    onChange={handleChange} 
                    type="search"
                    placeholder="Search by Name..."
                 />

                 <InputField label="Base ID" name="baseID" type="split" value={formData.baseID} onChange={handleChange} />
               </div>

               <div className="space-y-4 hidden md:block">
                 <InputField label="Client Type" name="clientType" type="select" options={['Enterprises', 'Individual']} value={formData.clientType} onChange={handleChange} />
                 <InputField label="Segment Type" name="segmentType" type="select" options={['Corporate', 'Retail']} value={formData.segmentType} onChange={handleChange} />
                 <InputField label="Sub-Segment Type" name="subSegment" type="select" options={['Public Limited Company', 'Retail']} value={formData.subSegment} onChange={handleChange} />
                 <InputField label="Client Classification" name="clientClass" type="text" value={formData.clientClass} onChange={handleChange} />
               </div>
           </div>
       </div> 
       
       {/* TOGGLE BUTTONS */}
       {!isExpanded && (
         <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-white via-white/90 to-transparent z-20 flex items-end justify-center pb-0 pointer-events-none">
            <button onClick={() => setIsExpanded(true)} className="pointer-events-auto text-[10px] font-bold text-blue-600 bg-white border border-blue-100 px-6 mb-2 py-1.5 rounded-xl shadow-sm hover:bg-blue-50 transition-all translate-y-px">
              Show More Fields ▼
            </button>
         </div>
       )}
       {isExpanded && (
         <div className="w-full flex justify-center py-2 bg-white border-t border-slate-100">
             <button onClick={() => setIsExpanded(false)} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
               ▲ Show Less
             </button>
         </div>
       )}
    </div>
  );
};