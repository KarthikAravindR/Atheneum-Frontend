import React from "react";
import { withRouter } from "react-router";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBinoculars } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";

import classes from "./MostViewed.module.css";
import * as actions from "../../../store/actions/index";
import Card from "../../../shared/components/UIElements/Card";

const MostViewed = (props) => {
  const { onFetchAllBlogs } = props;
  React.useEffect(() => {
    onFetchAllBlogs();
  }, [onFetchAllBlogs]);
  let mostViewedblogs = [...props.blogs, ...props.remblogs];
  mostViewedblogs.sort((a, b) => {
    return b.views - a.views;
  });
  mostViewedblogs = mostViewedblogs.slice(0, 6);
  const articleClickedHandler = (id) => {
    props.history.push(`/blogview/${id}`);
  };
  const articleBookmarkHandler = (event, id) => {
    event.stopPropagation();
    props.onAddBookmark(props.userid, id);
  };
  const authorClickedHandler = (event, id) => {
    event.stopPropagation();
    props.history.push(`/profile/${id}`);
  };
  return (
    <div
      className={
        !props.darkmode
          ? classes.MostViewedContainer
          : [classes.MostViewedContainer, classes.Dark].join(" ")
      }
    >
      <div className={classes.MostViewedContainerTitle}>
        {/* <FontAwesomeIcon icon={faBinoculars} style={{ fontSize: "1.85rem", marginRight: "10px" }} /> */}
        <img
          src="https://img.icons8.com/office/80/000000/binoculars.png"
          alt="bino"
        />
        <h3>Most Viewed</h3>
      </div>
      <div className={classes.MostViewedArticleAuthorContainer}>
        <div className={classes.MostViewedArticleContainer}>
          {mostViewedblogs &&
            mostViewedblogs.map((blog) => {
              return (
                <div className={classes.ArticleContainer} key={blog.id}>
                  <div className={classes.ArticleContainerNumber}>
                    {mostViewedblogs.indexOf(blog) + 1}
                  </div>
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
                    articleClicked={articleClickedHandler}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    userid: state.auth.userid,
    darkmode: state.auth.darkmode,
    blogs: state.blog.blogs,
    remblogs: state.blog.remblogs,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAllBlogs: () => dispatch(actions.fetchAllBlogs()),
    onAddBookmark: (userid, blogid) =>
      dispatch(actions.addBookmark(userid, blogid)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MostViewed)
);
