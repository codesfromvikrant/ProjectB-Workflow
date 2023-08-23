import React, { useEffect } from "react";
import UploadBtn from "../components/gallery/UploadBtn";
import SearchBar from "../components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { storage } from "../firebase/config";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { setGallery, addToGallery } from "../features/gallerySlice";
import ImagesGrid from "../components/gallery/ImagesGrid";

const Gallery = () => {
  const uid = useSelector((state) => state.auth.uid);
  const filePath = `user/uid-${uid}/gallery/`;
  const dispatch = useDispatch();

  const getImageList = async () => {
    try {
      const listRef = ref(storage, filePath);
      const res = await listAll(listRef);

      const images_data = res.items.map(async (item) => {
        try {
          const url = await getDownloadURL(item);
          const metaRef = ref(storage, item.fullPath);
          const metadata = await getMetadata(metaRef);
          const data = {
            url,
            name: metadata.name,
            size: metadata.size,
            type: metadata.contentType,
            timeCreated: metadata.timeCreated,
          };
          return data;
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
    <div className="relative py-2 px-20 w-full h-[100vh] overflow-y-auto">
      <UploadBtn />
      <div className="my-4">
        <SearchBar />
      </div>
      <div className="">
        <ImagesGrid />
      </div>
    </div>
  );
};

export default Gallery;
