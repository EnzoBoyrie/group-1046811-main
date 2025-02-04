import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Test from "./pages/test.jsx";
import Testbar from "./components/SearchBar.jsx";

import ImageUploaderCards from "./components/Cards_components/UplodeImageCards.jsx";
import ImageUploaderGenerations from "./components/Generations_components/UplodeImageGenerations.jsx";
import ImageUploaderSets from "./components/Sets_components/UplodeImageSets.jsx";


import Home from "./pages/Home/home.jsx";
import Login from "./pages/Profile/login.jsx";
import Register from "./pages/Profile/register.jsx";
import UserProfil from "./pages/Profile/profile.jsx";
import EasterEgg from "./pages/easter-egg.jsx";


import UsersAdmin from "./pages/Users/users_Admin.jsx";
import GetUsersAdmin from "./components/Users_Admin_components/GetUsersAdmin.jsx";
import PostUsersAdmin from "./components/Users_Admin_components/PostUsersAdmin.jsx";
import PutUsersAdmin from "./components/Users_Admin_components/PutUsersAdmin.jsx";
import DelUsersAdmin from "./components/Users_Admin_components/DelUsersAdmin.jsx";

import Users from "./pages/Users/users.jsx";
import GetUsers from "./components/Users_components/GetUsers.jsx";
import PostUsers from "./components/Users_components/PostUsers.jsx";
import PutUsers from "./components/Users_components/PutUsers.jsx";
import DelUsers from "./components/Users_components/DelUsers.jsx";

import Sets from "./pages/Sets/sets.jsx";
import GetSets from "./components/Sets_components/GetSets.jsx";
import PostSets from "./components/Sets_components/PostSets.jsx";
import PutSets from "./components/Sets_components/PutSets.jsx";
import DelSets from "./components/Sets_components/DelSets.jsx";


import Generations from "./pages/Generations/generations.jsx";
import GenerationsById from "./pages/Generations/generationById.jsx";
import GetGenerations from "./components/Generations_components/GetGenerations.jsx";
import PostGenerations from "./components/Generations_components/PostGenerations.jsx";
import PutGenerations from "./components/Generations_components/PutGenerations.jsx";
import DelGenerations from "./components/Generations_components/DelGenerations.jsx";



import Cards from "./pages/Cards/cards.jsx";
import CardById from "./pages/Cards/cards.jsx";
import GetCards from "./components/Cards_components/GetCards.jsx";
import PostCards from "./components/Cards_components/PostCards.jsx";
import PutCards from "./components/Cards_components/PutCards.jsx";
import DelCards from "./components/Cards_components/DelCards.jsx";

import Purchase from "./pages/Purchase/purchase.jsx";
import GetPurchaseUser from "./components/Purchase_components/GetPurchaseUser.jsx";
import GetPurchaseAdmin from "./components/Purchase_components/GetPurchaseAdmin.jsx";
import PostPurchase from "./components/Purchase_components/PostPurchase.jsx";
import Cart from "./pages/Purchase/purchase.jsx";



import History from "./pages/history.jsx";

import AdminDashboard from "./pages/Profile/AdminDashBoard.jsx";



function App() {
  return (


    <Router>
      <Routes>

        <Route path="/Test" element={<Test />} />
        <Route path="/Bar" element={<Testbar />} />

        <Route path="/imageUploaderCards" element={<ImageUploaderCards />} />
        <Route path="/imageUploaderGenerations" element={<ImageUploaderGenerations />} />
        <Route path="/imageUploaderSets" element={<ImageUploaderSets />} />
        <Route path="/LE_FERDETER_DE_JUAN" element={<EasterEgg />} />


        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<UserProfil />} />


        <Route path="/purchase" element={<Purchase />} />
        <Route path="/getPurchaseUser" element={<GetPurchaseUser />} />
        <Route path="/getPurchaseAdmin" element={<GetPurchaseAdmin />} />
        <Route path="/postPurchase" element={<PostPurchase />} />
    

        <Route path="/users/admin" element={<UsersAdmin />} />
        <Route path="/admin/getUsersAdmin" element={<GetUsersAdmin />} />
        <Route path="/admin/postUsersAdmin" element={<PostUsersAdmin />} />
        <Route path="/admin/putUsersAdmin" element={<PutUsersAdmin />} />
        <Route path="/admin/delUsersAdmin" element={<DelUsersAdmin />} />

        <Route path="/users" element={<Users />} />
        <Route path="/getUsers" element={<GetUsers />} />
        <Route path="/postUsers" element={<PostUsers />} />
        <Route path="/putUsers" element={<PutUsers />} />
        <Route path="/delUsers" element={<DelUsers />} />

        <Route path="/cards" element={<Cards />} />
        <Route path="/card/:id" element={<CardById />} />
        <Route path="/getCards" element={<GetCards />} />
        <Route path="/postCards" element={<PostCards />} />
        <Route path="/putCards" element={<PutCards />} />
        <Route path="/delCards" element={<DelCards />} />

        <Route path="/generations" element={<Generations />} />
        <Route path="/generations/:id" element={<GenerationsById />} />
        <Route path="/getGenerations" element={<GetGenerations />} />
        <Route path="/postGenerations" element={<PostGenerations />} />
        <Route path="/putGenerations" element={<PutGenerations />} />
        <Route path="/delGenerations" element={<DelGenerations />} />


        <Route path="/sets/:id" element={<Sets />} />
        <Route path="/getSets" element={<GetSets />} />
        <Route path="/postSets" element={<PostSets />} />
        <Route path="/putSets" element={<PutSets />} />
        <Route path="/delSets" element={<DelSets />} />


        <Route path="/history" element={<History />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/dashboard" element={<AdminDashboard />} />


      </Routes>
    </Router>

  );
}

export default App;