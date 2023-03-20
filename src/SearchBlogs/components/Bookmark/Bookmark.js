import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import classes from './Bookmark.module.css'
import * as actions from '../../../store/actions/index'
import Card from '../../../shared/components/UIElements/Card'
import SkeletonTwo from '../../../shared/components/Skeleton/SkeletonTwo'
import empty from '../../../assets/images/empty.png'

const Bookmark = props => {
    const { onFetchUserBookmark, userid, token } = props
    useEffect(() => {
        onFetchUserBookmark(userid, token)
    }, [onFetchUserBookmark, userid, token])
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
    return (
        <div className={props.darkmode ? [classes.userBookmarksContainer, classes.Dark].join(' ') : classes.userBookmarksContainer}>
            <div className={classes.userBookmarksAuthorContainer}>
                <div className={classes.userBookmarksHeading}>Bookmarks</div>
                {props.loading ?
                    <div className={classes.skeltonLoading}>
                        <SkeletonTwo />
                    </div> :
                    <div className={classes.userBookmarksimageContainer}>
                        {props.userBookmarks[0] ?
                            <div>
                                {props.userBookmarks && props.userBookmarks.map(blog => {
                                    return (
                                        <div className={classes.userBookmarksCardContainer} key={blog.id}>
                                            <Card
                                                id={blog.id}
                                                title={blog.title}
                                                authorname={blog.authorname}
                                                authorId={blog.authorId}
                                                authordp={blog.authordp}
                                                bannerimage={blog.bannerimage}
                                                minread={blog.minread}
                                                dateposted={blog.dateposted}
                                                darkmode={props.darkmode}
                                                articleClicked={articleClickedHandler}
                                                authorClicked={authorClickedHandler}
                                                articleBookmarkHandler={articleBookmarkHandler} />
                                        </div>
                                    )
                                })}</div> :
                            <div className={classes.bookmarkcontentempty}>
                                <img src={empty} alt="empty" />
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}


const mapStatetoProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        loading: state.auth.bookmarkloading,
        userid: state.auth.userid,
        userBookmarks: state.auth.userBookmarks,
        darkmode: state.auth.darkmode
    }
}

const mapDisptachtoState = dispatch => {
    return {
        onFetchUserBookmark: (userid, token) => dispatch(actions.fetchUserBookmark(userid, token))
    }
}

export default withRouter(connect(mapStatetoProps, mapDisptachtoState)(Bookmark))