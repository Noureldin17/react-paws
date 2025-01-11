import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button, Snackbar, Alert } from "@mui/material";
import AddProductModal from "./AddProductModal";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleProductAdded = () => {
    setIsModalOpen(false); // Close the modal
    setSnackbarOpen(true); // Show the snackbar
  };

  return (
    <div className="dashboard mt-4">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Products</Typography>
              <Button onClick={() => setIsModalOpen(true)}>Add New Product</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pet Types</Typography>
              <Button>Add Pet Type</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Categories</Typography>
              <Button>Add Categories</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <AddProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded} // Pass the handler
      />

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;
