import { Cancel } from "@mui/icons-material";
import { createContext, useContext } from "react";
import axios from "axios";
import CropIcon from "@mui/icons-material/Crop";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { getOrientation } from "get-orientation/browser";
import { UserContext } from "../../Pages/ReaderDashboard/ReaderDashboard";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg, getRotatedImage } from "./CropImage";

//import { useAuth } from "../../context/AuthContext";
//import getCroppedImg from "./CropImage";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const CropEasy = ({ cropOpen, handleClickOpen, handleClose }) => {
  //const { setAlert, setLoading } = useAuth();
  const value1 = useContext(UserContext);

  //console.log("usercontext", value);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploaded, setUploaded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [imageSrc, setImageSrc] = React.useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const closeHandler = () => {
    handleClose();
    setUploaded(false);
  };

  //console.log("--", croppedImage);
  // const cropComplete = (croppedArea, croppedAreaPixels) => {
  //   setCroppedAreaPixels(croppedAreaPixels);
  // };
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);

      const formData = new FormData();
      formData.append("file", croppedImage);
      // formData.append("api_key", YOUR_API_KEY);
      // replace this with your upload preset name
      console.log("hurrah");
      formData.append("upload_preset", "my-uploads"); //via cloudinary
      axios({
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/dlgwvuu5d/image/upload",
        data: formData,
      }).then((res) => {
        console.log("!!!!!!--///////////", res.data.secure_url);
        let value = JSON.parse(localStorage.getItem("token"));
        let token = value.token;
        axios
          .post(
            "http://127.0.0.1:5000/updateProfileImage",
            { image: res.data.secure_url },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token,
              },
            }
          )
          .then((res) => {
            console.log("resssss", res);
            value1.ProfileFetch();
          })
          .catch((err) => console.log("errr", err));
      });
    } catch (e) {
      console.error("errrrrrrrrr", e);
    }
    //--------------------------------------------
    // var reader = new FileReader();
    // reader.readAsDataURL(croppedImage);
    // reader.onloadend = function () {
    //   var base64data = reader.result;

    //---------------------------------------------
  }, [imageSrc, croppedAreaPixels, rotation]);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
      setUploaded(true);
    }
  };

  const cropImage = async () => {};

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={cropOpen} onClose={handleClose}>
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent
          dividers
          sx={{
            background: `${uploaded ? "#333" : "#fff"}`,

            position: "relative",
            height: 400,
            width: "auto",
            minWidth: { sm: 500 },
          }}
        >
          {uploaded ? (
            <Cropper
              image={
                imageSrc
                // "https://res.cloudinary.com/dlgwvuu5d/image/upload/v1661960761/my-uploads/4665_zuak4h.jpg"
              }
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={1}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
            />
          ) : (
            <input
              style={{
                // backgroundColor: "#5cdb95",
                // height: "50px",
                // width: "100px",
                marginTop: "30%",
                marginLeft: "40%",
              }}
              type="file"
              onChange={onFileChange}
              accept="image/*"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
          {uploaded ? (
            <>
              <Box sx={{ width: "100%", mb: 1 }}>
                <Box>
                  <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                  <Slider
                    sx={{ color: "red" }}
                    valueLabelDisplay="auto"
                    valueLabelFormat={zoomPercent}
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </Box>
                <Box>
                  <Typography>Rotation: {rotation + "°"}</Typography>
                  <Slider
                    valueLabelDisplay="auto"
                    min={0}
                    max={360}
                    value={rotation}
                    onChange={(e, rotation) => setRotation(rotation)}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<Cancel />}
                  onClick={closeHandler}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CropIcon />}
                  onClick={showCroppedImage}
                >
                  Crop
                </Button>
              </Box>
            </>
          ) : (
            <div></div>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
