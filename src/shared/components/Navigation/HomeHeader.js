import React, { } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import './HomeHeader.css'
import Logo from '../UIElements/Logo'
import Search from '../UIElements/Search'
import Avatar from '../UIElements/Avatar'

const HomeHeader = props => {
    const redirectToHomeHandler = () => {
        props.history.push('/')
    }
    const [shrunk, setShrunk] = React.useState(false)
    React.useEffect(() => {
        const handler = () => {
            setShrunk((shrunk) => {
                if (!shrunk && (document.body.scrollTop > 20 ||
                    document.documentElement.scrollTop > 20)) {
                    return true
                }
                if (
                    shrunk &&
                    document.body.scrollTop < 4 &&
                    document.documentElement.scrollTop < 4
                ) {
                    return false;
                }
                return shrunk;
            })
        }
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener("scroll", handler);
    }, [])
    const articleLikeHandler = () => {
        props.history.push('/user/like/' + props.userid)
    }
    const articleBookmarkHandler = () => {
        props.history.push('/user/bookmark/' + props.userid)
    }
    return (
        <div>
            <div className={props.darkmode ? "homeheaderwrapper Dark" :"homeheaderwrapper"} style={shrunk ? { boxShadow: "0 0 10px rgba(0, 0, 0, 0.35)", height: "min-content" } : { boxShadow: "none", height: "100px" }}>
                <div className='homeheaderLogo' onClick={redirectToHomeHandler}>
                    <Logo />
                    <p>Atheneum</p>
                </div>
                <div className="HomeHeader_DesktopSearch">
                    <Search />
                </div>
                <div className="HomeHeader_User_Profile">
                    {props.isAuthenticated && <div className="HomeHeader_User_icon"><FontAwesomeIcon icon={faThumbsUp}  onClick={() => articleLikeHandler(props.userid)} /></div>}
                    {props.isAuthenticated && <div className="HomeHeader_User_icon"><FontAwesomeIcon icon={faBookmark}  onClick={() => articleBookmarkHandler(props.userid)} /></div>}
                    <Avatar />
                </div>
            <div className="HomeHeader_MobileSearch">
                <Search />
            </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        darkmode: state.auth.darkmode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        // onLogout: () => (dispatch({ type: "LOGOUT" })),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader))
