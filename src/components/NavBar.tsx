import hippo from "../assets/images/hippoBig.webp";
import "./Navbar.css";

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-text">Hippo-Music</div>

            <img className="hippo-icon" src={hippo} />
        </div>
    );
}

export default NavBar
