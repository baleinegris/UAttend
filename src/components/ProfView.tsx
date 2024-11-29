import React, { useState } from 'react'
import QRCode from "react-qr-code";


export default function ProfView() {
    const [attendanceCode, setAttendanceCode] = React.useState('')
    const [attendanceLaunched, setAttendanceLaunched] = React.useState(false)
    const [userLocation, setUserLocation]: any= useState(null);

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

    async function launchAttendance() {
        await getUserLocation();
        // Ping API endpoint to launch attendance
        // let response = await fetch('https://api.example.com/launch-attendance', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ launch: true, location: userLocation })
        // })
        // let data = await response.json()
        let data = {callback: 'google.com'}
        let callback = data.callback
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