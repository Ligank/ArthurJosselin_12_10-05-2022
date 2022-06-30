import {fetchScore} from "../service/getData";
import D3Score from './D3/d3Score';
import React, { useState, useEffect } from "react";
import '../styles/Score.css';

function Score() {
  const [scoreUser, setScoreUser] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchScoreUser()
  }, [])

  async function fetchScoreUser () {
    const info = await fetchScore('')
    setScoreUser(info)
    setIsLoading(false);
  }

  
    return <div className="scoreBox">
            <h1 className="scoreTitle">Score</h1>
            <div className='scoreCircle'>
            {!isLoading && <D3Score data={scoreUser} />}
            {!isLoading && removeSecond()}
            </div>
    </div>
}

export default Score

export function removeSecond() {
    if(document.querySelector(".scoreCircle").lastChild !== null && document.querySelector(".scoreCircle").children.length > 1) {
      document.querySelector(".scoreCircle").lastChild.remove()
    }
  }