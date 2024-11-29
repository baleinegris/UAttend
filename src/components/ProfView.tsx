import React, { useState } from 'react'
import QRCode from "react-qr-code";
import { useAuthenticator } from '@aws-amplify/ui-react';


export default function ProfView() {
    const [attendanceCode, setAttendanceCode] = React.useState('')
    const [attendanceLaunched, setAttendanceLaunched] = React.useState(false)
    const [userLocation, setUserLocation]: any= useState(null);
    const { user, signOut } = useAuthenticator();
    const username = user?.signInDetails?.loginId;

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
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

    async function launchAttendance() {
        await getUserLocation();
        // Ping API endpoint to launch attendance
        let response = await fetch('https://h3acu6uy05.execute-api.us-west-2.amazonaws.com/default', {
            method: 'POST',
            body: JSON.stringify({ profemail: username, lat: userLocation[0], lon: userLocation[1] })
        })
        console.log(JSON.stringify({ profemail: username, lat: userLocation[0], lon: userLocation[1] }))
        let data = await response.json()
        console.log(data)
        let sessionId = data.sessionId
        let callback = `https://main.d2yz6k2q974qc4.amplifyapp.com/student/${sessionId}`
        setAttendanceCode(callback)
        setAttendanceLaunched(true)
    }

    return (
        <div>
            <h1>Professor View</h1>
            <button onClick={launchAttendance}>Launch Attendance</button>
            {attendanceLaunched && 
            <QRCode
                size={400}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={attendanceCode}
                viewBox={`0 0 256 256`}
            />}
        </div>
    )
}