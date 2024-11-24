import React, { useState } from "react";
import { Button, Container, Form, Modal, Alert } from "react-bootstrap";

function SettingModal(props) {
  const {
    show,
    handleClose,
    isSummarize,
    isParaphrase,
    text,
    maxWords,
    setMaxWords,
    level,
    setLevel,
    computeText,
    setLoading,
  } = props;

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  return (
    <Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isSummarize ? "Summary Settings" : "Paraphrase Settings"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && <Alert variant="danger">{alertText}</Alert>}
          {isSummarize && (
            <>
              <Form.Label>Summary containing max words:</Form.Label>
              <Form.Control
                aria-label="Default Input Example"
                type="number"
                min="10"
                max={`${text.split("").length}`}
                onChange={(e) => setMaxWords(e.target.value)}
                value={maxWords}
              />
            </>
          )}
          {isParaphrase && (
            <>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>Select Paraphrase Level:</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Select>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              if (isSummarize) {
                if (maxWords < 10 || maxWords > text.split(" ").length) {
                  setAlertText(
                    `Please enter the number of max words in range: 10 - ${
                      text.split("").length
                    }`
                  );
                  setShowAlert(true);
                } else {
                  setShowAlert(false);
                  setAlertText("");
                  setLoading(true);
                  computeText();
                  handleClose();
                }
              } else if (isParaphrase) {
                if (level === "Select Paraphrase Level:") {
                  setAlertText(
                    `Please select among the levels: Low, Medium, High`
                  );
                  setShowAlert(true);
                } else {
                  setShowAlert(false);
                  setAlertText("");
                  setLoading(true);
                  computeText();
                  handleClose();
                }
              }
            }}
          >
            Compute
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setMaxWords(10);
              setLevel("Select Paraphrase Level:");
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SettingModal;
