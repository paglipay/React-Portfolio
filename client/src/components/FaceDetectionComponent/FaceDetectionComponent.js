import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Carousel from "react-bootstrap/Carousel";

const FaceDetectionComponent = () => {
  const videoRef = useRef(null);
  const [faceDetected, setFaceDetected] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Camera error:", err));
    };

    loadModels();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );
        if (detections.length > 0) {
          setFaceDetected(true);
          console.log("👤 Face detected! Triggering function...");
          triggerFunctionOnFaceDetected();
        } else {
          setFaceDetected(false);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const [imgData, setImgData] = useState(localStorage.getItem("capturedImage"));

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("Checking for updated image data in localStorage...");
      const updatedImgData = localStorage.getItem("capturedImage");
      if (updatedImgData !== imgData) {
        setImgData(updatedImgData);
        // console.log("Image data updated:", updatedImgData);
      }
    }, 10000); // Check every minute

    return () => clearInterval(interval);
  }, [imgData]);

  const triggerFunctionOnFaceDetected = () => {
    // alert('Face detected! You can trigger any custom function here.');
    console.log("Face detected! You can trigger any custom function here.");
    window.location.href = "/camera"; // Redirect to another page
  };

  return (
    <>
      <Carousel style={{ marginTop: "20px" }}>
        <Carousel.Item interval={9000} key={11}>
          <img
            className="d-block w-100"
            src={
              imgData
                ? imgData
                : "https://picsum.photos/600/700?advertisement=11"
            }
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Face Detection Carousel 11</h3>
            <p>Some description for the first slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={9000} key={12}>
          <img
            className="d-block w-100"
            src="/pb1(1).jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Face Detection Carousel 11</h3>
            <p>Some description for the first slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
        {[
          "1",
          // , "2", "3", "4", "5", "6", "7", "8", "9", "0"
        ].map((image, i) => (
          <Carousel.Item interval={9000} key={i}>
            <img
              className="d-block w-100"
              src={`https://picsum.photos/600/700?advertisement=1${i}`}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Face Detection Carousel {`${i}`}</h3>
              <p>Some description for the first slide.</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
        <Carousel.Item interval={9000} key={13}>
          <img
            className="d-block w-100"
            src="/pb1(2).jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Face Detection Carousel 11</h3>
            <p>Some description for the first slide.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div style={{ textAlign: "center" }}>
        <h1>🎥 Face Detection (Offline)</h1>
        <video
          ref={videoRef}
          autoPlay
          muted
          width="720"
          height="560"
          style={{ border: "1px solid #ccc" }}
        />
        <p>
          Status: {faceDetected ? "✅ Face Detected" : "❌ No Face Detected"}
        </p>
      </div>
    </>
  );
};

export default FaceDetectionComponent;
