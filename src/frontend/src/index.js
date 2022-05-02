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
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Inventory Routes */}
        <Route path="inventory" element={<Inventory />}></Route>
        <Route path="/inventory/listofmeds" element={<ListOfMeds />} />
        <Route
          path="/inventory/list%20of%20medicines"
          element={<ListOfMeds />}
        />
        <Route
          path="/inventory/list%20of%20medicines/:medicineId"
          element={<MedicineInfo />}
        />
        <Route
          path="/inventory/listofmeds/:medicineId"
          element={<MedicineInfo />}
        />
        <Route path="/inventory/groups/:groupName" element={<GroupInfo />} />
        <Route
          path="/inventory/listofmeds/addnewmedicine"
          element={<NewMedicine />}
        />
        <Route path="/inventory/groups" element={<Groups />} />
        <Route path="/listofmeds" element={<ListOfMeds />} />
        <Route path="/listofmeds/:medicineId" element={<MedicineInfo />} />

        {/* Report Routes */}
        <Route path="reports" element={<Reports />} />
        <Route path="/reports/salesreport" element={<SalesReport />} />
        <Route path="/reports/paymentreport" element={<PaymentsReport />} />

        <Route path="chat%20With%20Others" element={<Chat />} />
        <Route path="covid-19" element={<Covid />} />
        <Route path="configuration" element={<Configuration />} />
        <Route path="contact%20Management" element={<ContactManagement />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="application%20Settings" element={<Settings />} />
        <Route path="get%20Technical%20Help" element={<TechHelp />} />
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
