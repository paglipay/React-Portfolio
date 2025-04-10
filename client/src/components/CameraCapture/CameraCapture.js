import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
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
      {/* Left Column */}
      <Col xs={12} md={3} className="camera-booth-left">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end", // Align items to the right
            gap: "10px",
          }}
        >
          {showLiveInLeft ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 3",
                border: "2px solid gray",
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ) : (
            images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`snap-${idx}`}
                style={{
                  width: "100%",
                  aspectRatio: "4 / 3",
                  border: "2px solid #ccc",
                }}
              />
            ))
          )}
        </div>
      </Col>

      {/* Right Column */}
      <Col xs={12} md={9} className="camera-booth-right">
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            border: "2px solid gray",
          }}
        >
          {!showLiveInLeft && (
            <video
              ref={videoRef}
              autoPlay
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
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
    </Row>
  );
};

export default CameraBooth;
