import { useState, useEffect } from "react";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import SettingModal from "./components/SettingModal";
// import axios from 'axios';
import { message } from "antd";
import Loader from "./components/Loader";
import { postParaphrasedText, postSummarizedText } from "./apicalls/texts";

function App() {
  const [isSummarize, setIsSummarize] = useState(false);
  const [isParaphrase, setIsParaphrase] = useState(false);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [maxWords, setMaxWords] = useState(10);
  const [level, setLevel] = useState("Select Paraphrase Level:");
  const [resultText, setResultText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // Update body class when isDarkMode changes
   useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const computeText = async() => {
    try{
      let response = null;
      let requestBody = null;
      console.log("Inside Compute Text function...")
      if(isSummarize){
        requestBody = {
          text: text,
          maxWords: maxWords
        }
        response = await postSummarizedText(requestBody);
        if(response.success){
          setLoading(false);
          message.success(response.message);
          setResultText(response.data);
        }
        else{
          setLoading(false);
          message.info(response.message);
          setResultText("");
        }
      }
      else if(isParaphrase){
        requestBody = {
          text: text,
          level: level
        }
        response = await postParaphrasedText(requestBody);
        if(response.success){
          setLoading(false);
          message.success(response.message);
          setResultText(response.data);
        }
        else{
          setLoading(false);
          message.info(response.message);
          setResultText("");
        }
      }
    }
    catch(error){
       setLoading(false);
       message.error(error.message);
       setResultText("");
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resultText)
      .then(() => {
        message.success("Text copied to clipboard!");
      })
      .catch((err) => {
        message.error("Failed to copy text: " + err.message);
      });
  };

  return (
    <Container>
      {loading && <Loader/>}
      <Row>
        <center>
          <h1>Text Summarizer/Paraphraser Tool</h1>
          <Button variant="secondary" onClick={() => setIsDarkMode(!isDarkMode)}>
            Switch to {isDarkMode ? 'Light ☀' : 'Dark 🌑'} Mode
          </Button>
        </center>
      </Row>
      <Row className="my-5 mx-3">
        <Form.Control
          as="textarea"
          placeholder="Enter your text"
          style={{
            height: "100px",
          }}
          onChange={(e) => setText(e.target.value)}
          value={text}
          className={isDarkMode ? 'dark-mode' : 'light-mode'}
        />
        <Row className="mt-3">
          <Col md={6} sm={12}>
            <Row className="m-2">
              <Button
                variant="outline-success"
                onClick={() => {
                  setIsSummarize(true);
                  setIsParaphrase(false);
                  handleShow();
                }}
                disabled={text===""||text.length<10}
              >
                Summarize Text
              </Button>
            </Row>
          </Col>
          <Col md={6} sm={12}>
            <Row className="m-2">
              <Button variant="success" onClick={() => {
                  setIsParaphrase(true);
                  setIsSummarize(false);
                  handleShow();
                }} disabled={text===""||text.length<10}>Paraphrase Text</Button>
            </Row>
          </Col>
        </Row>
      </Row>
      {show&&<SettingModal show={show} handleShow={handleShow} handleClose={handleClose} isSummarize = {isSummarize} isParaphrase = {isParaphrase} text = {text} maxWords={maxWords} setMaxWords = {setMaxWords} level={level} setLevel = {setLevel} computeText={computeText} loading={loading} setLoading={setLoading} />}
      {resultText!=="" && <Row className="mt-3">
        {isSummarize && <Row><h3>Summarized Text:</h3></Row>}
        {isParaphrase && <Row><h3>Paraphrased Text:</h3></Row>}
        <p className="mt-3">{resultText}</p>
        <Row className="mt-3">
        <Col md={6} sm={12}>
          <Row className="m-2"><Button onClick={copyToClipboard} variant="primary">Copy to Clipboard</Button></Row>
        </Col>
        <Col md={6} sm={12}>
          <Row className="m-2"><Button onClick={()=>{
          setText("");
          setIsSummarize(false);
          setIsParaphrase(false);
          setResultText("");
          setMaxWords(10);
          setLevel("Select Paraphrase Level:");
          setLoading(false);
        }} variant="danger">Clear</Button></Row>
        </Col>
        </Row>
      </Row>}
    </Container>
  );
}

export default App;
