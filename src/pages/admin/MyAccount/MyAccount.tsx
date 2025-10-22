import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { accountTabs } from "./accountTabs";
import { Suspense } from "react";

const MyAccount = () => {
  const location = useLocation();

  //   Determine the current active tab based on the URL path
  const currentTab = accountTabs.findIndex(
    (tab) => tab.path === location.pathname.split("/").pop()
  );

  const value = currentTab === -1 ? 0 : currentTab;

  return (
    <>
      <Typography variant="h6" sx={{ mb: 2 }} fontWeight="bold" gutterBottom>
        My Account
      </Typography>
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs value={value} aria-label="My Account Tabs">
          {accountTabs.map((tab) => (
            <Tab
              key={tab.path}
              label={tab.label}
              component={Link}
              to={`/admin/my-account/${tab.path}`}
              aria-controls={`tabpanel-${tab.path}`}
            />
          ))}
        </Tabs>
        <Box sx={{ mt: 3 }}>
          <Suspense
            fallback={
              <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            }
          >
            <Routes>
              <Route
                index
                element={<Navigate to="/admin/my-account/profile" replace />}
              />
              {accountTabs.map((tab) => (
                <Route key={tab.path} path={tab.path} element={tab.element} />
              ))}
              <Route
                path="*"
                element={<Navigate to="/admin/my-account/profile" replace />}
              />
            </Routes>
          </Suspense>
        </Box>
      </Box>
    </>
  );
};

export default MyAccount;
