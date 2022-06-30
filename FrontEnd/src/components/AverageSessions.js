import {fetchAverageSession} from "../service/getData";
import D3AverageSession from './D3/D3AverageSessions';
import React, { useState, useEffect } from "react";
import '../styles/AverageSessions.css';

function AverageSessions() {

   const [session, setSession] = useState([])
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSessionUser()
  }, [])

  async function fetchSessionUser () {
    const info = await fetchAverageSession('average-sessions')
    setSession(info)
    setIsLoading(false);
  }

    return <div className="averageSessions">
        <p className="sessionsText">Durée moyenne<br></br>des sessions</p>
        {!isLoading && <D3AverageSession data={session} />}
            
    </div>
}

export default AverageSessions