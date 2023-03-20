import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import classes from "./Like.module.css";
import * as actions from "../../../store/actions/index";
import Card from "../../../shared/components/UIElements/Card";
import SkeletonTwo from "../../../shared/components/Skeleton/SkeletonTwo";
import empty from "../../../assets/images/empty.png";

const Like = (props) => {
  const { onFetchUserLike, userid, token } = props;
  useEffect(() => {
    onFetchUserLike(userid, token);
  }, [onFetchUserLike, userid, token]);
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
    <div
      className={
        props.darkmode
          ? [classes.userLikesContainer, classes.Dark].join(" ")
          : classes.userLikesContainer
      }
    >
      <div className={classes.userLikesAuthorContainer}>
        <div className={classes.userLikesHeading}>Liked</div>
        {props.likeloading ? (
          <div className={classes.skeltonLoading}>
            <SkeletonTwo />
          </div>
        ) : (
          <div className={classes.userLikesimageContainer}>
            {props.userLikes[0] ? (
              <div>
                {props.userLikes &&
                  props.userLikes.map((blog) => {
                    return (
                      <div
                        className={classes.userLikesCardContainer}
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
                          articleClicked={articleClickedHandler}
                          authorClicked={authorClickedHandler}
                          articleBookmarkHandler={articleBookmarkHandler}
                        />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className={classes.likecontentempty}>
                <img src={empty} alt="empty" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    token: state.auth.token,
    likeloading: state.auth.likeloading,
    userid: state.auth.userid,
    userLikes: state.auth.userLikes,
    darkmode: state.auth.darkmode,
  };
};

const mapDisptachtoState = (dispatch) => {
  return {
    onFetchUserLike: (userid, token) =>
      dispatch(actions.fetchUserLike(userid, token)),
  };
};

export default withRouter(connect(mapStatetoProps, mapDisptachtoState)(Like));
