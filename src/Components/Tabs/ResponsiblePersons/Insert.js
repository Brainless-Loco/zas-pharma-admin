import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Divider from "@mui/material/Divider";
import StatusModal from "../../Modal/StatusModal";
import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../Utils/firebase";

const InsertResponsiblePerson = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [person, setPerson] = useState({
    name: "",
    rank: "",
    company: "",
    mobiles: [""],
    email: "",
  });
  const [status, setStatus] = useState({ open: false, message: "", success: false });
  const [loading, setLoading] = useState(true);

  // Fetch categories from the Categories collection
  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "Categories"));
      const fetchedCategories = [];
      querySnapshot.forEach((doc) => {
        fetchedCategories.push({ id: doc.id, title: doc.data().title });
      });
      setCategories(fetchedCategories);
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPerson({ ...person, [name]: value });
  };

  // Handle mobile number changes
  const handleMobileChange = (index, value) => {
    const updatedMobiles = [...person.mobiles];
    updatedMobiles[index] = value;
    setPerson({ ...person, mobiles: updatedMobiles });
  };

  // Add another mobile field
  const addMobileField = () => {
    setPerson({ ...person, mobiles: [...person.mobiles, ""] });
  };

  // Submit handler
  const handleSubmit = async () => {
    if (!selectedCategory) {
      setStatus({ open: true, message: "Please select a category", success: false });
      return;
    }
  
    const newPerson = {
      ...person,
      category: {
        id: selectedCategory.id,
        title: selectedCategory.title,
      },
    };
  
    try {
      // Add to the ResponsiblePersons subcollection in the selected category document
      const responsiblePersonsSubcollection = collection(db, `Categories/${selectedCategory.id}/`, "ResponsiblePersons");
      await addDoc(responsiblePersonsSubcollection, newPerson);
  
      // Add to the main ResponsiblePersons collection with category info
      const responsiblePersonsCollection = collection(db, "ResponsiblePersons/");
      await addDoc(responsiblePersonsCollection, newPerson);
  
      // Update status and reset the form

      setStatus({
        open: true,
        message: "Responsible person added successfully!",
        success: true,
      });
  
      setPerson({ name: "", rank: "", company: "", mobiles: [""], email: "" });
    } catch (error) {
      console.error("Error adding responsible person:", error);
      setStatus({
        open: true,
        message: error.message,
        success: false,
      });
    }
  };

  return (
    <Box className="p-6 w-full rounded mx-auto bg-gray-50">
      <Typography variant="h4" className="mb-5 font-semibold">
        Insert Responsible Person
      </Typography>
      
      <Divider sx={{ my: 2 }} />

      <Autocomplete
        options={categories}
        getOptionLabel={(option) => option.title}
        value={selectedCategory}
        onChange={(event, value) => setSelectedCategory(value)}
        renderInput={(params) => <TextField {...params} label="Category" />}
        sx={{ mb: 3 }}
      />

      <Divider sx={{ my: 2 }} />
      <Box className="mb-4">
        <TextField
          label="Name"
          name="name"
          value={person.name}
          onChange={handleInputChange}
          fullWidth
          className="mb-4"
          disabled={!selectedCategory}
        />
        
        <Divider sx={{ my: 2 }} />
        <strong className="w-full">Position</strong>
        <Box className="mb-4 mt-1 flex flex-row gap-3">
          <TextField label="Rank" name="rank"
            value={person.rank} onChange={handleInputChange}
            className="mb-4 w-1/2" disabled={!selectedCategory}
          />
          <TextField
            label="Company" name="company"
            value={person.company} onChange={handleInputChange}
            className="mb-4 w-1/2" disabled={!selectedCategory}
          />
        </Box>
        
        <TextField
          label="Email"
          name="email"
          value={person.email}
          onChange={handleInputChange}
          fullWidth
          className="mb-4"
          disabled={!selectedCategory}
        />
      </Box>

      <strong>
        Mobile Numbers
      </strong>
      {person.mobiles.map((mobile, index) => (
        <Box key={index} className="flex items-center gap-2 mt-2 mb-4">
          <TextField
            label={`Mobile ${index + 1}`}
            value={mobile}
            onChange={(e) => handleMobileChange(index, e.target.value)}
            fullWidth
            disabled={!selectedCategory}
          />
        </Box>
      ))}
      <Button
        variant="outlined"
        onClick={addMobileField}
        disabled={!selectedCategory}
      >
        Add Another Mobile
      </Button>

      <Box className="mt-5">        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          fullWidth
          disabled={!selectedCategory}
        >
          Add Responsible Person
        </Button>
      </Box>

      <StatusModal
        open={status.open}
        message={status.message}
        success={status.success}
        onClose={() => setStatus({ ...status, open: false })}
      />
    </Box>
  );
};

export default InsertResponsiblePerson;
