import { useState } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';

const StudentView = () => {
  const { user, signOut } = useAuthenticator();
  const [userLocation, setUserLocation]: any = useState(null);

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

  async function submitAttendance() {
    getUserLocation();
    const username = user?.signInDetails?.loginId;
    console.log(JSON.stringify({ profemail: username, lat: userLocation[0], lon: userLocation[1] }))
    console.log(username)
    let response = await fetch('https://ujmvxe9p7k.execute-api.us-west-2.amazonaws.com/default/check-in', {
        method: 'POST',
        body: JSON.stringify({ profemail: username, lat: userLocation[0], lon: userLocation[1] })
    })
    let data = await response.json()
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