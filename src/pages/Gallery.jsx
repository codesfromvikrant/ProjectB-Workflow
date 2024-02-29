import React, { useState, useEffect } from "react";
import UploadBtn from "../components/gallery/UploadBtn";
import SearchBar from "../components/SearchBar";
import { setGallery, setTotalImages } from "../features/gallerySlice";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ImagesGrid from "../components/gallery/ImagesGrid";
import axios from "axios";
import ImageViewer from "../components/gallery/ImageViewer";
import Pagination from "../components/gallery/Pagination";

const Gallery = () => {
  const uid = useSelector((state) => state.auth.uid);
  const viewImage = useSelector((state) => state.gallery.viewImage);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState("");
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
  const getImageList = async () => {
    try {
      const res = await axios.get(
        `${apiBaseURL}/api/v1/gallery/${uid}?page=${page}&limit=${limit}`
      );
      const { images, total_images } = res.data;
      dispatch(setGallery(images));
      dispatch(setTotalImages(total_images));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    document.title = "My Gallery | WorkFlow";
  }, []);

  useEffect(() => {
    if (!uid) return;
    getImageList();
  }, [uid]);

  const handleChange = async (e) => {
    e.preventDefault();
    setValue(e.target.value);
    try {
      const res = await axios.get(
        `${apiBaseURL}/api/v1/gallery/${uid}?page=1&limit=${limit}&search=${e.target.value}`
      );
      const { images, total_images } = res.data;
      dispatch(setGallery(images));
      dispatch(setTotalImages(total_images));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <main className="py-2 sm:px-6 px-4 w-full h-[100vh] overflow-y-auto relative">
      <div className="max-w-6xl mx-auto">
        <div className="my-4 flex justify-start items-center md:flex-row flex-col gap-2">
          <UploadBtn />
          <SearchBar handleChange={handleChange} value={value} />
        </div>
        <ImagesGrid />
        <Pagination limit={limit} />
      </div>
      {viewImage && <ImageViewer />}
    </main>
  );
};

export default Gallery;
