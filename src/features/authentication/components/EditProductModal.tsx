import React, { useState, useEffect } from "react";
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
import { useProductCategories } from "../../../hooks/useProductCategories";
import { PetType, Category, ImageResponse } from "../../../types/types";
import { useUpdateProduct } from "../../../hooks/useUpdateProduct";

interface EditProductDTO {
  productId: number;
  name: string;
  description: string;
  price: number;
  category: { categoryId: string };
  petType: { id: string };
  stockQuantity: number;
  images: ImageResponse[];
}

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: EditProductDTO; // Existing product data
  onProductUpdated: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  open,
  onClose,
  product,
  onProductUpdated,
}) => {
  const [formData, setFormData] = useState<EditProductDTO>(product);
  const [images, setImages] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const petTypes = usePetTypes();
  const productCategories = useProductCategories();
  const { mutate: editProduct, isPending: isSubmitting } = useUpdateProduct();

  useEffect(() => {
    // Initialize images state with existing product images
    const initialImages = product.images.map((img) => {
        // Convert base64 data to a binary array
        const byteCharacters = atob(img.data);
        const byteArray = new Uint8Array(byteCharacters.length);
      
        for (let i = 0; i < byteCharacters.length; i++) {
          byteArray[i] = byteCharacters.charCodeAt(i);
        }
      
        // Create a File object
        return new File([byteArray], `Image - ${img.imageId}`);
      });
      
      // Set the images
      setImages(initialImages);
      setFormData({...product, images:[]});
  }, [product]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stockQuantity" ? Number(value) : value,
    }));
  };

  const handleDropdownChange = (
    field: "petType" | "category",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "category"
        ? { categoryId: value }
        : { id: value },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!images.length) {
      setErrorMessage("Please upload at least one image.");
      return;
    }

    setErrorMessage(null);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append(
      "product",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );
    images.forEach((image) => {
      formDataToSubmit.append("imageFiles", image);
    });

    editProduct({formData: formDataToSubmit, productId: product.productId}, {
      onSuccess: () => {
        onProductUpdated();
        onClose();
      },
      onError: (error: Error) => {
        setErrorMessage(error.message || "An error occurred. Please try again.");
      },
    });
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
        <Typography variant="h5">Edit Product</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <FormControl fullWidth required sx={{ marginTop: 2 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={formData.category.categoryId}
              onChange={(e) => handleDropdownChange("category", e.target.value as string)}
              label="Category"
            >
              {productCategories.data?.map((category: Category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth required sx={{ marginTop: 2 }}>
            <InputLabel id="pet-type-label">Pet Type</InputLabel>
            <Select
              labelId="pet-type-label"
              value={formData.petType.id}
              onChange={(e) => handleDropdownChange("petType", e.target.value as string)}
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
            sx={{ marginTop: 2 }}
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            sx={{ marginTop: 2 }}
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            sx={{ marginTop: 2 }}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            required
          />
          <Button
            variant="contained"
            component="label"
            sx={{ marginTop: 2, color: "white", borderRadius: "32px" }}
          >
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
            <Button sx={{ borderRadius: "32px" }} variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              sx={{ color: "white", borderRadius: "32px" }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : "Update Product"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditProductModal;
