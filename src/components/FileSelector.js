import React, { useState, useEffect } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';

function FileSelector({ onSelectFile }) {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFilesList();
    }, []);

    const fetchFilesList = async () => {
        try {
            const response = await fetch('https://kviksite.com/bank-ocr/files?action=list');
            const data = await response.text();
            const fileList = data.split('\n').filter(file => file.trim() !== '');
            setFiles(fileList);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching files list:', error);
            setLoading(false);
        }
    };

    const handleFileSelect = (filename) => {
        onSelectFile(filename);
    };

    return (
        <div className='mt-3 d-flex flex-column'>
            <label id="lblFileList" htmlFor="fileList" className="form-label">
                Select an example
            </label>
            {loading ? (
                <div id="fileList" className="d-flex justify-content-center align-items-center flex-column">
                    <Spinner animation="border" role="status" style={{ marginBottom: "10px" }}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <span style={{ color: "#FFFFFF" }}>Loading...</span>
                </div>
            ) : (
                <ListGroup className='p-0'>
                    {files.map((file, index) => (
                        <ListGroup.Item key={index} action onClick={() => handleFileSelect(file)}>{file}</ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}

export default FileSelector;
