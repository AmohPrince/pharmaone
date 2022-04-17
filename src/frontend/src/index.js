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
        <Route path="Inventory" element={<Inventory />}></Route>
        <Route path="/Inventory/listofmeds" element={<ListOfMeds />} />
        <Route
          path="/Inventory/listofmeds/:medicineId"
          element={<MedicineInfo />}
        />
        <Route
          path="/Inventory/listofmeds/Addnewmedicine"
          element={<NewMedicine />}
        />
        <Route path="/Inventory/groups" element={<Groups />} />
        <Route path="Chat%20With%20Others" element={<Chat />} />
        <Route path="Covid-19" element={<Covid />} />
        <Route path="Reports" element={<Reports />} />
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
