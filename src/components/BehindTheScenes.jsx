import React from 'react';

export const BehindTheScenes = ({ data }) => {
  return (
    <div className="flex flex-col gap-2 font-mono text-[9px]">
      
      {/* HEADER */}
      <div className="border-b-2 border-black pb-1 mb-1 flex justify-between items-center">
         <span className="font-bold uppercase">SYSTEM_LOG</span>
         <span className="bg-black text-white px-1 font-bold">
            {data.btsStatus || 'ACTIVE'}
         </span>
      </div>

      {/* DATES */}
      <div className="grid grid-cols-2 gap-2 border-b border-black pb-2">
         <div>
            <span className="block font-bold">OPEN:</span>
            <span>{data.btsOpenDate || 'N/A'}</span>
         </div>
         <div>
            <span className="block font-bold">CLOSE:</span>
            <span>{data.btsClosedDate || 'N/A'}</span>
         </div>
      </div>

      {/* LOG LIST */}
      <div className="flex flex-col gap-2 pt-1">
         <LogItem label="CREATOR" user={data.btsCreatedBy} date={data.btsCreatedOn} />
         <LogItem label="MODIFIER" user={data.btsModifiedBy} date={data.btsModifiedOn} />
         <LogItem label="SUPERVISOR" user={data.btsSupervisedBy} date={data.btsSupervisedOn} />
      </div>
    </div>
  );
};

const LogItem = ({ label, user, date }) => (
  <div className="flex flex-col">
     <div className="flex justify-between">
        <span className="font-bold">{label}:</span>
        <span className="truncate max-w-20">{user || '---'}</span>
     </div>
     <span className="text-gray-500 text-right">{date || '--/--/----'}</span>
  </div>
);