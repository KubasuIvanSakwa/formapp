import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router';
import { InputField } from '../components/InputField';

const EAST_AFRICA_DATA = {
  Kenya: {
    regions: [
      { 
        name: "Nairobi", 
        districts: [
          { name: "Westlands", wards: ["Kitisuru", "Parklands", "Karura", "Kangemi"] },
          { name: "Kasarani", wards: ["Clay City", "Mwiki", "Kasarani", "Njiru"] },
          { name: "Langata", wards: ["Karen", "Nairobi West", "Mugumo-ini"] }
        ] 
      },
      { name: "Mombasa", districts: [{ name: "Nyali", wards: ["Frere Town", "Ziwa La Ngombe"] }, { name: "Likoni", wards: ["Mtongwe", "Shika Adabu"] }] },
      { name: "Kisumu", districts: [{ name: "Kisumu Central", wards: ["Railways", "Migosi"] }, { name: "Kisumu East", wards: ["Kajulu", "Kolwa"] }] },
      { name: "Nakuru", districts: [{ name: "Naivasha", wards: ["Biashara", "Hells Gate"] }, { name: "Nakuru East", wards: ["Flamingo", "Menengai"] }] },
      { name: "Uasin Gishu", districts: [{ name: "Eldoret North", wards: ["Huruma", "Kamukunji"] }] },
      { name: "Kiambu", districts: [{ name: "Thika", wards: ["Township", "Hospital"] }, { name: "Ruiru", wards: ["Biashara", "Githurai"] }] },
      { name: "Machakos", districts: [{ name: "Mavoko", wards: ["Athi River", "Syokimau"] }] }
    ]
  },
  Tanzania: {
    regions: [
      { 
        name: "Dar es Salaam", 
        districts: [
          { name: "Ilala", wards: ["Kariakoo", "Upanga"] },
          { name: "Kinondoni", wards: ["Oysterbay", "Masaki"] }
        ] 
      },
      { name: "Arusha", districts: [{ name: "Arusha City", wards: ["Sekei", "Kaloleni"] }, { name: "Meru", wards: ["Usa River", "Singisi"] }] },
      { name: "Dodoma", districts: [{ name: "Dodoma Urban", wards: ["Kikuyu", "Hazina"] }] },
      { name: "Mwanza", districts: [{ name: "Ilemela", wards: ["Kirumba", "Nyamanoro"] }] },
      { name: "Kilimanjaro", districts: [{ name: "Moshi", wards: ["Kibosho", "Marangu"] }, { name: "Hai", wards: ["Machame", "Masama"] }] },
      { name: "Tanga", districts: [{ name: "Tanga City", wards: ["Ngamiani", "Chumbageni"] }] },
      { name: "Zanzibar", districts: [{ name: "Stone Town", wards: ["Shangani", "Malindi"] }] }
    ]
  },
  Uganda: {
    regions: [
      { name: "Central", districts: [{ name: "Kampala", wards: ["Central", "Nakawa"] }, { name: "Wakiso", wards: ["Entebbe", "Kira"] }] },
      { name: "Western", districts: [{ name: "Mbarara", wards: ["Kakoba", "Nyamitanga"] }] },
      { name: "Eastern", districts: [{ name: "Jinja", wards: ["Walukuba", "Mpumudde"] }] },
      { name: "Northern", districts: [{ name: "Gulu", wards: ["Pece", "Layibi"] }] },
      { name: "West Nile", districts: [{ name: "Arua", wards: ["River Oli", "Ayivu"] }] },
      { name: "South-Western", districts: [{ name: "Kabale", wards: ["Northern", "Southern"] }] },
      { name: "Karamoja", districts: [{ name: "Moroto", wards: ["North", "South"] }] }
    ]
  },
  Rwanda: {
    regions: [
      { name: "Kigali", districts: [{ name: "Gasabo", wards: ["Kacyiru", "Remera"] }, { name: "Nyarugenge", wards: ["Nyamirambo", "Kigali"] }] },
      { name: "Northern", districts: [{ name: "Musanze", wards: ["Muhoza", "Cyuve"] }] },
      { name: "Southern", districts: [{ name: "Huye", wards: ["Ngoma", "Tumba"] }] },
      { name: "Eastern", districts: [{ name: "Rwamagana", wards: ["Kigabiro", "Muhazi"] }] },
      { name: "Western", districts: [{ name: "Rubavu", wards: ["Gisenyi", "Rugerero"] }] }
    ]
  },
  Burundi: {
    regions: [
      { name: "Bujumbura Mairie", districts: [{ name: "Mukaza", wards: ["Rohero", "Nyakabiga"] }] },
      { name: "Gitega", districts: [{ name: "Gitega", wards: ["Magarama", "Nyamugari"] }] },
      { name: "Ngozi", districts: [{ name: "Ngozi", wards: ["Muremera", "Kigwati"] }] }
    ]
  }
};

function AddressTab() {
  const { formData, handleChange, isViewMode } = useOutletContext();

  // Countries
  const countryOptions = Object.keys(EAST_AFRICA_DATA);

  // Regions (Based on selected Country)
  const regionOptions = useMemo(() => {
    const selectedCountry = EAST_AFRICA_DATA[formData.country];
    return selectedCountry ? selectedCountry.regions.map(r => r.name) : [];
  }, [formData.country]);

  // Districts (Based on selected Region)
  const districtOptions = useMemo(() => {
    const selectedCountry = EAST_AFRICA_DATA[formData.country];
    if (!selectedCountry) return [];
    
    const selectedRegion = selectedCountry.regions.find(r => r.name === formData.region2);
    return selectedRegion ? selectedRegion.districts.map(d => d.name) : [];
  }, [formData.country, formData.region2]);

  // Wards (Based on selected District)
  const wardOptions = useMemo(() => {
    const selectedCountry = EAST_AFRICA_DATA[formData.country];
    if (!selectedCountry) return [];

    const selectedRegion = selectedCountry.regions.find(r => r.name === formData.region2);
    if (!selectedRegion) return [];

    const selectedDistrict = selectedRegion.districts.find(d => d.name === formData.district);
    return selectedDistrict ? selectedDistrict.wards : [];
  }, [formData.country, formData.region2, formData.district]);


  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    
    handleChange(e);

    if (name === 'country') {
      handleChange({ target: { name: 'region2', value: '' } }); // Reset Region
      handleChange({ target: { name: 'district', value: '' } }); // Reset District
      handleChange({ target: { name: 'ward', value: '' } });     // Reset Ward
    } 
    else if (name === 'region2') {
      handleChange({ target: { name: 'district', value: '' } }); // Reset District
      handleChange({ target: { name: 'ward', value: '' } });     // Reset Ward
    }
    else if (name === 'district') {
      handleChange({ target: { name: 'ward', value: '' } });     // Reset Ward
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
        
        <div className="space-y-3">
            <InputField label="Residential Address" name="resAddress" value={formData.resAddress} onChange={handleChange} disabled={isViewMode} />
            <InputField label="Business Address" name="busAddress" value={formData.busAddress} onChange={handleChange} disabled={isViewMode} />
            <InputField label="Office Address" name="offAddress" value={formData.offAddress} onChange={handleChange} disabled={isViewMode} />
            <InputField label="Mailing Address" name="mailAddress" value={formData.mailAddress} onChange={handleChange} disabled={isViewMode} />
            <InputField label="Home Country Address" name="homeCountryAddress" value={formData.homeCountryAddress} onChange={handleChange} disabled={isViewMode} />
            <InputField label="Address 2" name="address2" value={formData.address2} onChange={handleChange} disabled={isViewMode} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-dashed border-slate-300">
            
            {/* Left Column */}
            <InputField label="Region (State)" name="region1" value={formData.region1} onChange={handleChange} disabled={isViewMode} />
            
            {/* Right Column */}
            <InputField label="Street" name="street" value={formData.street} onChange={handleChange} disabled={isViewMode} />

            
            {/* Country */}
            <InputField 
                label="Country" 
                name="country" 
                type="select" 
                options={countryOptions} 
                value={formData.country} 
                onChange={handleLocationChange} // Use smart handler
                disabled={isViewMode}
            />
            
            <InputField label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleChange} disabled={isViewMode} />

            {/* Region */}
            <InputField 
                label="Region / County" 
                name="region2" 
                type="select" 
                options={regionOptions} 
                value={formData.region2} 
                onChange={handleLocationChange} // Use smart handler
                disabled={isViewMode || !formData.country} // Disable if no country selected
            />
            
            <InputField label="Phone(Home)" name="phoneHome" value={formData.phoneHome} onChange={handleChange} disabled={isViewMode} />

            {/* District / Sub-County */}
            <InputField 
                label="District / Sub-County" 
                name="district" 
                type="select" 
                options={districtOptions} 
                value={formData.district} 
                onChange={handleLocationChange} 
                disabled={isViewMode || !formData.region2}
            />

            {/*  Ward */}
            <InputField 
                label="Ward" 
                name="ward" 
                type="select" 
                options={wardOptions} 
                value={formData.ward} 
                onChange={handleLocationChange} 
                disabled={isViewMode || !formData.district}
            />


            <InputField label="Phone(Work)" name="phoneWork" value={formData.phoneWork} onChange={handleChange} disabled={isViewMode} />
            <InputField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} disabled={isViewMode} />
            <InputField label="Fax No" name="fax" value={formData.fax} onChange={handleChange} disabled={isViewMode} />
            <InputField label="Email ID" name="email" value={formData.email} onChange={handleChange} disabled={isViewMode} />

            <div className="md:col-span-2">
                <InputField label="Land Mark" name="landMark" value={formData.landMark} onChange={handleChange} disabled={isViewMode} />
            </div>
        </div>
    </div>
  )
}

export default AddressTab;