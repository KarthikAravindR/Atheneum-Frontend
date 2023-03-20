import React, { useState, useEffect } from 'react'
import { useHistory, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faBookmark as fasolidBookmark, faThumbsUp as fasolidThumbsUp } from '@fortawesome/free-solid-svg-icons'

import classes from './BlogViewHome.module.css'
import * as actions from '../../store/actions/index'
import SkeletonOne from '../../shared/components/Skeleton/SkeletonOne'

const BlogViewHome = props => {
    const { match, loadedblog, onFetchParticularBlog, userid } = props
    useEffect(() => {
        if (match.params.id) {
            onFetchParticularBlog(match.params.id, userid)
        }
    }, [match, userid, onFetchParticularBlog])
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const [shrunk, setShrunk] = useState(false)
    useEffect(() => {
        const handler = () => {
            setShrunk((shrunk) => {
                if (!shrunk && (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300)) {
                    return true
                }
                if (shrunk && document.body.scrollTop < 250 && document.documentElement.scrollTop < 250) {
                    return false
                }
                return shrunk
            })
        }
        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])
    const articleBookmarkHandler = (event, id) => {
        props.onAddBookmark(props.token, props.userid, id)
    }
    const articleLikeHandler = (event, id) => {
        props.onAddLike(props.token, props.userid, id)
    }
    const articleRemoveBookmarkHandler = (event, id) => {
        props.onRemoveBookmark(props.token, props.userid, id)
    }
    const articleRemoveLikeHandler = (event, id) => {
        props.onRemoveLike(props.token, props.userid, id)
    }
    const authorProfileHandler = authorId => {
        props.history.push(`/profile/${authorId}`)
    }
    const history = useHistory()
    let useSplit = history.location.pathname.split('/')
    console.log('History => ', history)
    console.log('useSplit => ', useSplit)
    return (
        <div>
            {props.blogloading ?
                <div className={classes.skeltonLoading}>
                    <SkeletonOne />
                </div> :
                <div className={!props.darkmode ? classes.Container : [classes.Container, classes.Dark].join(' ')}>
                    {props.loadedblog && <div className={classes.blog}>
                        <div className={classes.details}>
                            <div className={classes.authordetails} onClick={() => authorProfileHandler(loadedblog.authorId)}>
                                <div className={classes.authordp}>
                                    <img src={loadedblog.authordp} alt="author" />
                                </div>
                                <p>{loadedblog.authorname}</p>
                            </div>
                            <p>
                                {loadedblog.dateposted} &bull; {Math.round(loadedblog.minread / 3)} min read &bull;
                                {props.isAuthenticated && <span>
                                    {props.isbookmarked
                                        ? <FontAwesomeIcon icon={fasolidBookmark} className={classes.bookmarktrueicon} onClick={(event) => articleRemoveBookmarkHandler(event, loadedblog.id)} />
                                        : <FontAwesomeIcon icon={faBookmark} className={classes.bookmarkfalseicon} onClick={(event) => articleBookmarkHandler(event, loadedblog.id)} />}
                                    &bull;
                                    {props.isliked
                                        ? <FontAwesomeIcon icon={fasolidThumbsUp} className={classes.liketrueicon} onClick={(event) => articleRemoveLikeHandler(event, loadedblog.id)} />
                                        : <FontAwesomeIcon icon={faThumbsUp} className={classes.likefalseicon} onClick={(event) => articleLikeHandler(event, loadedblog.id)} />}
                                </span>}
                                {/* &bull; */}
                                <span className={classes.userlikes}>{loadedblog.likes} Likes</span>
                            </p>
                        </div>
                        <div className={classes.heading}>
                            <p>{loadedblog.blog[0].content}</p>
                        </div>
                        <div className={classes.content}>
                            {props.loadedblog.blog.map(content => {
                                if (content.type === null) {
                                    return <p key={content.content}>{content.content}</p>
                                } else if (content.type === 'img') {
                                    return <img key={content.content.src} src={content.content.src} alt="" />
                                }
                                return null
                            })}
                        </div>
                    </div>}
                    {(props.loadedblog && shrunk) && <div className={classes.fixedAuthorDetails}>
                        <div className={classes.authordetails} onClick={() => authorProfileHandler(loadedblog.authorId)}>
                            <div className={classes.authordp}>
                                <img src={loadedblog.authordp} alt="author" />
                            </div>
                            <p>{loadedblog.authorname}</p>
                        </div>
                        <p>
                            {loadedblog.dateposted} &bull; {Math.round(loadedblog.minread / 3)} min read
                        </p>
                        {props.isAuthenticated && <div className={classes.fixedbuttonicons}>
                            {props.isbookmarked
                                ? <FontAwesomeIcon icon={fasolidBookmark} className={classes.bookmarktrueicon} onClick={(event) => articleRemoveBookmarkHandler(event, loadedblog.id)} />
                                : <FontAwesomeIcon icon={faBookmark} className={classes.bookmarkfalseicon} onClick={(event) => articleBookmarkHandler(event, loadedblog.id)} />}
                            &bull;
                            {props.isliked
                                ? <FontAwesomeIcon icon={fasolidThumbsUp} className={classes.liketrueicon} onClick={(event) => articleRemoveLikeHandler(event, loadedblog.id)} />
                                : <FontAwesomeIcon icon={faThumbsUp} className={classes.likefalseicon} onClick={(event) => articleLikeHandler(event, loadedblog.id)} />}
                            <span className={classes.userlikes1}>{loadedblog.likes} Likes</span>
                        </div>}
                    </div>}
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        loadedblog: state.blog.loadedblog,
        token: state.auth.token,
        userid: state.auth.userid,
        isbookmarked: state.blog.isbookmarked,
        isliked: state.blog.isliked,
        blogloading: state.blog.blogloading,
        darkmode: state.auth.darkmode
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchParticularBlog: (id, userid) => { dispatch(actions.fetchParticularBlog(id, userid)) },
        onAddBookmark: (token, userid, blogid) => dispatch(actions.addBookmark(token, userid, blogid)),
        onAddLike: (token, userid, blogid) => dispatch(actions.addLike(token, userid, blogid)),
        onRemoveBookmark: (token, userid, blogid) => dispatch(actions.removeBookmark(token, userid, blogid)),
        onRemoveLike: (token, userid, blogid) => dispatch(actions.removeLike(token, userid, blogid)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogViewHome))