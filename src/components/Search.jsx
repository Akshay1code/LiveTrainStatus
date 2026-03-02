import { useState } from "react";

function Search(){
    let[data,setData]=useState(null)
    function fetchData(){
        let trainNo=document.getElementById("trainNo").value
        let date=document.getElementById("date").value
        date = date.replaceAll("-", "");
        const url = `https://indian-railway-irctc.p.rapidapi.com/api/trains/v1/train/status?departure_date=${date}&isH5=true&client=web&deviceIdentifier=Mozilla%2520Firefox-138.0.0.0&train_number=${trainNo}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '930fbd1d9amshefc38d9360fbcccp1f297ejsnbd5eed21e74c',
                'x-rapidapi-host': 'indian-railway-irctc.p.rapidapi.com',
                'Content-Type': 'application/json',
                'x-rapid-api': 'rapid-api-database'
        }
        };
        fetch(url,options)
            .then(responses=>responses.json())
            .then(data=>showData(data))
            .catch(err=>console.error(err))
        
    }
    function showData(data) {
        setData(data);
    }
    return (
  <>
    <div className="back-container">

      {/* ── Search Form ── */}
      <div className="form-container">
        <input
          id="trainNo"
          className="search-text"
          type="text"
          placeholder="🚆  Enter Train Number"
        />

        <div className="support">
          <label htmlFor="date">Select Journey Date</label>
          <input type="date" id="date" className="search-text" />
        </div>

        <button id="submit-btn" onClick={fetchData}>
          Check Live Status
        </button>
      </div>

      {/* ── Station Data ── */}
      {data && (
        <div className="data-display">

          {/* Header */}
          <div className="display-header">
            <div className="current-badge">
              <span className="badge-dot" />
              LIVE
            </div>
            <h3>Current Station: <span>{data.body.current_station}</span></h3>
            <p className="station-count">{data.body.stations.length} Stations</p>
          </div>

          {/* Station Timeline */}
          <ul className="station-list">
            {data.body.stations.map((station, index) => {
              const isActive = station.stationName === data.body.current_station;
              const arrival   = station.actual_arrival_time   !== "--" ? station.actual_arrival_time   : station.arrivalTime;
              const departure = station.actual_departure_time !== "--" ? station.actual_departure_time : station.departureTime;

              return (
                <li key={index} className={`station-item ${isActive ? "active" : ""}`}>

                  <div className="station-name">
                    {station.stationName}
                    <span className="station-code">({station.stationCode})</span>
                  </div>

                  <div className="station-meta">
                    <span className="meta-pill">📍 {station.distance} km</span>
                    <span className="meta-pill">Day {station.dayCount}</span>
                    <span className="meta-pill time">🕒 {arrival}</span>
                    <span className="meta-pill time">🚉 {departure}</span>
                  </div>

                </li>
              );
            })}
          </ul>

        </div>
      )}

    </div>
  </>
);
        
}
export default Search