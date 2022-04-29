import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pharmacy from "./Pharmacy/Pharmacy";
import "./index.css";
import {
  Dashboard,
  Inventory,
  Chat,
  Covid,
  Reports,
  Configuration,
  ContactManagement,
  Notifications,
  Settings,
  TechHelp,
  ListOfMeds,
  Groups,
  MedicineInfo,
  NewMedicine,
  GroupInfo,
  SalesReport,
  PaymentsReport,
} from "./Pharmacy/Sections/Sections";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Pharmacy />}>
        <Route path="Dashboard" element={<Dashboard />}>
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Inventory Routes */}
        <Route path="Inventory" element={<Inventory />}></Route>
        <Route path="/Inventory/listofmeds" element={<ListOfMeds />} />
        <Route
          path="/Inventory/List%20of%20medicines"
          element={<ListOfMeds />}
        />
        <Route
          path="/Inventory/List%20of%20medicines/:medicineId"
          element={<MedicineInfo />}
        />
        <Route
          path="/Inventory/listofmeds/:medicineId"
          element={<MedicineInfo />}
        />
        <Route path="/Inventory/groups/:groupName" element={<GroupInfo />} />
        <Route
          path="/Inventory/listofmeds/addnewmedicine"
          element={<NewMedicine />}
        />
        <Route path="/Inventory/groups" element={<Groups />} />

        {/* Report Routes */}
        <Route path="Reports" element={<Reports />} />
        <Route path="/Reports/salesreport" element={<SalesReport />} />
        <Route path="/Reports/paymentreport" element={<PaymentsReport />} />

        <Route path="Chat%20With%20Others" element={<Chat />} />
        <Route path="Covid-19" element={<Covid />} />
        <Route path="Configuration" element={<Configuration />} />
        <Route path="Contact%20Management" element={<ContactManagement />} />
        <Route path="Notifications" element={<Notifications />} />
        <Route path="Application%20Settings" element={<Settings />} />
        <Route path="Get%20Technical%20Help" element={<TechHelp />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>Not ready my friend!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>
);
