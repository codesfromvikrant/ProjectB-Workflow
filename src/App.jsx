import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Protected from "./Protected";
import Gallery from "./pages/Gallery";
import Layout from "./pages/Layout";
import Notes from "./pages/Notes";
import NotesCRUD from "./pages/NotesCRUD";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="/userdash"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            >
              <Route path="" element={<Gallery />} />
              <Route path="notes" element={<Notes />} />
              <Route path="notes/:nid" element={<NotesCRUD />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
