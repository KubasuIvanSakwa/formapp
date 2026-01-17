import React from 'react';
import { useOutletContext } from 'react-router'; 
import CustomCheckbox from './CustomCheckbox';

function SpecialOffersTab() {
  const { formData, handleChange, isViewMode } = useOutletContext();

  return (
    <div className="space-y-6 animate-fadeIn">
        
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b pb-2">
                Communication Preferences
            </h3>
            
            <div className="flex flex-col gap-1">
                <CustomCheckbox 
                    label="Can Send Greetings" 
                    name="canSendGreetings" 
                    checked={formData.canSendGreetings} 
                    onChange={handleChange} 
                    disabled={isViewMode}
                />
                
                <CustomCheckbox 
                    label="Can Send Associate Special Offer" 
                    name="canSendAssocOffers" 
                    checked={formData.canSendAssocOffers} 
                    onChange={handleChange} 
                    disabled={isViewMode}
                />
                
                <CustomCheckbox 
                    label="Can Send Our Special Offers" 
                    name="canSendOurOffers" 
                    checked={formData.canSendOurOffers} 
                    onChange={handleChange} 
                    disabled={isViewMode}
                />
                
                {/* Visual separator */}
                <div className="my-4 border-t border-dashed border-slate-200"></div>

                <CustomCheckbox 
                    label="Statement Online" 
                    name="statementOnline" 
                    checked={formData.statementOnline} 
                    onChange={handleChange} 
                    disabled={isViewMode}
                />
                
                <CustomCheckbox 
                    label="Mobile Alert" 
                    name="mobileAlert" 
                    checked={formData.mobileAlert} 
                    onChange={handleChange} 
                    disabled={isViewMode}
                />
            </div>
        </div>
    </div>
  )
}

export default SpecialOffersTab;