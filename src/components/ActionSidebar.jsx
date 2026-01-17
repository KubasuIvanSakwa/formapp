import React from 'react';
import SideBarButton from './SideBarButton';

export const ActionSidebar = ({ onSave, onView, onAdd, onEdit }) => {
  return (
    <div className="w-full h-full flex items-center flex-row md:flex-col md:justify-end gap-2 md:gap-6 md:items-end p-2 md:py-6 md:pr-4  z-40 fixed bottom-0 md:static overflow-visible">
        
        <SideBarButton label="View" onClick={onView} />
        <SideBarButton label="Add" onClick={onAdd} />
        <SideBarButton label="Edit" active onClick={onEdit} />
        
        <div className="hidden md:block md:flex-1"/>
        
        <SideBarButton label="Save" primary onClick={onSave} />
        <SideBarButton label="Exit" color="text-red-500" onClick={() => window.location.reload()} />

    </div>
  );
};