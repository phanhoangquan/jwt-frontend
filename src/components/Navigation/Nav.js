import './Nav.scss';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
    <div>
        <ul className='mb-0'>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/news">News</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
        </ul>
    </div>  
    );
}

export default Nav;