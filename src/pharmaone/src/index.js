import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pharmacy from "./Pharmacy/Pharmacy";
import "./index.css";
import App from "./App";
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
} from "./Pharmacy/Sections/Sections";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pharmacy" element={<Pharmacy />}>
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Inventory" element={<Inventory />} />
        <Route path="Chat%20With%20Others" element={<Chat />} />
        <Route path="Covid-19" element={<Covid />} />
        <Route path="Reports" element={<Reports />} />
        <Route path="Configuration" element={<Configuration />} />
        <Route path="Contact%20Management" element={<ContactManagement />} />
        <Route path="Notifications" element={<Notifications />} />
        <Route path="Application%20Settings" element={<Settings />} />
        <Route path="Get%20Technical%20Help" element={<TechHelp />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
