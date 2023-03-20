import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import classes from './UserBlogs.module.css'
import Card from '../../../shared/components/UIElements/Card'
import Modal from '../../../shared/components/UIElements/Modal'
import empty from '../../../assets/images/empty.png'

const UserBlogs = props => {
    const articleClickedHandler = id => {
        props.history.push(`/blogview/${id}`)
    }
    const articleBookmarkHandler = (event, id) => {
        event.stopPropagation()
        props.onAddBookmark(props.userid, id)
    }
    const authorClickedHandler = (event, id) => {
        event.stopPropagation()
        props.history.push(`/profile/${id}`)
    }
    const deleteBlogHandler = (event, id, title) => {
        event.stopPropagation()
        console.log(id, title)
        props.onModalShow(id, title)
    }
    const modalclosehandler = () => {
        props.onModalClose()
    }
    
    return (
        <div className={props.darkmode ? [classes.userBlogContainer, classes.Dark].join(' ') : classes.userBlogContainer}>
            <div className={classes.userBlogAuthorContainer}>
                <div className={classes.userBlogHeading}>STORIES</div>
                <div className={classes.userBlogimageContainer}>
                    <div className={classes.userBookmarksimageContainer}>
                        {props.userBlogs[0] ?
                            <div>
                                {props.userBlogs && props.userBlogs.reverse().map(blog => {
                                    return (
                                        <div className={classes.userBlogCardContainer} key={blog._id}>
                                            {(props.match.params.id === props.userid) &&
                                                <button onClick={(event) => deleteBlogHandler(event, blog._id, blog.title)}><FontAwesomeIcon icon={faTrash} /></button>
                                            }
                                            <Card
                                                id={blog._id}
                                                title={blog.title}
                                                authorname={blog.authorname}
                                                authordp={blog.authordp}
                                                authorId={blog.authorId}
                                                bannerimage={blog.bannerimage}
                                                minread={blog.minread}
                                                dateposted={blog.dateposted}
                                                darkmode={props.darkmode}
                                                articleClicked={articleClickedHandler}
                                                authorClicked={authorClickedHandler}
                                                articleBookmarkHandler={articleBookmarkHandler} />
                                            <Modal
                                                show={props.modalShow}
                                                modalblogid={props.modalblogid}
                                                modalblogtitle={props.modalblogtitle}
                                                content="DELETE"
                                                modalclosed={modalclosehandler} />
                                        </div>
                                    )
                                })}</div> :
                            <div className={classes.userblogscontentempty}>
                                <img src={empty} alt="empty" />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        userBlogs: state.auth.ProfileuserBlogs,
        darkmode: state.auth.darkmode,
        modalShow: state.auth.modalShow,
        modalblogid: state.auth.modalblogid,
        modalblogtitle: state.auth.modalblogtitle,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onModalShow: (id, title) => { dispatch({ type: "MODAL_SHOW", id: id, title: title }) },
        onModalClose: () => { dispatch({ type: "MODAL_CLOSE" }) },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserBlogs))
