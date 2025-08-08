import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import VendorRegister from "./pages/VendorRegister";
import Dashboard from "./pages/Dashboard";
import SpareParts from "./pages/SpareParts";
import AdminPanel from "./pages/Admin";
import DoctorPanel from "./pages/DoctorPanel";
import Profile from "./pages/Profile";
import SparePartsStore from "./pages/SparePartsStore";
import ChargingStation from "./pages/ChargingStation";
import SupplierDashboard from "./pages/SupplierDashboard";
import ManageVehiclesSupplier from "./pages/ManageProducts";
import AddSpare from "./pages/AddSpare";
import AddVehicle from "./pages/AddVehicle";
import ManageSpare from "./pages/ManageSpare";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Booking from "./pages/Booking";
import BookingPage from "./pages/BookingCustomer";
import SpareDetailsPage from "./pages/Sparedetails";
import BookingSpare from "./pages/BookingSpare";
import BookingPageVendor from "./pages/BookingsPageSupplier";

const App = () => {
  return (
    <Router>
      <div className="bg-custom vh-100">
        {/* Navbar component */}
        <Navbar />

        {/* Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vendorregister" element={<VendorRegister />} />

          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* SpareParts Route */}
          <Route path="/vendor" element={<SupplierDashboard />} />
          <Route path="/supplier/add-product" element={<AddVehicle />} />
          <Route path="/supplier/add-spare" element={<AddSpare />} />

          <Route
            path="/supplier/products"
            element={<ManageVehiclesSupplier />}
          />
          <Route path="/supplier/spare" element={<ManageSpare />} />

          <Route path="/charging-stations" element={<ChargingStation />} />

          {/* Admin and Doctor Panels */}
          <Route path="/admin" element={<AdminPanel />} />
          {/* <Route path="/doctor" element={<DoctorPanel />} /> */}

          {/* Profile Route */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/buy" element={<SparePartsStore />} />

          <Route path="/item/:itemId" element={<ItemDetailsPage />} />
          <Route path="/spare/:spareid" element={<SpareDetailsPage />} />

          <Route path="/payment/:itemid/:price" element={<Booking />} />
          <Route
            path="/payment/spare/:spareid/:spareprice"
            element={<BookingSpare />}
          />

          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/supplier/bookings" element={<BookingPageVendor />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
