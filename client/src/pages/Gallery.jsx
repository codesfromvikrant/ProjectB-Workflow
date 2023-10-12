import React, { useEffect } from "react";
import UploadBtn from "../components/gallery/UploadBtn";
import SearchBar from "../components/SearchBar";
import { setGallery } from "../features/gallerySlice";
import { useSelector, useDispatch } from "react-redux";
import ImagesGrid from "../components/gallery/ImagesGrid";
import axios from "axios";

const Gallery = () => {
  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();

  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
  const getImageList = async () => {
    try {
      const res = await axios.get(`${apiBaseURL}/api/v1/gallery/${uid}`);
      const { images } = res.data;
      dispatch(setGallery(images));
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

  return (
    <main className="py-2 sm:px-6 px-4 w-full h-[100vh] overflow-y-auto">
      <div className="max-w-6xl mx-auto h-[100vh]">
        <div className="my-4 flex justify-start items-center md:flex-row flex-col gap-2">
          <UploadBtn />
          <SearchBar />
        </div>
        <ImagesGrid />
      </div>
    </main>
  );
};

export default Gallery;
