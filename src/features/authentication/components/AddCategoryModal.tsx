import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAddCategory } from "../../../hooks/useAddCategory";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onClose,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: addCategory } = useAddCategory();

  const validateFields = (): boolean => {
    let valid = true;

    if (name.trim().length === 0) {
      setNameError("Category name is required.");
      valid = false;
    } else if (name.trim().length < 3) {
      setNameError("Category name must be at least 3 characters long.");
      valid = false;
    } else {
      setNameError("");
    }

    if (description.trim().length === 0) {
      setDescriptionError("Description is required.");
      valid = false;
    } else if (description.trim().length < 5) {
      setDescriptionError("Description must be at least 5 characters long.");
      valid = false;
    } else {
      setDescriptionError("");
    }

    return valid;
  };

  const handleSubmit = async () => {
    if (validateFields()) {
      setIsSubmitting(true);
      setErrorMessage(null);

      try {
        await addCategory({ name, description });
        setName("");
        setDescription("");
        onClose();
      } catch (error) {
        setErrorMessage("Failed to add category. Please try again.");
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 4,
          margin: "auto",
          marginTop: "2%",
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5">Add Category</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
          rows={3}
          error={!!descriptionError}
          helperText={descriptionError}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ borderRadius: "32px" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ color: "white", borderRadius: "32px" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Add Category"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
