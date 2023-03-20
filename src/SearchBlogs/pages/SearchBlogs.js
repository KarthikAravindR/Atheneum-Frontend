import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import classes from "./SearchBlogs.module.css";
import * as actions from "../../store/actions/index";
import Card from "../../shared/components/UIElements/Card";
import SkeletonTwo from "../../shared/components/Skeleton/SkeletonTwo";
import empty from "../../assets/images/empty.png";

const SearchBlogs = (props) => {
  const { match, queriedBlogs, onFetchQueriedBlog } = props;
  React.useEffect(() => {
    if (match.params.query) {
      onFetchQueriedBlog(match.params.query);
    }
  }, [match, onFetchQueriedBlog]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
    <div className={props.darkmode ? [classes.searchContainer, classes.Dark].join(' ') : classes.searchContainer}>
      <div className={classes.searchHeading}>Search Result</div>
      {props.searchloading ? (
        <div className={classes.skeltonLoading}>
          <SkeletonTwo />
        </div>
      ) : (
        <div className={classes.searchSearchAuthorContainer}>
          <div className={classes.searchSearchContainer}>
            {props.queriedBlogs[0] ? (
              <div>
                {queriedBlogs &&
                  queriedBlogs.map((blog) => {
                    return (
                      <div
                        className={classes.searchCardContainer}
                        key={blog.id}
                      >
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
            ) : (
              <div className={classes.searchcontentempty}>
                <img src={empty} alt="empty" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    queriedBlogs: state.blog.queriedBlogs,
    searchloading: state.blog.searchloading,
    isAuthenticated: state.auth.token !== null,
    userid: state.auth.userid,
    darkmode: state.auth.darkmode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchQueriedBlog: (query) => {
      dispatch(actions.fetchQueriedBlog(query));
    },
    onAddBookmark: (userid, blogid) =>
      dispatch(actions.addBookmark(userid, blogid)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBlogs)
);
