import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useProfile } from "../../../hooks/useProfile";
import tempProfile from "../../../assets/temp-profile.jpeg";
import OrdersTab from "../components/OrdersTab";
import ListingsTab from "../components/ListingsTab";
import RequestsTab from "../components/RequestsTab";

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
  const { data: userProfile, isLoading} = useProfile();
  const [activeTab, setActiveTab] = useState(0);

  if (isLoading) return <div>Loading...</div>;

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto p-16 text-[2rem] text-black">
        {/* Profile Header Section */}
        <div className="profile-header flex items-center gap-8">
          {/* Profile Image */}
          <img
            src={
              userProfile?.profileImage
                ? userProfile.profileImage.data
                : tempProfile
            }
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

          {activeTab === 0 && (
            <Box sx={{ padding: "1rem" }}>
              <Typography variant="h6" gutterBottom>
                Order History
              </Typography>
              {userProfile?.orders.length > 0 ? (
                <OrdersTab orders={userProfile.orders} />
              ) : (
                <Typography>No orders yet.</Typography>
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box sx={{ padding: "1rem" }}>
              <Typography variant="h6">Adoption Listings</Typography>
              {/* Render Adoption Listings */}
              {userProfile?.adoptionListings.length > 0 ? <ListingsTab listings={userProfile?.adoptionListings}/> : (
                <p>No adoption listings yet.</p>
              )}
            </Box>
          )}
          {activeTab === 2 && (
            <Box sx={{ padding: "1rem" }}>
              <Typography variant="h6">Adoption Requests</Typography>
              {/* Render Adoption Listings */}
              {userProfile?.adoptionRequests.length > 0 ? <RequestsTab requests={userProfile?.adoptionRequests}/> : (
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
