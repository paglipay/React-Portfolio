import React, { useRef, useEffect, useState } from "react";
import { Row, Col, Alert, Button, Modal, Image } from "react-bootstrap";
import "./CameraCapture.css";

const CameraBooth = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [lgShow, setLgShow] = useState(false);

  const timedEvents = [
    { time: 3, caption: "Get ready, starts in 3 seconds!", takeshot: false },
    { time: 3, caption: "Great Shot! Again in 3 seconds", takeshot: true },
    {
      time: 3,
      caption: "Another great Shot! 2 more in 3 seconds",
      takeshot: true,
    },
    {
      time: 3,
      caption: "Another great Shot! 1 more in 3 seconds",
      takeshot: true,
    },
    { time: 3, caption: "All Done!", takeshot: true },
    {
      time: 0,
      caption: "That was great! Don't forget to pick up your photos",
      takeshot: false,
    },
  ];

  const startTimedShots = () => {
    let index = 0;

    const executeEvent = () => {
      if (index < timedEvents.length) {
        const event = timedEvents[index];
        console.log(event.caption); // Display caption (can be replaced with UI updates)
        setAlerts((prevAlerts) => [
          ...prevAlerts,
          { time: event.time, caption: event.caption },
        ]);
        if (index < timedEvents.length - 1 && event.takeshot === true) {
          handleCapture(); // Trigger a shot
        }
        if (index === timedEvents.length - 1) {
          setLgShow(true);
        }
        index++;
        if (event.time > 0) {
          setTimeout(executeEvent, event.time * 1000);
        }
      }
    };

    executeEvent();
  };
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
    <Row className="camera-booth-container" style={{ margin: "20px" }}>
      {/* Left Column */}
      <Col xs={12} md={4} className="camera-booth-left">
        <Image
          src="/sb_logo.jpg"
          alt="Camera Icon"
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "200px",
            margin: "0 auto",
          }}
        />
        <br/>
        <br/>
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
                aspectRatio: "16 / 9",
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
                  aspectRatio: "16 / 9",
                  border: "2px solid #ccc",
                }}
              />
            ))
          )}
        </div>
      </Col>

      {/* Right Column */}
      <Col xs={12} md={8} className="camera-booth-right">
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
          size="lg"
          onClick={startTimedShots}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Start Snap Photos
        </Button>{" "}
        <Button
          size="lg"
          onClick={handleCapture}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Snap Photo
        </Button>{" "}
        <Button
          size="lg"
          onClick={() => setLgShow(true)}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Large modal
        </Button>
        <br />
        <br />
        {alerts
          .slice()
          .reverse()
          .map((item, i) => (
            // <Alert key={`alert-${i}`} variant="danger">
            //   {item.caption}
            // </Alert>
            <Alert variant="success">
              <Alert.Heading>{item.caption}</Alert.Heading>
              <p>
                Aww yeah, you successfully read this important alert message.
                This example text is going to run a bit longer so that you can
                see how spacing within an alert works with this kind of content.
              </p>
              <hr />
              <p className="mb-0">
                Whenever you need to, be sure to use margin utilities to keep
                things nice and tidy.
              </p>
            </Alert>
          ))}
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Great Job! It looks Amazing!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>... Picture Here!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">AI Generate</Button>
          </Modal.Footer>
        </Modal>
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
