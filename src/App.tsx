import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const client = generateClient<Schema>();

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
