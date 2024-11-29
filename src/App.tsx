import { useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function App() {
  const [sessionId, setSessionId] = useState(useParams().sessionId);
  const buttonStyle = {
    padding: '10px',
    backgroundColor: 'white',
    color: 'black',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }

  return (
    <div>
      <h1>UAttend</h1>
      <h2>Select Role:</h2>
      <div style={{display: 'flex', gap: '10px'}}>
        <Link style={buttonStyle} to="/prof">Professor</Link>
        <Link style={buttonStyle} to={`/student/${sessionId}`}>Student</Link>
      </div>
    </div>
  );
  
}

export default App;
