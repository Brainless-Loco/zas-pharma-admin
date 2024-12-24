import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

// List of countries with their names and flag emojis
const countries = [
    { name: "Bangladesh", code: "BD", flag: "🇧🇩" },
    { name: "India", code: "IN", flag: "🇮🇳" },
    { name: "United States", code: "US", flag: "🇺🇸" },
    { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
    { name: "Australia", code: "AU", flag: "🇦🇺" },
    { name: "Canada", code: "CA", flag: "🇨🇦" },
    { name: "Germany", code: "DE", flag: "🇩🇪" },
    { name: "France", code: "FR", flag: "🇫🇷" },
    { name: "Italy", code: "IT", flag: "🇮🇹" },
    { name: "Spain", code: "ES", flag: "🇪🇸" },
    { name: "Mexico", code: "MX", flag: "🇲🇽" },
    { name: "Brazil", code: "BR", flag: "🇧🇷" },
    { name: "Russia", code: "RU", flag: "🇷🇺" },
    { name: "China", code: "CN", flag: "🇨🇳" },
    { name: "Japan", code: "JP", flag: "🇯🇵" },
    { name: "South Korea", code: "KR", flag: "🇰🇷" },
    { name: "South Africa", code: "ZA", flag: "🇿🇦" },
    { name: "Egypt", code: "EG", flag: "🇪🇬" },
    { name: "Argentina", code: "AR", flag: "🇦🇷" },
    { name: "Nigeria", code: "NG", flag: "🇳🇬" },
    { name: "Indonesia", code: "ID", flag: "🇮🇩" },
    { name: "Pakistan", code: "PK", flag: "🇵🇰" },
    { name: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
    { name: "Turkey", code: "TR", flag: "🇹🇷" },
    { name: "Iran", code: "IR", flag: "🇮🇷" },
    { name: "Vietnam", code: "VN", flag: "🇻🇳" },
    { name: "Ukraine", code: "UA", flag: "🇺🇦" },
    { name: "Philippines", code: "PH", flag: "🇵🇭" },
    { name: "Thailand", code: "TH", flag: "🇹🇭" },
    { name: "Poland", code: "PL", flag: "🇵🇱" },
    { name: "Romania", code: "RO", flag: "🇷🇴" },
    { name: "Chile", code: "CL", flag: "🇨🇱" },
    { name: "Colombia", code: "CO", flag: "🇨🇴" },
    { name: "Malaysia", code: "MY", flag: "🇲🇾" },
    { name: "Singapore", code: "SG", flag: "🇸🇬" },
    { name: "Netherlands", code: "NL", flag: "🇳🇱" },
    { name: "Belgium", code: "BE", flag: "🇧🇪" },
    { name: "Sweden", code: "SE", flag: "🇸🇪" },
    { name: "Norway", code: "NO", flag: "🇳🇴" },
    { name: "Finland", code: "FI", flag: "🇫🇮" },
    { name: "Denmark", code: "DK", flag: "🇩🇰" },
    { name: "Switzerland", code: "CH", flag: "🇨🇭" },
    { name: "Austria", code: "AT", flag: "🇦🇹" },
    { name: "Greece", code: "GR", flag: "🇬🇷" },
    { name: "Portugal", code: "PT", flag: "🇵🇹" },
    { name: "Czech Republic", code: "CZ", flag: "🇨🇿" },
    { name: "Hungary", code: "HU", flag: "🇭🇺" },
    { name: "Slovakia", code: "SK", flag: "🇸🇰" },
    { name: "Croatia", code: "HR", flag: "🇭🇷" },
    { name: "Bulgaria", code: "BG", flag: "🇧🇬" },
    { name: "Slovenia", code: "SI", flag: "🇸🇮" },
    { name: "Serbia", code: "RS", flag: "🇷🇸" },
    { name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦" },
    { name: "Montenegro", code: "ME", flag: "🇲🇪" },
    { name: "North Macedonia", code: "MK", flag: "🇲🇰" },
    { name: "Albania", code: "AL", flag: "🇦🇱" },
    { name: "Kosovo", code: "XK", flag: "🇽🇰" },
  ];
  
  
function CountryAutocomplete({ value, onChange }) {
  const [selectedCountry, setSelectedCountry] = useState(value);

  const handleSelect = (event, newValue) => {
    setSelectedCountry(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Autocomplete
      value={selectedCountry}
      onChange={handleSelect}
      options={countries}
      getOptionLabel={(option) => option.name?`${option.name}  ${option.flag}`:""}
      renderInput={(params) => <TextField {...params} label="Origin" />}
      renderOption={(props, option) => (
        <li {...props}>
           {option.name} <span>&nbsp;{option.flag}</span>
        </li>
      )}
      isOptionEqualToValue={(option, value) => option.code === value?.code}
      fullWidth
    />
  );
}

export default CountryAutocomplete;
