import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import StatusModal from "../../Modal/StatusModal";
import { db } from "../../../Utils/firebase";

function InsertCategory() {
  const [category, setCategory] = useState({
    title: "",
    description: "",
  });

  const [modalProps, setModalProps] = useState({
    open: false,
    message: "",
    type: "pending", // success, error, or pending
  });

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Open the modal with pending state
    setModalProps({ open: true, message: "Saving...", type: "pending" });

    try {
      // Save to Firestore
      await addDoc(collection(db, "Categories"), {
        title: category.title,
        description: category.description,
        createdAt: serverTimestamp(),
        lastModifiedAt: serverTimestamp(),
        products_summary: [],
        responsible_persons: [],
      });

      // Update modal state on success
      setModalProps({
        open: true,
        message: "Category saved successfully!",
        type: "success",
      });

      // Reset form fields
      setCategory({ title: "", description: "" });
    } catch (error) {
      console.error(error);
      setModalProps({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const handleCloseModal = () => {
    setModalProps({ ...modalProps, open: false });
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, mx: "auto", mt: 4 }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Category Title"
        name="title"
        value={category.title}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Category Description"
        name="description"
        value={category.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Category
      </Button>

      {/* Status Modal */}
      <StatusModal
        open={modalProps.open}
        message={modalProps.message}
        type={modalProps.type}
        onClose={handleCloseModal}
      />
    </Box>
  );
}

export default InsertCategory;
