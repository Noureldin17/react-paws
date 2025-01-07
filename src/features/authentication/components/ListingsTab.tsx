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
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import AddAdoptionListingModal from "./AddAdoptionListingModal";
import { useRejectRequest } from "../../../hooks/useRejectRequest";
import { useApproveRequest } from "../../../hooks/useApproveRequest";
import { AdoptionListing } from "../../../types/types";
import tempPetImage from "../../../assets/temp-profile.jpeg"; // Fallback image

const ListingsTab: React.FC<{ listings: AdoptionListing[] }> = ({ listings }) => {
  const [loadingRequestId, setLoadingRequestId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: rejectRequest } = useRejectRequest();
  const { mutate: approveRequest } = useApproveRequest();

  const handleApprove = (requestId: number) => {
    setLoadingRequestId(requestId);
    approveRequest(requestId, {
      onSuccess: () => {
        setSnackbar({ message: "Request approved successfully!", type: "success" });
        setLoadingRequestId(null);
        queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      },
      onError: (error: any) => {
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
      onError: (error: any) => {
        setSnackbar({ message: "Failed to reject request.", type: "error" });
        setLoadingRequestId(null);
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
      <Button variant="contained" color="primary" onClick={() => setIsAddModalOpen(true)}>
        Add Adoption Listing
      </Button>

      {listings.map((listing) => (
        <Card key={listing.listingId} sx={{ borderRadius: "8px", boxShadow: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">{listing.name || "Unnamed Pet"}</Typography>
              <Chip label={listing.status} color={getStatusColor(listing.status)} />
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
                    <Typography>{request.user.firstName}</Typography>
                    <Typography variant="body2">{request.user.email}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {loadingRequestId === request.requestId ? (
                      <CircularProgress size={24} />
                    ) : (
                      <>
                        <Button variant="contained" color="error" onClick={() => handleReject(request.requestId)}>
                          Reject
                        </Button>
                        <Button variant="contained" color="success" onClick={() => handleApprove(request.requestId)}>
                          Approve
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}

      {/* Add Listing Modal */}
      <AddAdoptionListingModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onListingAdded={() => queryClient.invalidateQueries({ queryKey: ["userProfile"] })}
      />

      {/* Snackbar for feedback */}
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
