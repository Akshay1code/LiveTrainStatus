const features = [
  {
    title: "Live Train Status",
    description: "Tracks the current position of the train from source to destination."
  },
  {
    title: "Time Table",
    description: "Detailed timetables of trains."
  },
  {
    title: "Full Route Information",
    description: "Description of the current position of the train."
  },
  {
    title: "Little Bit Prediction",
    description: "And much more."
  }
];
import { useNavigate } from "react-router-dom";
import "../App.css"
function Welcome(){
    const navigate=useNavigate();
    return <>
        <h1 id="title"><img id="logo" src="https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Indian_Railways.svg/1280px-Indian_Railways.svg.png" alt="WOW" />Welcome to Indian Train Live Train Running Status</h1>
        <div className="details-container">
        {features.map(
            (feature,i)=>{
                return <div className="details-card" key={i}>
                            <h1>{feature.title}</h1>
                            <br/>
                            <h3>{feature.description}</h3>
                        </div>
            }
        )}
        </div>
        <button id="btn" onClick={()=>navigate("/home")}>Check Live Status</button>
    </>
}
export default Welcome