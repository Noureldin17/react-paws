import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Box,
} from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import tempPetImage from "../../../assets/temp-profile.jpeg"; // Fallback image
import { AdoptionRequest } from "../../../types/types";

const RequestsTab: React.FC<{ requests: AdoptionRequest[] }> = ({ requests }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "success"; // Green
      case "REJECTED":
        return "error"; // Red
      case "PENDING":
        return "warning"; // Yellow
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {requests.map((request) => (
        <Card
          key={request.requestId}
          sx={{
            padding: "0.5rem",
            borderRadius: "8px",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent sx={{ padding: "1rem" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                {request.adoptionListing.name || "Unnamed Pet"}
              </Typography>
              <Chip
                label={request.status}
                color={getStatusColor(request.status)}
                sx={{ fontWeight: "bold", fontSize: "0.9rem", minWidth: "80px" }}
              />
            </Box>
            <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
              Breed: {request.adoptionListing.breed}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
              Age: {request.adoptionListing.age ? `${request.adoptionListing.age} years` : "Unknown"}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "500" }}>
              Description: {request.adoptionListing.description || "No description available."}
            </Typography>
          </CardContent>

          {/* Expandable section for additional details */}
          <Accordion disableGutters>
            <AccordionSummary
            //   expandIcon={<ExpandMoreIcon />}
              aria-controls={`request-details-${request.requestId}-content`}
              id={`request-details-${request.requestId}-header`}
            >
              <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                View Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <img
                  src={tempPetImage}
                //   alt={request.adoptionListing.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <Box>
                  <Typography>
                    Requested on:{" "}
                    {new Date(request.requestDate).toLocaleDateString("en-GB")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {request.status}
                  </Typography>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </Box>
  );
};

export default RequestsTab;
