import { useContext } from 'react';
import FileSelector from './FileSelector.js';
import DataContext from '../data/DataContext.js';

function FileInput() {
    const { setContent } = useContext(DataContext);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            setContent(text);
        }
        reader.readAsText(file);
    }

    const handleFileSelect = async (filename) => {
        try {
            const fileContent = await getTextFile(filename);
            setContent(fileContent);
        } catch (error) {
            console.error('Error fetching file content:', error);
        }
    };

    const getTextFile = async (filename) => {
        try {
            const response = await fetch(`https://kviksite.com/bank-ocr/files?action=get&filename=${filename}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            throw new Error(`Fetch error: ${error.message}`);
        }
    };

    return (
        <div>
            <label id="lblFormFile" htmlFor="formFile" className="form-label">Load from file</label>
            <input id="formFile" className="form-control" type="file" onChange={handleFileChange} />
            <FileSelector onSelectFile={handleFileSelect} />
        </div>
    );
}

export default FileInput;