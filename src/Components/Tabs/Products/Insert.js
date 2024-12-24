import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  Typography,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { collection, getDocs, doc, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../../Utils/firebase";
import DynamicField from "../../DynamicField/DynamicField";
import StatusModal from "../../Modal/StatusModal";
import Autocomplete from "@mui/material/Autocomplete";
import CountryAutocomplete from "./CountryAutoComplete";

function InsertProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [product, setProduct] = useState({
    title: "",
    alternative_title: "",
    generic_name: "",
    origin: "",
    manufacturer_info: { name: "", external_link: "" },
    availability_options: [{ option_title: "", price: "", if_available: true }],
    dosage: [""],
    side_effects: [""],
    indications: [""],
    pictures: [],
  });
  const [uploadedPictures, setUploadedPictures] = useState([]);
  const [modalProps, setModalProps] = useState({
    open: false,
    message: "",
    type: "pending",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDynamicFieldChange = (field, index, value) => {
    const updatedField = [...product[field]];
    updatedField[index] = value;
    setProduct({ ...product, [field]: updatedField });
  };

  const handleAddDynamicField = (field) => {
    setProduct((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemoveDynamicField = (field, index) => {
    setProduct((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, idx) => idx !== index),
    }));
  };

  const handleAddAvailabilityOption = () => {
    setProduct((prev) => ({
      ...prev,
      availability_options: [
        ...prev.availability_options,
        { option_title: "", price: "", if_available: true },
      ],
    }));
  };

  const handleRemoveAvailabilityOption = (index) => {
    setProduct((prev) => ({
      ...prev,
      availability_options: prev.availability_options.filter((_, idx) => idx !== index),
    }));
  };

  const handleAvailabilityOptionChange = (index, field, value) => {
    const updatedOptions = [...product.availability_options];
    updatedOptions[index][field] = value;
    setProduct({ ...product, availability_options: updatedOptions });
  };

  const handleSubmit = async () => {
    setModalProps({ open: true, message: "Saving product...", type: "pending" });

    try {
      const categoryProductRef = await addDoc(collection(db, `Categories/${selectedCategory.id}/Products`), {
        ...product,
        pictures: uploadedPictures,
        createdAt: serverTimestamp(),
      });

      const productRef = await addDoc(collection(db, `Products/`),{
        ...product,
        pictures: uploadedPictures,
        createdAt: serverTimestamp(),
        categoryId: selectedCategory.id,
        productId: categoryProductRef.id,
      })

      const categoryRef = doc(db, "Categories", selectedCategory.id);
      await updateDoc(categoryRef, {
        product_summary: [
          ...(categories.find((cat) => cat.id === selectedCategory.id).product_summary || []),
          {
            title: product.title,
            generic_name: product.generic_name,
            available_options: product.availability_options,
          },
        ],
      });

      setModalProps({ open: true, message: "Product saved successfully!", type: "success" });
      setProduct({
        title: "",
        alternative_title: "",
        generic_name: "",
        origin: "",
        manufacturer_info: { name: "", external_link: "" },
        availability_options: [{ option_title: "", price: "", if_available: true }],
        dosage: [""],
        side_effects: [""],
        indications: [""],
        pictures: [],
      });
      setUploadedPictures([]);
    } catch (error) {
      console.error(error);
      setModalProps({ open: true, message: "Error saving product!", type: "error" });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Insert Medicine</Typography>
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

      {selectedCategory && (
        <>
          <TextField
            label="Title"
            name="title"
            value={product.title}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Alternative Title"
            name="alternative_title"
            value={product.alternative_title}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Generic Name"
            name="generic_name"
            value={product.generic_name}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <CountryAutocomplete value={product.origin}
        onChange={(newValue) => setProduct((prev) => ({ ...prev, origin: newValue?.name }))}/>
        
        <Divider sx={{ my: 2 }} />
          <strong>Manufacturer Information</strong>
          <Box className="mb-3 w-full flex justify-evenly gap-3">
            <TextField
                label="Manufacturer Name"
                name="manufacturer_info.name"
                value={product.manufacturer_info.name}
                onChange={(e) =>
                setProduct((prev) => ({
                    ...prev,
                    manufacturer_info: { ...prev.manufacturer_info, name: e.target.value },
                }))
                }
                
                className="w-5/12"
            />
            <TextField
                label="Manufacturer External Link"
                name="manufacturer_info.external_link"
                value={product.manufacturer_info.external_link}
                onChange={(e) =>
                setProduct((prev) => ({
                    ...prev,
                    manufacturer_info: { ...prev.manufacturer_info, external_link: e.target.value },
                }))
                }
                className="w-7/12"
            />
          </Box>

          <Divider sx={{ my: 2 }} />
          <strong >Availble Options</strong>
          {product.availability_options.map((option, index) => (
            <Box className="flex flex-row justify-center items-center gap-2" key={index}>
                <TextField
                label="Option Title"
                value={option.option_title}
                onChange={(e) =>
                    handleAvailabilityOptionChange(index, "option_title", e.target.value)
                }
                fullWidth
                />
                <TextField
                label="Price"
                value={option.price}
                onChange={(e) => handleAvailabilityOptionChange(index, "price", e.target.value)}
                fullWidth
                />
                <FormControl fullWidth>
                <InputLabel>Available</InputLabel>
                <Select
                    value={option.if_available ? "true" : "false"}
                    onChange={(e) => handleAvailabilityOptionChange(index, "if_available", e.target.value === "true")}
                    label="Available"
                >
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                </Select>
                </FormControl>
                <IconButton onClick={() => handleRemoveAvailabilityOption(index)}>
                <RemoveCircleOutline />
                </IconButton>
            </Box>
            ))}

          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
            onClick={handleAddAvailabilityOption}
            sx={{ my: 2 }}
          >
            Add Option
          </Button>

          <Divider sx={{ my: 2 }} />
          <DynamicField
            label="Dosage"
            values={product.dosage}
            onAdd={() => handleAddDynamicField("dosage")}
            onRemove={(index) => handleRemoveDynamicField("dosage", index)}
            onChange={(e, index) => handleDynamicFieldChange("dosage", index, e.target.value)}
          />

        <Divider sx={{ my: 2 }} />
          <DynamicField
            label="Side Effects"
            values={product.side_effects}
            onAdd={() => handleAddDynamicField("side_effects")}
            onRemove={(index) => handleRemoveDynamicField("side_effects", index)}
            onChange={(e, index) => handleDynamicFieldChange("side_effects", index, e.target.value)}
          />

          
        <Divider sx={{ my: 2 }} />
          <DynamicField
            label="Indications"
            values={product.indications}
            onAdd={() => handleAddDynamicField("indications")}
            onRemove={(index) => handleRemoveDynamicField("indications", index)}
            onChange={(e, index) => handleDynamicFieldChange("indications", index, e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            sx={{ mt: 3 }}
          >
            Save Product
          </Button>
        </>
      )}

      <StatusModal
        open={modalProps.open}
        message={modalProps.message}
        type={modalProps.type}
        onClose={() => setModalProps((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
}

export default InsertProduct;
