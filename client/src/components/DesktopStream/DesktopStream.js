import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSpeechSynthesis } from "react-speech-kit";

function DesktopStream() {
  const [show, setShow] = useState(false);
  const { speak } = useSpeechSynthesis();
  return (
    <>
      <Button
        variant="flat"
        size="xxl"
        onClick={() => {
          setShow(true);
        }}
      >
        Open Desktop Stream
      </Button>
      <br />
      <Modal size="xl" show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Desktop Stream
          </Modal.Title>
        </Modal.Header>
        <div>
          <img src="https://plura.paglipay.info/video_feed" width="100%" />
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
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DesktopStream;
