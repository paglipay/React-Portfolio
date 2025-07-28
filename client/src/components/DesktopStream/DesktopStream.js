import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSpeechSynthesis } from "react-speech-kit";

function DesktopStream() {
  const [show, setShow] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    "https://plura.paglipay.info/video_feed"
  );
  const intervalRef = useRef(null);
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    if (show) {
      // Start refreshing the image every 10 seconds
      intervalRef.current = setInterval(() => {
        setImgSrc(`https://plura.paglipay.info/video_feed?${Date.now()}`);
        console.log("Refreshing stream...");
      }, 10000);
    } else {
      // Stop refreshing when modal is closed
      clearInterval(intervalRef.current);
    }
    // Cleanup on unmount or when modal closes
    return () => clearInterval(intervalRef.current);
  }, [show]);

  return (
    <>
      <Button variant="flat" size="xxl" onClick={() => setShow(true)}>
        Open Desktop Stream
      </Button>
      <br />
      <Modal size="xl" show={show} centered onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Desktop Stream
          </Modal.Title>
        </Modal.Header>
        <div>
          <Carousel
            // interval={null}
            controls={true}
            indicators={true}
            slide={true}
            
            // fade={true}
            // className="mb-3"
          >
            <Carousel.Item interval={9000} key={1}>
              <img src={imgSrc} width="100%" alt="Desktop Stream" />
            </Carousel.Item>
            <Carousel.Item interval={9000} key={2}>
              <img src={imgSrc} width="100%" alt="Desktop Stream" />
            </Carousel.Item>
          </Carousel>
        </div>
        <Modal.Footer>
          <Button
            onClick={() => {
              speak({
                text: "This is a live desktop stream showcasing the developer's work and projects. You can view the stream to see the latest updates and activities.",
              });
            }}
          >
            Speak Description
          </Button>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DesktopStream;
