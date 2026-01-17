import React from 'react';
import { useOutletContext } from 'react-router'; // 1. Import the hook
import { InputField } from '../components/InputField';

function CorperateTab() {
  const { formData, handleChange, isViewMode } = useOutletContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 animate-fadeIn">
        
        <div className="md:col-span-2">
            <InputField 
              label="Company Name" 
              name="companyName" 
              value={formData.companyName} 
              onChange={handleChange} 
              disabled={isViewMode}
            />
        </div>

        <InputField 
          label="Line Of Business" 
          name="lineOfBusiness" 
          type="select" 
          options={['Proprietary']} 
          value={formData.lineOfBusiness} 
          onChange={handleChange}
          disabled={isViewMode} 
        />
        <InputField 
          label="Line Of Business More Info" 
          name="lobInfo" 
          value={formData.lobInfo} 
          onChange={handleChange}
          disabled={isViewMode} 
        />

        <InputField 
          label="Nature Of Business" 
          name="natureOfBusiness" 
          value={formData.natureOfBusiness} 
          onChange={handleChange}
          disabled={isViewMode} 
        />
        <InputField 
          label="Identification Type" 
          name="idType" 
          type="select" 
          options={['TIN', 'Reg No']} 
          value={formData.idType} 
          onChange={handleChange}
          disabled={isViewMode} 
        />

        <InputField 
          label="Registration No." 
          name="regNo" 
          value={formData.regNo} 
          onChange={handleChange}
          disabled={isViewMode} 
        />
        <InputField 
          label="Date Of Registration" 
          name="regDate" 
          type="date" 
          value={formData.regDate} 
          onChange={handleChange}
          disabled={isViewMode} 
        />

        <InputField 
          label="Registered At" 
          name="registeredAt" 
          value={formData.registeredAt} 
          onChange={handleChange}
          disabled={isViewMode} 
        />
        <InputField 
          label="Registered Office" 
          name="registeredOffice" 
          value={formData.registeredOffice} 
          onChange={handleChange}
          disabled={isViewMode} 
        />

        <InputField 
          label="Business Started Year" 
          name="businessStarted" 
          value={formData.businessStarted} 
          onChange={handleChange}
          disabled={isViewMode} 
        />
        <InputField 
          label="No Of Employees / Members" 
          name="employees" 
          value={formData.employees} 
          onChange={handleChange}
          disabled={isViewMode} 
        />

        <div className="md:col-span-2">
            <InputField 
              label="WebSite" 
              name="website" 
              value={formData.website} 
              onChange={handleChange}
              disabled={isViewMode} 
            />
        </div>
        <div className="md:col-span-2">
            <InputField 
              label="Comments" 
              name="comments" 
              value={formData.comments} 
              onChange={handleChange}
              disabled={isViewMode} 
            />
        </div>

        <InputField 
          label="Opened By" 
          name="openedBy" 
          type="split"        
          value={formData.openedBy} 
          onChange={handleChange} 
          disabled={isViewMode}
        />
        <InputField 
          label="Opened On" 
          name="openedOn" 
          type="date" 
          value={formData.openedOn} 
          onChange={handleChange}
          disabled={isViewMode} 
        />

        <InputField 
          label="Relationship Manager" 
          name="relationManager" 
          type="select" 
          options={['Manager A', 'Manager B']} 
          value={formData.relationManager} 
          onChange={handleChange}
          disabled={isViewMode} 
        />
        <InputField 
          label="TIN Number" 
          name="tinNumber" 
          value={formData.tinNumber} 
          onChange={handleChange}
          disabled={isViewMode} 
        />
        
    </div>
  )
}

export default CorperateTab