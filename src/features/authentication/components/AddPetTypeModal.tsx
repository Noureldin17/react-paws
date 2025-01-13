import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useAddPetType } from "../../../hooks/useAddPetType";

interface AddPetTypeModalProps {
  open: boolean;
  onClose: () => void;
}

const AddPetTypeModal: React.FC<AddPetTypeModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: addPetType, isPending } = useAddPetType();

  const validateFields = (): boolean => {
    if (name.trim().length === 0) {
      setErrorMessage("Pet type name is required.");
      return false;
    } else if (name.trim().length < 3) {
      setErrorMessage("Pet type name must be at least 3 characters long.");
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    setErrorMessage(null);
    try {
      await addPetType(name);
      setName("");
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to add pet type. Please try again.");
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
          marginTop: "6%",
          backgroundColor: "white",
          borderRadius: 4,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography variant="h5">Add Pet Type</Typography>
        <TextField
          label="Pet Type Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          error={!!errorMessage}
          helperText={errorMessage}
        />
        <Box sx={{ marginTop: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button sx={{ borderRadius: "32px" }} variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            sx={{ color: "white", borderRadius: "32px" }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={24} /> : "Add Pet Type"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPetTypeModal;
