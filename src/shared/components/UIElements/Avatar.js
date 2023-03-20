import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Avatar.css'

const Avatar = (props) => {
  return (
    <div>
      <div type="button" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
        {props.isAuthenticated ?
          <img src={props.image} alt="dp" /> :
          <img src="https://img.icons8.com/office/80/000000/test-account.png" alt="dp"/>
        }
      </div>
      <div className="dropdown-menu">
        {props.isAuthenticated && <div className="usernamewelcome">
          <p ><strong>{props.username && 'Welcome ' + props.username.split(" ")[0]}</strong></p>
        </div>}
        {props.isAuthenticated && <div className="dropdown-divider"></div>}
        {props.isAuthenticated && <Link className="dropdown-item" to={`/profile/${props.userid}`}>My Profile</Link>}
        {props.isAuthenticated && <div className="dropdown-divider"></div>}
        {props.isAuthenticated && <Link className="dropdown-item" to="/newblog">Write your Story</Link>}
        {props.isAuthenticated && <Link className="dropdown-item" to={`/user/bookmark/${props.userid}`}>My Book</Link>}
        {props.isAuthenticated && <Link className="dropdown-item" to={`/user/like/${props.userid}`}>Liked</Link>}
        {props.isAuthenticated && <div className="dropdown-divider"></div>}
        <Link className="dropdown-item" to="/">Gift cards</Link>
        <Link className="dropdown-item" to="/">Coupons</Link>
        <Link className="dropdown-item" to="/" >Contact Us</Link>
        <div className="dropdown-divider"></div>
        <div className="dropdown-item" onClick={props.onApplyDarkMode}>Toggle {props.darkmode ? "Light mode" : "Dark mode"}</div>
        <div className="dropdown-divider"></div>
        {!props.isAuthenticated ?
          <Link className="dropdown-item" to="/auth" >Log In</Link>
          :
          <Link className="dropdown-item" to="/logout" >Log Out</Link>}
        <div className="dropdown-divider"></div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    userid: state.auth.userid,
    username: state.auth.username,
    token: state.auth.token,
    image: state.auth.image,
    darkmode: state.auth.darkmode,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onApplyDarkMode: () => {dispatch({type: "DARK_MODE"})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar)

