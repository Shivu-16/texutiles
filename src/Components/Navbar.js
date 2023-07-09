import React from 'react'
import PropTypes from 'prop-types'

export default function Navbar(props) {

  return (
    <>
        <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} border-bottom border-bottom-dark `}  >
        <div className="container-fluid">
            <a className="navbar-brand " href="/">Textutiles</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">{props.Home}</a>
                </li>
                    <li className="nav-item">
                    <a className="nav-link disabled" href="/">{props.About}</a>
                </li>
                <button type="button" className={`btn btn-${props.mode==='light' ?'dark':'light'}`} onClick={props.toggleMode}> {`Enable ${props.mode === 'dark' ? 'light' : 'dark'} Mode`} </button>
            </ul>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            </div>
        </div>
        </nav>
    </>
  )
}

Navbar.propTypes={  //shows warning in console because we given a string value 
    Home: PropTypes.string.isRequired ,
    About : PropTypes.string.isRequired
}

Navbar.defaultProps = {
    Home : "Home" ,
    About : "About"
}

