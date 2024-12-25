import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";
import { db, storage } from "../../../Utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const InsertActivity = () => {
  const [activity, setActivity] = useState({
    title: "",
    date: "",
    facebookLink: "",
    linkedInLink: "",
    otherLink: "",
    description: "",
    bannerUrl: "",
  });

  const [bannerFile, setBannerFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerUpload = async () => {
    if (!bannerFile) {
      alert("Please select a banner file.");
      return null;
    }

    setUploading(true);
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const uniqueName = `${year}-${month}-${activity.title}-${Math.floor(
      Math.random() * 1000
    )}`;

    const storageRef = ref(
      storage,
      `Activities/${year}/${month}/${uniqueName}`
    );

    try {
      await uploadBytes(storageRef, bannerFile);
      const downloadUrl = await getDownloadURL(storageRef);
      setUploading(false);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      alert("Failed to upload banner. Try again.");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!activity.title || !activity.date) {
      alert("Please fill in all required fields.");
      return;
    }

    // const bannerUrl = await handleBannerUpload();
    // if (!bannerUrl) return;

    const newActivity = {
      ...activity,
    //   bannerUrl,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "Activities"), newActivity);
      console.log("Activity added with ID:", docRef.id);
      alert("Activity added successfully!");
      setActivity({
        title: "",
        date: "",
        facebookLink: "",
        linkedInLink: "",
        otherLink: "",
        description: "",
        bannerUrl: "",
      });
      setPreview("");
      setBannerFile(null);
    } catch (error) {
      console.error("Error adding activity:", error);
      alert("Failed to add activity. Try again.");
    }
  };

  return (
    <Box className="p-6 w-full rounded mx-auto">
      <Typography variant="h5" className="mb-4 font-semibold">
        Add New Activity
      </Typography>

      <Box className="mb-4 flex flex-col gap-3">
        <TextField
          label="Title"
          name="title"
          value={activity.title}
          onChange={handleInputChange}
          fullWidth
          required
          className="mb-4"
        />
        <TextField
          type="date"
          name="date"
          value={activity.date}
          onChange={handleInputChange}
          fullWidth
          required
          className="mb-4"
        />
        <TextField
          label="Facebook Link"
          name="facebookLink"
          value={activity.facebookLink}
          onChange={handleInputChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="LinkedIn Link"
          name="linkedInLink"
          value={activity.linkedInLink}
          onChange={handleInputChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Other Link"
          name="otherLink"
          value={activity.otherLink}
          onChange={handleInputChange}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Description"
          name="description"
          value={activity.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          required
          className="mb-4"
        />
      </Box>

      <FormControl className="mb-4" fullWidth>
        <InputLabel shrink>Banner</InputLabel>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </FormControl>
      {preview && (
        <Box className="mb-4">
          <Typography variant="subtitle1">Banner Preview:</Typography>
          <img src={preview} alt="Banner Preview" className="w-full max-h-64 object-cover" />
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={uploading}
        fullWidth
      >
        {uploading ? "Uploading Banner..." : "Add Activity"}
      </Button>
    </Box>
  );
};

export default InsertActivity;
