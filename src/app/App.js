import { useState } from 'react';
import '../assets/styles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Navbar, ButtonGroup, ToggleButton } from 'react-bootstrap';
import FileInput from '../components/FileInput';
import Editor from '../components/Editor';
import AccountTable from '../components/AccountTable';
import DataContext, { DataProvider } from '../data/DataContext';
import AccountProcessor from '../services/AccountDataProcessor';

function App() {
  const [userStory, setUserStory] = useState('us1');
  const radios = [
    { name: '1', value: 'us1' },
    { name: '2', value: 'us2' },
    { name: '3', value: 'us3' },
    { name: '4', value: 'us4' },
    { name: '5', value: 'us5' }
  ];

  const usChanged = (usKey) => {
    setUserStory(usKey);
  };

  return (
    <Container className='mt-3 mx-5' fluid data-bs-theme="dark" >
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >Bank OCR</Navbar.Brand>
          <ButtonGroup>
            <span className='mx-3 pt-1'>Select User Story</span>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                name="radio"
                value={radio.value}
                checked={userStory === radio.value}
                onChange={(e) => usChanged(e.currentTarget.value)}
                className='story-button'
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Container>
      </Navbar>

      <DataContext.Provider>
        <DataProvider>
          <Container className='mt-3 mx-auto' style={{ maxWidth: '1000px' }} fluid>
            <Row className="mt-5">
              <Col sm={5}>
                <FileInput />
              </Col>
              <Col sm={3}>
                <Editor />
              </Col>
              <Col sm={4} className='d-flex'>
                <AccountProcessor userStory={userStory} />
                <AccountTable userStory={userStory} />
              </Col>
            </Row>
          </Container>
        </DataProvider>
      </DataContext.Provider>
    </Container>
  );
}

export default App;
