import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        })
        return () => {
            window.removeEventListener("scroll");
        }
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <h1 className="logo"> <span className="cookie">Cookie</span><span className="watch">Watch</span> </h1>
            <h1 className="right-nav"><span><a href="https://cookiereview.herokuapp.com">Review Cookie Watch</a></span></h1>
        </div>
    )
}

export default Nav
