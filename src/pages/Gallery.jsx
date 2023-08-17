import React, { useEffect } from "react";
import { FcGallery } from "react-icons/fc";
import UploadBtn from "../components/UploadBtn";
import SearchBar from "../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../firebase/config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { setGallery, addToGallery } from "../features/gallerySlice";
import ImagesGrid from "../components/ImagesGrid";

const Gallery = () => {
  const uid = useSelector((state) => state.auth.uid);
  const filePath = `user/uid-${uid}/gallery/`;
  const gallery = useSelector((state) => state.gallery);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();

  const getImageList = async () => {
    try {
      const listRef = ref(storage, filePath);
      const res = await listAll(listRef);
      const images_data = res.items.map(async (item) => {
        try {
          const url = await getDownloadURL(item);
          return url;
        } catch (error) {
          console.error(error.code, error.message);
        }
      });
      const images = await Promise.all(images_data);
      dispatch(setGallery(images));
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  useEffect(() => {
    if (!uid) return;
    getImageList();
  }, [uid]);

  return (
    <div className=" py-10 px-10 w-full h-[100vh] overflow-y-auto">
      <div className="flex justify-start items-center gap-3">
        <h3 className="text-2xl text-gray-200 font-extrabold">My Gallery</h3>
        <FcGallery className="text-4xl" />
      </div>

      <div className="mt-4 flex justify-start items-center gap-3">
        <UploadBtn />
        <SearchBar />
      </div>
      <div className="">
        <ImagesGrid />
      </div>
    </div>
  );
};

export default Gallery;
