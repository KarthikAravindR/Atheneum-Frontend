import React from "react";
import { connect } from "react-redux";

import "./Home.css";
import * as actions from "../../store/actions/index";
import Atheneum from "../components/Atheneum/Atheneum";
import MostViewed from "../components/MostViewed/MostViewed";
import Articles from "../components/Articles/Articles";
import SkeletonOne from "../../shared/components/Skeleton/SkeletonOne";
import SkeletonTwo from "../../shared/components/Skeleton/SkeletonTwo";

const Home = (props) => {
  const { onFetchLatestBlogs, onClearState } = props;
  React.useEffect(() => {
    onFetchLatestBlogs();
  }, [onFetchLatestBlogs]);
  React.useEffect(() => {
    window.scrollTo(0, 0);
    return () => {onClearState()}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const allblogs = [...props.blogs];
  let bannerblog = allblogs.pop();
  let lastfourcards = allblogs.splice(-4).reverse();
  return (
    <div>
      {props.homepageloading ? (
        <div className="skeleton_container">
          <div className="skeleton_container_one">
            <SkeletonOne />
          </div>
          <div className="skeleton_container_two">
            <SkeletonTwo />
          </div>
        </div>
      ) : (
        <div>
          {props.blogs[0] && (
            <div
              className={
                props.darkmode ? "HomeContainer Dark" : "HomeContainer"
              }
            >
              <Atheneum bannerblog={bannerblog} lastfourcards={lastfourcards} />
              {props.firstloaddone && <MostViewed />}
              {props.firstloaddone && <Articles />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    blogs: state.blog.blogs,
    remblogs: state.blog.remblogs,
    firstloaddone: state.blog.firstloaddone,
    homepageloading: state.blog.homepageloading,
    darkmode: state.auth.darkmode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchLatestBlogs: () => dispatch(actions.fetchLatestBlogs()),
    onClearState: () => dispatch({type: "CLEAR_STATE"}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
