import { lazy } from "react";
const ProfileTab = lazy(() => import("./tabs/ProfileTab"));
const AddressTab = lazy(() => import("./tabs/AddressTab"));
const BusinessInfoTab = lazy(() => import("./tabs/BusinessInfoTab"));
const SecurityTab = lazy(() => import("./tabs/SecurityTab"));

export const accountTabs = [
  { label: "Profile", path: "profile", element: <ProfileTab /> },
  { label: "Address", path: "address", element: <AddressTab /> },
  { label: "Business Info", path: "business", element: <BusinessInfoTab /> },
  { label: "Security", path: "security", element: <SecurityTab /> },
];
