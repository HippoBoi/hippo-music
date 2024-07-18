import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

function Layout() {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
}

export default Layout;