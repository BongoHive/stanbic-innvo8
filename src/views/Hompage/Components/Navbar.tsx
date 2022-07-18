import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-scroll';
import Logo from '../../../components/Logo';

function Navbar() {
  return (
    <nav className="nav" id="navbar">
      <div className="nav-content">
        <Logo />
        <ul className="nav-items">
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section1"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Section 1
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section2"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Section 2
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section3"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Section 3
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section4"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Section 4
            </Link>
          </li>
          <li className="nav-item">
            <Link
              activeClass="active"
              to="section5"
              spy
              smooth
              offset={-70}
              duration={500}
            >
              Section 5
            </Link>
          </li>
        </ul>
        <Button
          variant="outlined"
          color="primary"
          sx={{ gap: '2px', marginRight: '10px', marginLeft: '10px' }}
        >
          Sign In
        </Button>
        <Button variant="outlined" color="primary">
          Sign Up
        </Button>
      </div>
    </nav>
  );
}
export default Navbar;
