import { Outlet } from "react-router";
import Header from '../components/Header';
import Footer from '../components/Footer'
import GenresDropdown from "../components/GenresDropdown";
import Searchbar from "../components/Searchbar";

export default function Layout() {
    return (
        <div className="style-layout-system">
            <Header />
            <GenresDropdown />
            <div className="style-main-content">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}