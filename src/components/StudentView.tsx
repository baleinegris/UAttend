import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

const StudentView = () => {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();
  const [userLocation, setUserLocation] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
            // what to do once we have the position
        },
        (error) => {
            // display an error if we cant get the users position
            console.log('Error getting user location:', error);
        }
    );  
    console.log('Getting the user location...');
  } else {
      // display an error if not supported
      console.log('Geolocation is not supported by this browser.');
  }
  };

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  function submitAttendance() {
    getUserLocation();
    const username = user?.signInDetails?.loginId;
    console.log(username)
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={submitAttendance}>Confirm Attendance</button>
      {userLocation && (
      <div>
          <h2>User Location</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
      </div>)}
     </main>
  );
}

export default StudentView