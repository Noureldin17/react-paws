import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueryClient } from "@tanstack/react-query";
import { useRejectRequest } from "../../../hooks/useRejectRequest";
import { useApproveRequest } from "../../../hooks/useApproveRequest";
import { useDeleteListing } from "../../../hooks/useDeleteListing";
import { AdoptionListing } from "../../../types/types";
import tempPetImage from "../../../assets/temp-profile.jpeg"; // Fallback image

const ListingsTab: React.FC<{ listings: AdoptionListing[] }> = ({ listings }) => {
  const [loadingRequestId, setLoadingRequestId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    listingId: number | null;
  }>({ open: false, listingId: null });

  const queryClient = useQueryClient();
  const { mutate: rejectRequest } = useRejectRequest();
  const { mutate: approveRequest } = useApproveRequest();
  const { mutate: deleteListing } = useDeleteListing();

  const handleApprove = (requestId: number) => {
    setLoadingRequestId(requestId);
    approveRequest(requestId, {
      onSuccess: () => {
        setSnackbar({ message: "Request approved successfully!", type: "success" });
        setLoadingRequestId(null);
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      },
      onError: () => {
        setSnackbar({ message: "Failed to approve request.", type: "error" });
        setLoadingRequestId(null);
      },
    });
  };

  const handleReject = (requestId: number) => {
    setLoadingRequestId(requestId);
    rejectRequest(requestId, {
      onSuccess: () => {
        setSnackbar({ message: "Request rejected successfully!", type: "success" });
        setLoadingRequestId(null);
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      },
      onError: () => {
        setSnackbar({ message: "Failed to reject request.", type: "error" });
        setLoadingRequestId(null);
      },
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.listingId === null) return;

    setLoadingRequestId(deleteModal.listingId);
    deleteListing(deleteModal.listingId, {
      onSuccess: () => {
        setSnackbar({ message: "Listing deleted successfully!", type: "success" });
        setLoadingRequestId(null);
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        setDeleteModal({ open: false, listingId: null });
      },
      onError: () => {
        setSnackbar({ message: "Failed to delete listing.", type: "error" });
        setLoadingRequestId(null);
        setDeleteModal({ open: false, listingId: null });
      },
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "success";
      case "PENDING":
        return "warning";
      case "ADOPTED":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

      {listings.map((listing) => (
        <Card key={listing.listingId} sx={{ borderRadius: "8px", boxShadow: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">{listing.petName || "Unnamed Pet"}</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Chip label={listing.status} color={getStatusColor(listing.status)} />
                <IconButton
                  color="error"
                  onClick={() => setDeleteModal({ open: true, listingId: listing.listingId })}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography variant="body2">Breed: {listing.breed}</Typography>
            <Typography variant="body2">Age: {listing.age} years</Typography>
            <Typography>Description: {listing.description}</Typography>
          </CardContent>
          <Accordion>
            <AccordionSummary>
              <Typography>{listing.adoptionRequests.length} Requests</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {listing.adoptionRequests.map((request) => (
                <Box key={request.requestId} sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={tempPetImage}
                    alt="User"
                    style={{ width: 50, height: 50, borderRadius: "50%", marginRight: 8 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography>{request.user.firstName + " " + request.user.lastName}</Typography>
                    <Typography variant="body2">{request.user.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {loadingRequestId === request.requestId ? (
                      <CircularProgress size={24} />
                    ) : (
                      <>
                        <button
                          className="text-white rounded-full bg-red-500 w-24 hover:bg-red-600 text-sm px-4 py-2 active:scale-95"
                          onClick={() => handleReject(request.requestId)}
                          >
                          Reject
                        </button>
                        <button
                          className="text-white rounded-full bg-green-500 w-24 hover:bg-green-600 text-sm px-4 py-2 active:scale-95"
                          onClick={() => handleApprove(request.requestId)}
                        >
                          Approve
                        </button>
                      </>
                    )}
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}

      {/* Delete Confirmation Modal */}
      <Dialog open={deleteModal.open} onClose={() => setDeleteModal({ open: false, listingId: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this listing? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal({ open: false, listingId: null })} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            disabled={loadingRequestId === deleteModal.listingId}
          >
            {loadingRequestId === deleteModal.listingId ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogActions>
      </Dialog>
  
      {snackbar && (
        <Snackbar open autoHideDuration={3000} onClose={() => setSnackbar(null)}>
          <Alert severity={snackbar.type} onClose={() => setSnackbar(null)}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ListingsTab;
