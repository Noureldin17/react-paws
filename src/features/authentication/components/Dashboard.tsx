import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import AddProductModal from "./AddProductModal";
import { useProducts } from "../../../hooks/useProducts";
import { useDeleteProduct } from "../../../hooks/useDeleteProduct";
import { useDeleteCategory } from "../../../hooks/useDeleteCategory";
import { useDeletePetType } from "../../../hooks/useDeletePetType";
import { useProductCategories } from "../../../hooks/useProductCategories";
import { usePetTypes } from "../../../hooks/usePetTypes";
import { Category, PetType, Product } from '../../../types/types';
import EditProductModal from "./EditProductModal";
import AddPetTypeModal from "./AddPetTypeModal";
import AddCategoryModal from "./AddCategoryModal";

const Dashboard: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<"Products" | "Categories" | "Pet Types">("Products");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isPetTypeModalOpen, setIsPetTypeModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<{ id: number; type: "product" | "category" | "petType" } | null>(null);

  // Hooks for data
  const {
    data: productData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProducts({});
  const { data: categoriesData } = useProductCategories();
  const { data: petTypesData } = usePetTypes();
  const deleteProductMutation = useDeleteProduct();
  const deleteCategoryMutation = useDeleteCategory();
  const deletePetTypeMutation = useDeletePetType();

  const handleDelete = async () => {
    if (deletingItem) {
      const { id, type } = deletingItem;
      if (type === "product") {
        await deleteProductMutation.mutateAsync(id);
      } else if (type === "category") {
        await deleteCategoryMutation.mutateAsync(id);
      } else {
        await deletePetTypeMutation.mutateAsync(id);
      }
      setSnackbarOpen(true);
    }
    setConfirmationDialogOpen(false);
    setDeletingItem(null);
  };

  const openConfirmationDialog = (id: number, type: "product" | "category" | "petType") => {
    setDeletingItem({ id, type });
    setConfirmationDialogOpen(true);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 100 && hasNextPage && selectedCard === "Products") {
      fetchNextPage();
    }
  };

  const renderTable = () => {
    if (selectedCard === "Products") {
      const rows = productData?.pages.flatMap((page) => page.content) || [];
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((product: Product) => (
              <TableRow key={product.productId}>
                <TableCell>
                  <img
                    src={`data:image/jpeg;base64,${product.images[0]?.data}`}
                    alt={product.name}
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditingProduct(product);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => openConfirmationDialog(product.productId, "product")}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {isFetchingNextPage && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={20} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
    } else if (selectedCard === "Categories") {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesData?.map((category: Category) => (
              <TableRow key={category.categoryId}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => openConfirmationDialog(category.categoryId, "category")}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (selectedCard === "Pet Types") {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pet Type Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {petTypesData?.map((petType: PetType) => (
              <TableRow key={petType.id}>
                <TableCell>{petType.name}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => openConfirmationDialog(petType.id, "petType")}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  return (
    <div className="dashboard mt-4">
      <Grid container spacing={2}>
        {["Products", "Categories", "Pet Types"].map((type) => (
          <Grid item xs={4} key={type}>
            <Card
              sx={{
                border: selectedCard === type ? "2px solid #1976d2" : "1px solid #ddd",
                cursor: "pointer",
              }}
              onClick={() => setSelectedCard(type as any)}
            >
              <CardContent>
                <Typography variant="h6">{type}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} sx={{ maxHeight: 400, overflowY: "auto", border: "1px solid #ddd", borderRadius: "4px" }} onScroll={handleScroll}>
        {renderTable()}
      </Box>

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            if (selectedCard === "Products") setIsAddModalOpen(true);
            if (selectedCard === "Categories") setIsCategoryModalOpen(true);
            if (selectedCard === "Pet Types") setIsPetTypeModalOpen(true);
          }}
        >
          Add {selectedCard}
        </Button>
      </Box>

      {selectedCard === "Products" && (
        <AddProductModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onProductAdded={() => setSnackbarOpen(true)} />
      )}

      {selectedCard === "Products" && editingProduct && (
        <EditProductModal
          open={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
          }}
          product={editingProduct}
          onProductUpdated={() => {
            setSnackbarOpen(true);
          }}
        />
      )}

      {selectedCard === "Categories" && (
        <AddCategoryModal open={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} />
      )}

      {selectedCard === "Pet Types" && (
        <AddPetTypeModal open={isPetTypeModalOpen} onClose={() => setIsPetTypeModalOpen(false)} />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Action completed successfully!
        </Alert>
      </Snackbar>

      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
