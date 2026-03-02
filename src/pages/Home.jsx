import { useNavigate } from "react-router-dom"
import Search from "../components/Search";
function Home(){
    const navigate=useNavigate();
    return<>
    <div className="support">
        <button id="btn" onClick={()=>navigate("/")}>Back </button>
        <Search/>
    </div>
    </>
}
export default Home