import { useState } from "react";

function Search(){
    let[data,setData]=useState(null)
    function fetchData(){
        let trainNo=document.getElementById("trainNo").value
        let date=document.getElementById("date").value
        date = date.replaceAll("-", "");
        const handleSearch = async () => {
        try {
          const response = await fetch(
            `/api/train?date=${date}&trainNo=${trainNo}`
          );

          const data = await response.json();
          showData(data);

        } catch (error) {
          console.error(error);
        }
      };
      handleSearch();
        
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