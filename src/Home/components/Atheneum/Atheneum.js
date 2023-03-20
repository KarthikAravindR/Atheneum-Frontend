import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import classes from './Atheneum.module.css'
import * as actions from '../../../store/actions/index'
import BannerCard from '../../../shared/components/UIElements/BannerCard'
import Card from '../../../shared/components/UIElements/Card'

const Atheneum = (props) => {
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
            <div className={!props.darkmode ? classes.OgleBanner : [classes.OgleBanner, classes.Dark].join(' ')}>
            <div className={classes.OgleBannerMain}>
                <BannerCard
                    id={props.bannerblog.id}
                    title={props.bannerblog.title}
                    authorname={props.bannerblog.authorname}
                    authordp={props.bannerblog.authordp}
                    authorId={props.bannerblog.authorId}
                    bannerimage={props.bannerblog.bannerimage}
                    minread={props.bannerblog.minread}
                    dateposted={props.bannerblog.dateposted}
                    darkmode={props.darkmode}
                    articleClicked={articleClickedHandler}
                    authorClicked={authorClickedHandler}
                    articleBookmarkHandler={articleBookmarkHandler} />
            </div>
            <div className={classes.OgleBannercards}>
                {props.lastfourcards.map(blog => {
                    return (
                        <Card
                            key={blog.id}
                            id={blog.id}
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
                    )
                })}
            </div>
            </div>
    )
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        userid: state.auth.userid,
        homepageloading: state.blog.homepageloading,
        darkmode: state.auth.darkmode,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddBookmark: (userid, blogid) => dispatch(actions.addBookmark(userid, blogid)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Atheneum))