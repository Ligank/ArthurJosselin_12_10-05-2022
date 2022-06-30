import React, { useState, useEffect } from "react";
import {fetchPerformance} from "../service/getData";
import D3Performance from './D3/D3Performance';
import '../styles/Performance.css';

function Performance() {

    const [performance, setPerformance] = useState([])
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceUser()
  }, [])

  async function fetchPerformanceUser () {
    const info = await fetchPerformance('performance')
    setPerformance(info)
    setIsLoading(false);
  }
    return <div className="performance">
        {!isLoading && <D3Performance data={performance} />}
        {!isLoading && removeSecond2()}
            
    </div>
}

export default Performance

export function removeSecond2() {
    if(document.querySelector(".performance").lastChild !== null && document.querySelector(".performance").children.length > 1) {
      document.querySelector(".performance").lastChild.remove()
    }
  }