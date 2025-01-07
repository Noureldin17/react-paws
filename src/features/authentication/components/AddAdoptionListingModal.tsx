import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePetTypes } from "../../../hooks/usePetTypes";
import { PetType } from "../../../types/types";

interface AdoptionListingDTO {
  petName: string;
  petType: { id: string };
  breed: string;
  age: string;
  description: string;
  status: "AVAILABLE";
  images: [];
}

interface AddAdoptionListingModalProps {
  open: boolean;
  onClose: () => void;
  onListingAdded: () => void;
}

const AddAdoptionListingModal: React.FC<AddAdoptionListingModalProps> = ({
  open,
  onClose,
  onListingAdded,
}) => {
  const [formData, setFormData] = useState<AdoptionListingDTO>({
    petName: "",
    petType: { id: "" },
    breed: "",
    age: "",
    description: "",
    status: "AVAILABLE",
    images: [], // Always empty for the DTO
  });
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const petTypes = usePetTypes();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePetTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const petTypeId = e.target.value as string;
    setFormData((prev) => ({
      ...prev,
      petType: { id: petTypeId },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!images.length) {
      setErrorMessage("Please upload at least one image.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append(
      "adoptionListing",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    images.forEach((image) => {
      formDataToSubmit.append("imageFiles", image);
    });

    try {
      const response = await fetch("http://localhost:8080/api/v1/adoption/create", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        method: "POST",
        body: formDataToSubmit,
      });

      if (response.ok) {
        onListingAdded();
        onClose();
        setFormData({
          petName: "",
          petType: { id: "" },
          breed: "",
          age: "",
          description: "",
          status: "AVAILABLE",
          images: [],
        });
        setImages([]);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to add listing. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "600px",
          padding: 4,
          margin: "auto",
          marginTop: "5%",
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5">Add Adoption Listing</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="petName"
            value={formData.petName}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <FormControl fullWidth required sx={{ marginTop: 2 }}>
            <InputLabel id="pet-type-label">Pet Type</InputLabel>
            <Select
              labelId="pet-type-label"
              value={formData.petType.id}
              onChange={handlePetTypeChange}
              label="Pet Type"
            >
              {petTypes.data?.map((type: PetType) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Breed"
            name="breed"
            value={formData.breed}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
          />
          <Button variant="contained" component="label" sx={{ marginTop: 2 }}>
            Upload Images
            <input type="file" multiple hidden onChange={handleFileChange} />
          </Button>
          {images.length > 0 && (
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {images.map((image, index) => (
                <Grid item xs={4} key={index}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 100,
                      overflow: "hidden",
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
          <Box sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Add Listing"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddAdoptionListingModal;
