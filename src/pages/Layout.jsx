import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Outlet, useSearchParams } from 'react-router'; 
import { ProgressSidebar } from '../components/ProgressSidebar';
import { FormHeader } from '../components/FormHeader';
import { ActionSidebar } from '../components/ActionSidebar';
import { FormNavigation } from '../components/FormNavigation';

const API_BASE_URL = 'https://formappdb.onrender.com/api/v1';

const FORM_STEPS = ['Corporate', 'Address', 'Special Offers'];
const VIEW_STEPS = ['Directors Details'];
const REQUIRED_FIELDS = {
  'Corporate': ['companyName', 'natureOfBusiness', 'regNo', 'tinNumber', 'relationManager'],
  'Address': ['resAddress', 'country', 'mobile', 'email', 'region2'],
  'Special Offers': [] 
};

const initialFormData = {
    clientID: '', clientType: '', segmentType: '', subSegment: '',
    appID: '', clientClass: '', clientName: '', baseID: '',
    companyName: '', lineOfBusiness: 'P', lobInfo: '', natureOfBusiness: '', 
    idType: '', regNo: '', regDate: '', registeredAt: '', registeredOffice: '', 
    businessStarted: '', employees: '', comments: '', website: '', 
    openedBy: '', relationManager: '', openedOn: '', tinNumber: '',
    resAddress: '', busAddress: '', offAddress: '', mailAddress: '', homeCountryAddress: '', 
    address2: '', region1: '', street: '', country: '', zipCode: '', 
    region2: '', phoneHome: '', ward: '', district: '', 
    phoneWork: '', mobile: '', fax: '', email: '', landMark: '',
    canSendGreetings: false, canSendAssocOffers: false, canSendOurOffers: false, 
    statementOnline: false, mobileAlert: false,
    btsStatus: '', btsOpenDate: '', btsClosedDate: '',
    btsCreatedBy: '', btsModifiedBy: '', btsSupervisedBy: '',
    btsCreatedOn: '', btsModifiedOn: '', btsSupervisedOn: ''
};

function Layout() {
    const [searchParams, setSearchParams] = useSearchParams();
    const scrollContainerRef = useRef(null);
    
    const clientIDRef = useRef(null);

    const [formData, setFormData] = useState(initialFormData);
    const [existingClients, setExistingClients] = useState([]); 
    const [isSearching, setIsSearching] = useState(false); 

    const [status, setStatus] = useState({ visible: false, type: 'idle', message: '' });

    const activeTab = searchParams.get('tab') || 'Corporate';
    const setActiveTab = (tabName) => setSearchParams({ tab: tabName });

    useEffect(() => {
        const fetchAllClients = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/clients`);
                const clients = Array.isArray(response.data) ? response.data : response.data.data;
                setExistingClients(clients || []);
            } catch (error) {
                console.error("Failed to load existing clients:", error);
            }
        };
        fetchAllClients();
    }, []);

    useEffect(() => {
        if (!formData.clientID && !formData.clientName) return;

        const delaySearch = setTimeout(() => {
            // Show Loading Indicator
            setStatus({ visible: true, type: 'loading', message: 'Checking Records...' });

            setTimeout(() => {
                const match = existingClients.find(client => {
                    const idMatch = client.clientID && formData.clientID && 
                                    String(client.clientID) === String(formData.clientID);
                    const nameMatch = client.clientName && formData.clientName && 
                                      String(client.clientName).toLowerCase() === String(formData.clientName).toLowerCase();
                    return idMatch || nameMatch;
                });

                if (match) {
                    const needsUpdate = Object.keys(match).some(key => {
                        if (key.startsWith('_')) return false;
                        return match[key] != formData[key];
                    });

                    if (needsUpdate) {
                        setFormData({ ...initialFormData, ...match });

                        setStatus({ visible: true, type: 'success', message: 'Record Found!' });
                        setTimeout(() => setStatus({ visible: false, type: 'idle', message: '' }), 1000);
                        return; 
                    }
                }
                
                setStatus({ visible: false, type: 'idle', message: '' });

            }, 600); 
        }, 800); 

        return () => clearTimeout(delaySearch);
    }, [formData.clientID, formData.clientName, existingClients]);


    const handleToggleSearch = () => setIsSearching(prev => !prev);

    const handleResetAndFocus = () => {
        // Clear Data
        setFormData(initialFormData);
        setActiveTab("Corporate");
        setIsSearching(false);
        
        setTimeout(() => {
            if (clientIDRef.current) {
                clientIDRef.current.focus();
            }
        }, 100);
    };

    const handleSave = async () => {
        if (!formData.clientID) {
            setStatus({ visible: true, type: 'error', message: 'Client ID is required.' });
            return;
        }

        setStatus({ visible: true, type: 'loading', message: 'Saving Data...' });

        try {
            const existingRecord = existingClients.find(client => 
                String(client.clientID) === String(formData.clientID)
            );

            let response;
            if (existingRecord) {
                const recordId = existingRecord._id; 
                console.log(`Updating Mongo ID: ${recordId}`); 
                
                response = await axios.put(`${API_BASE_URL}/clients/${recordId}`, formData);

                if (response.status === 200 || response.data.success) {
                    const updatedClient = response.data.data.client || response.data.data;

                    setFormData(updatedClient);

                    setExistingClients(prev => prev.map(item => 
                        item._id === recordId ? updatedClient : item
                    ));
                }
            } else {
                response = await axios.post(`${API_BASE_URL}/clients/create`, formData);
                
                if (response.status === 201 || response.status === 200 || response.data.success) {
                    const newClient = response.data.data.client || response.data.data;
                    
                    setFormData(newClient);

                    setExistingClients(prev => [...prev, newClient]);
                }
            }

            setStatus({ visible: true, type: 'success', message: 'Saved Successfully!' });
            setTimeout(() => setStatus({ visible: false, type: 'idle', message: '' }), 1500);

        } catch (error) {
            console.error("Save Error:", error);
            const msg = error.response?.data?.message || error.message;
            setStatus({ visible: true, type: 'error', message: `Error: ${msg}` });
        }
    };

    const closeStatus = () => setStatus({ visible: false, type: 'idle', message: '' });

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [activeTab]);

    const isHeaderComplete = useMemo(() => {
        const headerFields = ["clientID", "appID", "clientName", "baseID", "clientType", "segmentType", "subSegment", "clientClass"];
        return headerFields.every((field) => formData[field] && String(formData[field]).trim() !== "");
    }, [formData]);

    const calculateProgress = useMemo(() => {
        let totalReq = 0;
        let totalFilled = 0;
        const tabStatus = {};

        FORM_STEPS.forEach(tab => {
            const fields = REQUIRED_FIELDS[tab] || [];
            const tabFilledCount = fields.reduce((acc, field) => {
                const val = formData[field];
                return acc + (val && String(val).trim() !== '' ? 1 : 0);
            }, 0);

            tabStatus[tab] = fields.length === 0 ? true : tabFilledCount === fields.length;
            totalReq += fields.length;
            totalFilled += tabFilledCount;
        });

        return { 
            tabStatus, 
            globalPercentage: totalReq === 0 ? 100 : Math.round((totalFilled / totalReq) * 100) 
        };
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <main className="flex h-screen w-screen bg-slate-50 overflow-hidden font-sans p-1 relative">
            
            {/* STATUS OVERLAY */}
            {status.visible && (
                <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
                    <div className={`
                        px-8 py-6 rounded-xl shadow-2xl border flex flex-col items-center gap-4 min-w-62.5
                        ${status.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-white border-blue-100'}
                    `}>
                        {status.type === 'loading' && <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>}
                        {status.type === 'success' && <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl animate-bounce-short">✓</div>}
                        {status.type === 'error' && <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-bold">!</div>}
                        
                        <span className={`text-sm font-bold uppercase tracking-widest ${
                            status.type === 'error' ? 'text-red-600' : status.type === 'success' ? 'text-green-600' : 'text-blue-600'
                        }`}>{status.message}</span>

                        {status.type === 'error' && (
                            <button onClick={closeStatus} className="mt-2 text-xs bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-md transition-colors">
                                Close & Fix
                            </button>
                        )}
                    </div>
                </div>
            )}

            <aside className="h-full shrink-0 z-20 border-r border-slate-200 bg-white shadow-sm">
                <ProgressSidebar
                    activeTab={activeTab} 
                    formSteps={FORM_STEPS}
                    viewSteps={VIEW_STEPS}
                    progress={calculateProgress}
                    formData={formData}
                />
            </aside>

            <section className="flex-1 flex flex-col h-full relative min-w-0">
                <div className="shrink-0 z-10 bg-white/80 backdrop-blur-md sticky top-0">
                    <FormHeader 
                        formData={formData} 
                        handleChange={handleChange} 
                        isComplete={isHeaderComplete}
                        clientIDRef={clientIDRef}
                    />
                </div>

                <div className="flex-1 overflow-y-auto scroll-smooth p-6 md:p-10 pb-32">
                    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
                        <Outlet context={{ formData, handleChange }} />
                        <FormNavigation steps={FORM_STEPS} />
                    </div>
                </div>
            </section>

            <aside className="h-full w-40 shrink-0 z-30">
                <ActionSidebar 
                    onSave={handleSave}
                    onAdd={handleResetAndFocus}
                    onView={handleResetAndFocus}
                    onEdit={handleResetAndFocus}
                />
            </aside>

        </main>
    );
}

export default Layout;