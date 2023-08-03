import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const App = () => {
  const [pgnText, setPgnText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const handlePgnChange = (e) => {
    setPgnText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/analyze', { pgn: pgnText });
      setAnalysisResult(response.data.analysis);
    } catch (error) {
      console.error('Error analyzing the PGN:', error);
    }
  };

  return (
    <Container>
      <h1>Chess Game Analysis</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="pgnInput">
          <Form.Label>Paste your PGN here:</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={pgnText}
            onChange={handlePgnChange}
            placeholder="1. e4 e5 2. Nf3 ..."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Analyze
        </Button>
      </Form>
      {analysisResult && (
        <Row>
          <Col>
            <h2>Analysis Results:</h2>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;
