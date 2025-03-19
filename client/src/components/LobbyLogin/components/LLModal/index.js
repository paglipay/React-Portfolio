import React from "react";
import { Modal, Button } from "react-bootstrap";

// import VideoChat from "../../../ReactVideoChat/App";

function index(props) {
  const handleClose = () => props.setShow(false);

  return (
    <>
      <Modal show={props.show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>Instant Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
          <div id="disclaimer" style={{ fontSize: "12px", color: "#888" }}>
            <h5>Disclaimer:</h5>
            <ol>
              <li>
                <strong>Microphone and Camera Access:</strong> This video call
                requires access to your device's microphone and camera to
                facilitate communication. By clicking "Allow," you grant
                permission for the use of these functionalities solely for the
                purpose of this call.
              </li>
              <li>
                <strong>Privacy:</strong> We respect your privacy and assure you
                that any data collected during this video call will only be used
                for the intended purpose of communication and will not be shared
                with third parties without your consent. Please review our
                privacy policy for more information.
              </li>
              <li>
                <strong>Support Availability:</strong> While we strive to
                provide assistance and support during your video call, please be
                aware that our support services may not be available outside of
                typical working hours. If you require immediate assistance
                outside of these hours, please contact us through alternative
                channels or schedule a callback during our operational hours.
              </li>
              <li>
                <strong>Technical Issues:</strong> Despite our best efforts,
                technical issues may arise during the video call, such as poor
                audio or video quality, disruptions in connection, or
                compatibility issues with your device. We appreciate your
                patience and understanding in such situations as we work to
                resolve them promptly.
              </li>
              {/* <li>
                <strong>Use of Information:</strong> Any information shared
                during this video call, whether verbal or visual, may be
                recorded for quality assurance, training, or legal purposes. By
                participating in the call, you consent to the recording and
                storage of such information in accordance with our data
                retention policies.
              </li> */}
            </ol>
            <p>
              By clicking "Call" or proceeding with the video call, you
              indicate that you have read, understood, and agreed to the terms
              outlined in this disclaimer. If you do not agree with any of these
              terms, please refrain from initiating the video call.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default index;
