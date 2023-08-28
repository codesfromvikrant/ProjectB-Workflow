import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Protected from "./Protected";
import Gallery from "./pages/Gallery";
import Layout from "./pages/Layout";
import Notes from "./pages/Notes";
import NotesCRUD from "./pages/NotesCRUD";
import Explore from "./pages/Explore";
import ProjectHome from "./components/projects/ProjectHome";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="/user"
              element={
                <Protected>
                  <Dashboard />
                </Protected>
              }
            >
              <Route index element={<NoPage />} />
              <Route path="*" element={<NoPage />} />
              <Route path="explore" element={<Explore />} />
              <Route path="projects" element={<ProjectHome />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="notes" element={<Notes />} />
              <Route path="notes/:nid" element={<NotesCRUD />} />
            </Route>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
