import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../pages/homepage/HomePage';
import Layout from "../layout/Layout";
import ErrorPage from '../pages/error/ErrorPage';
import GenrePage from "../pages/genrepage/GenrePage";
import GamePage from "../pages/gamepage/GamePage";
import SearchPage from "../pages/searchpage/SearchPage";
import RegisterPage from "../pages/register/RegisterPage";
import LoginPage from "../pages/login/LoginPage";
import AccountPage from "../pages/account/AccountPage";
import ProfilePage from "../pages/profile/ProfilePage";

export function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element= {<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    
                    <Route path="/genres/:genre" element={<GenrePage />} />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/search" element={<SearchPage />} />

                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/profile" element={<ProfilePage />}/>
                    <Route path="/account" element={<AccountPage />}/>
                    <Route path="*" element={<ErrorPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}