import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { loadSeller } from "../redux/actions/userAction";
import { toast } from "react-toastify";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";

export default function ShopSettings() {
  const { currentSeller } = useSelector((state) => state.seller);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, [imageFile]);
  function handleFileUpload(imageFile) {
    const storage = getStorage(app);
    const fileName = new Date().getTime + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  }

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }

  async function updateHandler(e) {
    e.preventDefault();
    await axios
      .put(`/api/shop/update-shop-info/${currentSeller._id}`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  console.log(formData);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex w-full lg:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={formData.avatar || currentSeller.avatar}
              alt=""
              className="w-[150px] h-[150px] rounded-full cursor-pointer"
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
          <p className="text-sm self-center mt-2">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
        </div>

        {/* shop info */}
        <form
          aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col lg:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-1">Shop Name</label>
            </div>
            <input
              type="text"
              id="name"
              defaultValue={currentSeller?.name}
              onChange={handleChange}
              className="border p-1 rounded-[5px] w-[95%] mb-4 lg:mb-0"
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col lg:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-1">Shop description</label>
            </div>
            <input
              type="text"
              id="description"
              defaultValue={currentSeller?.description}
              onChange={handleChange}
              className="border p-1 rounded-[5px] w-[95%] mb-4 lg:mb-0"
            />
          </div>
          <div className="w-[100%] flex items-center flex-col lg:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-1">Shop Address</label>
            </div>
            <input
              type="text"
              id="address"
              defaultValue={currentSeller?.address}
              onChange={handleChange}
              className="border p-1 rounded-[5px] w-[95%] mb-4 lg:mb-0"
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col lg:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-1">Shop Phone Number</label>
            </div>
            <input
              type="number"
              id="phoneNumber"
              defaultValue={currentSeller?.phoneNumber}
              onChange={handleChange}
              className="border p-1 rounded-[5px] w-[95%] mb-4 lg:mb-0"
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col lg:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-1">Shop Zip Code</label>
            </div>
            <input
              type="number"
              id="zipCode"
              defaultValue={currentSeller?.zipCode}
              onChange={handleChange}
              className="border p-1 rounded-[5px] w-[95%] mb-4 lg:mb-0"
              required
            />
          </div>

          <button
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-5 cursor-pointer uppercase`}
          >
            update
          </button>
        </form>
      </div>
    </div>
  );
}
