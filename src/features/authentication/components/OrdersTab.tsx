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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import tempProductImage from "../../../assets/temp-profile.jpeg"; // Fallback image
import { Order } from "../../../types/types";

const OrdersTab: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "DELIVERED":
        return "success";
      default:
        return "default";
    }
  };

  const calculateTotalAmount = (items: Order["orderItems"]) =>
    items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {sortedOrders.map((order) => (
        <Card
          key={order.orderId}
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
                Order ID: {order.orderId}
              </Typography>
              <Chip
                label={order.status}
                color={getStatusColor(order.status)}
                sx={{
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  minWidth: "130px", // Ensures consistent badge width
                  textAlign: "center",
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
              Order Date:{" "}
              {new Date(order.orderDate).toLocaleDateString("en-GB")}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "500" }}>
              Total Amount: ${calculateTotalAmount(order.orderItems).toFixed(2)}
            </Typography>
          </CardContent>

          <Accordion disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`order-items-${order.orderId}-content`}
              id={`order-items-${order.orderId}-header`}
            >
              <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                {order.orderItems.length} Items
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {order.orderItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  <img
                    src={tempProductImage}
                    alt={item.product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontSize: "0.9rem", fontWeight: "500" }}>
                      {item.product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: "0.85rem" }}
                    >
                      Price: ${item.product.price.toFixed(2)} x {item.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        </Card>
      ))}
    </Box>
  );
};

export default OrdersTab;
