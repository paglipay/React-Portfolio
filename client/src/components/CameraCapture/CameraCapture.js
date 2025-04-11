import React, { useRef, useEffect, useState } from "react";
import {
  Row,
  Col,
  Alert,
  Button,
  Modal,
  Image,
  Spinner,
  Container,
} from "react-bootstrap";
import html2canvas from "html2canvas"; // Import html2canvas
import "./CameraCapture.css";

const CameraBooth = () => {
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const [images, setImages] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // State to store the captured image
  const [colSizes, setColSizes] = useState([3, 9]); // Initial column sizes
  const [toggle, setToggle] = useState(false); // State to track toggle status
  const rowRef = useRef(null); // Ref for the Row element

  const toggleSizes = () => {
    if (toggle === true) {
      setColSizes([1, 11]); // Set to 12 and 0
    } else {
      setColSizes([3, 9]);
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    setTimeout(() => {
      setColSizes([1, 11]);
      // setShowButton(true);
    }, 3000); // Set initial column sizes after 1 second
    setTimeout(() => {
      // setColSizes([1, 11]);
      setShowButton(true);
      setShowSpinner(false);
    }, 6000); // Set initial column sizes after 1 second
  }, []); // Set initial column sizes on mount

  useEffect(() => {
    console.log("colSizes", colSizes);
  }, [colSizes]);

  const timedEvents = [
    { time: 3, caption: "Get ready, starts in 3 seconds!", takeshot: false },
    { time: 1, caption: "3", takeshot: false },
    { time: 1, caption: "2", takeshot: false },
    { time: 1, caption: "1", takeshot: false },
    { time: 3, caption: "Great Shot! Again in 3 seconds", takeshot: true },
    { time: 1, caption: "3", takeshot: false },
    { time: 1, caption: "2", takeshot: false },
    { time: 1, caption: "1", takeshot: false },
    {
      time: 3,
      caption: "Another great Shot! 2 more in 3 seconds",
      takeshot: true,
    },
    { time: 1, caption: "3", takeshot: false },
    { time: 1, caption: "2", takeshot: false },
    { time: 1, caption: "1", takeshot: false },
    {
      time: 3,
      caption: "Another great Shot! 1 more in 3 seconds",
      takeshot: true,
    },
    { time: 1, caption: "3", takeshot: false },
    { time: 1, caption: "2", takeshot: false },
    { time: 1, caption: "1", takeshot: false },
    { time: 3, caption: "All Done!", takeshot: true },
    {
      time: 0,
      caption: "That was great! Don't forget to pick up your photos",
      takeshot: false,
    },
  ];

  const startTimedShots = () => {
    setColSizes([3, 9]);
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
          setShowSpinner(true);
          setTimeout(() => {
            setShowSpinner(false);
            // setLgShow(true);
            captureRowAsImage()
            
          }, 4000);
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
            // setShowLiveInLeft(true);
            return updatedImages.slice(-3); // keep only last 3
          }

          return updatedImages;
        });
      }, "image/png");
    }
  };

  const captureRowAsImage = async () => {
    if (rowRef.current) {
      // Temporarily set the background color to black
      rowRef.current.style.backgroundColor = "black";

      //top margin
      rowRef.current.style.marginTop = "5px";

      // Capture the Row as a canvas
      const canvas = await html2canvas(rowRef.current, {
        backgroundColor: null, // Ensure transparency is handled correctly
      });

      // Reset the background color to its original state
      rowRef.current.style.backgroundColor = "";

      // Convert the canvas to a data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Store the captured image in state
      setCapturedImage(dataUrl);

      // Show the modal
      setLgShow(true);
    }
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement("a");
      link.href = capturedImage;
      link.download = "captured-image.png";
      link.click();
    }
  };

  return (
    <>
      <Button
        variant="success"
        size="lg"
        onClick={() => {
          setShowButton(false);
          startTimedShots();
        }}
        style={{
          display: showButton ? "block" : "none",
          marginTop: "20px",
          padding: "10px 20px",
          position: "absolute",
          top: "50%",
          left: "33%",
          width: "33%",
          height: "auto",
          zIndex: 10000,
        }}
        className="start-button"
      >
        Start Snap Photos
      </Button>
      <Spinner
        animation="border"
        role="status"
        style={{
          position: "absolute",
          top: "40%",
          left: "40%",
          width: "350px", // Set width to 3x larger
          height: "350px", // Set height to 3x larger
          borderWidth: "50px", // Thicken the spinner line
          zIndex: "10000",
          display: showSpinner ? "block" : "none",
        }}
      ></Spinner>
      {alerts
        .slice()
        .reverse()
        .map((item, i) => (
          <Alert
            variant="success"
            
            style={{
              display: i === 0 ? "block" : "none",
              position: "absolute",
              top: "33%",
              left: "33%",
              width: "33%",
              zIndex: 100-i,
            }}
            key={`alert-${i}`}
            className="alert-position"
          >
            <Alert.Heading>{item.caption}</Alert.Heading>
            
          </Alert>
        ))}

      <Row
        className="camera-booth-container"
        style={{ margin: "20px" }}
        ref={rowRef} // Attach the ref to the Row
      >
        {/* Left Column */}
        <Col
          xs={12}
          md={colSizes[0]}
          className="camera-booth-left"
          style={{
            transition: "flex-basis 0.5s ease", // Smooth transition for resizing
          }}
        >
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
        <Col
          xs={12}
          md={colSizes[1]}
          className="camera-booth-right"
          style={{
            transition: "flex-basis 0.5s ease", // Smooth transition for resizing
          }}
        >
          <Image
            src="/1000008934.jpg"
            alt="Camera Icon"
            style={{
              width: "100%",
              height: "auto",
              margin: "0 auto",
            }}
          />
          <br />
          <br />
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
          {/* <Button
            variant="primary"
            onClick={captureRowAsImage}
            style={{ marginTop: "20px" }}
          >
            Capture and Show in Modal
          </Button> */}
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Great Job! You Look Amazing!
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {capturedImage && (
                <Image
                  src={capturedImage}
                  alt="Captured"
                  style={{
                    width: "100%",
                    height: "auto",
                  }}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setLgShow(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={downloadImage}>
                Download Image
              </Button>
            </Modal.Footer>
          </Modal>
          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              fontSize: "0.9rem",
              color: "#888",
            }}
          ></p>
          {/* Hidden canvas for image capture */}
          <canvas
            ref={canvasRef}
            width="320"
            height="240"
            style={{ display: "none" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default CameraBooth;
