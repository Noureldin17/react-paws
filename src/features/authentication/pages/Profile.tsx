import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useProfile } from "../../../hooks/useProfile";
import tempProfile from "../../../assets/temp-profile.jpeg";

// Define the custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#e58d54", // Set your app's primary color
    },
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#e58d54", // Customize the indicator color
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevent all-uppercase text
          fontSize: "1rem", // Adjust font size
          "&.Mui-selected": {
            color: "#e58d54", // Set color of the selected tab
          },
        },
      },
    },
  },
});

const Profile: React.FC = () => {
  const { data: userProfile, isLoading } = useProfile();
  const [activeTab, setActiveTab] = useState(0);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto p-16 text-[2rem] text-black">
        {/* Profile Header Section */}
        <div className="profile-header flex items-center gap-8">
          {/* Profile Image */}
          <img
            src={userProfile?.profileImage ? userProfile.profileImage.data : tempProfile}
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover"
          />
          <div>
            {/* User Name */}
            <h2 className="text-3xl font-semibold">{`${userProfile?.firstName} ${userProfile?.lastName}`}</h2>
            {/* User Email */}
            <p className="text-lg">{userProfile?.email}</p>
          </div>
        </div>

        {/* Tabs for Orders and Adoption Listings */}
        <Box sx={{ width: "100%", marginTop: "2rem" }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            aria-label="profile tabs"
          >
            <Tab label="My Orders" />
            <Tab label="My Listings" />
            <Tab label="My Requests" />
            <Tab label="Dashboards" />
          </Tabs>

          {/* Display content based on selected tab */}
          {activeTab === 0 && (
            <Box sx={{ padding: "1rem" }}>
              <Typography variant="h6">Order History</Typography>
              {/* Render Orders */}
              {userProfile?.orders.length > 0 ? (
                userProfile.orders.map((order) => (
                  <div key={order.orderId}>
                    <h3>Order ID: {order.orderId}</h3>
                    <p>Status: {order.status}</p>
                    <p>Total Amount: {order.totalAmount}</p>
                    <div>
                      <h4>Order Items:</h4>
                      {order.orderItems.map((item, index) => (
                        <div key={index}>
                          <p>{item.product.name} x {item.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No orders yet.</p>
              )}
            </Box>
          )}
          {activeTab === 1 && (
            <Box sx={{ padding: "1rem" }}>
              <Typography variant="h6">Adoption Listings</Typography>
              {/* Render Adoption Listings */}
              {userProfile?.adoptionListings.length > 0 ? (
                userProfile.adoptionListings.map((listing) => (
                  <div key={listing.listingId}>
                    <h3>{listing.name}</h3>
                    <p>{listing.breed}</p>
                    <p>Status: {listing.status}</p>
                  </div>
                ))
              ) : (
                <p>No adoption listings yet.</p>
              )}
            </Box>
          )}
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Profile;
