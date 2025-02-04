import Navbar from "../../components/Navbar.jsx"
import GetUsersAdmin from "../../components/Users_Admin_components/GetUsersAdmin.jsx";
import PostUsersAdmin from "../../components/Users_Admin_components/PostUsersAdmin.jsx";
import PutUsersAdmin from "../../components/Users_Admin_components/PutUsersAdmin.jsx";
import DelUsersAdmin from "../../components/Users_Admin_components/DelUsersAdmin.jsx";

export default function UsersAdmin() {
  
    return(
      <div>

        <Navbar/>

        <GetUsersAdmin/>

        <PostUsersAdmin/>

        <PutUsersAdmin/>

        <DelUsersAdmin/>

      </div>
    );
  }