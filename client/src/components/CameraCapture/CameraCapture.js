import React, { useRef, useEffect, useState } from "react";
import {
  Form,
  Table,
  Badge,
  Container,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import "./CameraCapture.css";

const CameraBooth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [showLiveInLeft, setShowLiveInLeft] = useState(false);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access error:", err);
      }
    };
    initCamera();
  }, []);

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    if (video && canvas && ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);

        setImages((prevImages) => {
          const updatedImages = [...prevImages, url];

          // Once we reach 4 images, replace left cam with 4th image
          if (updatedImages.length > 3) {
            setShowLiveInLeft(true);
            return updatedImages.slice(-3); // keep only last 3
          }

          return updatedImages;
        });
      }, "image/png");
    }
  };

  return (
    <Row className="camera-booth-container">
      <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
        {/* Left Column */}
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end", // Align items to the right
          }}
          xs={6}
        >
          {showLiveInLeft ? (
            <div
              style={{
                position: "relative",
                width: 320,
                height: 240,
                border: "2px solid gray",
              }}
            >
              <video
                ref={videoRef}
                width="320"
                height="240"
                autoPlay
                muted
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                width="320"
                height="240"
                alt={`snap-${idx}`}
                style={{ border: "2px solid #ccc" }}
              />
            ))
          )}
        </Col>
        <Col style={{ display: "flex", flexDirection: "column" }} xs={6}>
          {/* Right Column */}

          {!showLiveInLeft && (
            <div
              style={{
                position: "relative",
                width: 960,
                height: 720,
                border: "2px solid gray",
              }}
            >
              <video
                ref={videoRef}
                width="960"
                height="720"
                autoPlay
                muted
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
          <Button
            onClick={handleCapture}
            style={{ marginTop: "20px", padding: "10px 20px" }}
          >
            Snap Photo
          </Button>

          {/* Hidden canvas for image capture */}
          <canvas
            ref={canvasRef}
            width="320"
            height="240"
            style={{ display: "none" }}
          />
        </Col>
      </div>
    </Row>
  );
};

export default CameraBooth;
