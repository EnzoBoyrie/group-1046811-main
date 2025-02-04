import Navbar from "../../components/Navbar.jsx"
import GetUsers from "../../components/Users_components/GetUsers.jsx";
import PostUsers from "../../components/Users_components/PostUsers.jsx";
import PutUsers from "../../components/Users_components/PutUsers.jsx";
import DelUsers from "../../components/Users_components/DelUsers.jsx";


export default function Users() {
  
    return(
      <div>

        <Navbar/>

        <GetUsers/>

        <PostUsers/>

        <PutUsers/>

        <DelUsers/>

       
        
      </div>
    );
  }