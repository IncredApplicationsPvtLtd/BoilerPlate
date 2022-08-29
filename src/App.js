import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Landing,
  SharedLayout,
  AllJob,
  AddJob,
  NotFound,
  ProtectedRoute,
} from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllJob />} />
          <Route path="jobs" element={<AllJob />} />
          <Route path="add-job" element={<AddJob />} />
        </Route>
        <Route path="/login" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
