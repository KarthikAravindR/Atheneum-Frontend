import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import classes from './Articles.module.css'
import * as actions from '../../../store/actions/index'
import Card from '../../../shared/components/UIElements/Card'


const Articles = (props) => {
    const articleClickedHandler = id => {
        props.history.push(`/blogview/${id}`)
    }
    const articleBookmarkHandler = (event, id) => {
        event.stopPropagation()
        props.onAddBookmark(props.userid,id)
    }
    const authorClickedHandler = (event, id) => {
        event.stopPropagation()
        props.history.push(`/profile/${id}`)
    }
    return (
        <div className={classes.articleContainer}>
            <div className={classes.articleArticleAuthorContainer}>
                <div className={classes.articleArticleContainer}>
                    {props.blogs[0] && props.blogs.map(blog => {
                        return (
                            <div className={classes.ArticleContainer} key={blog.id}>
                                <Card
                                    id={blog.id}
                                    title={blog.title}
                                    authorname={blog.authorname}
                                    authordp={blog.authordp}
                                    authorId={blog.authorId}
                                    bannerimage={blog.bannerimage}
                                    minread={blog.minread}
                                    dateposted={blog.dateposted}
                                    darkmode={props.darkmode}
                                    articleBookmarkHandler={articleBookmarkHandler}
                                    authorClicked={authorClickedHandler}
                                    articleClicked={articleClickedHandler} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        darkmode: state.auth.darkmode,
        blogs: state.blog.remblogs,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddBookmark: (userid, blogid) => dispatch(actions.addBookmark(userid, blogid)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Articles))