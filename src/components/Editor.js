import  { useContext } from 'react';
import { Form } from 'react-bootstrap';
import DataContext from '../data/DataContext';

function Editor() {
    const { content, setContent } = useContext(DataContext);

    const handleContentChange = (newContent) => {
        setContent(newContent);
    };

    return (
        <div className="mx-auto justify-content-center d-block">
            <label htmlFor="txaContent" className="form-label">
            Paste & Edit scanned entries
            </label>
            <Form.Control
                id="txaContent"
                as="textarea"
                rows={40 }
                value={content}
                style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '10px', lineHeight:"1.0" }}
                onChange={(e) => handleContentChange(e.target.value)}
            />
        </div>
    );
}

export default Editor;
