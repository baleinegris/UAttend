import { useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function App() {
  const [sessionId, setSessionId] = useState(useParams().sessionId);

  return (
    <div>
      <h1>UAttend</h1>
      <Link to="/prof">Professor View</Link>
      <Link to={`/student/${sessionId}`}>Student View</Link>
    </div>
  );
  
}

export default App;
