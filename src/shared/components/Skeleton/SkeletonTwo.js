import React from "react";
import { connect } from "react-redux";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./SkeletonTwo.scss";

const SkeletonTwo = (props) => {
  return (
    <div>
      <div className={props.darkmode ? "skeleton2" : "skeleton2 light"} ></div>
      <div className={props.darkmode ? "skeleton2" : "skeleton2 light"} ></div>
      <div className={props.darkmode ? "skeleton2" : "skeleton2 light"} ></div>
      <div className={props.darkmode ? "skeleton2" : "skeleton2 light"} ></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    darkmode: state.blog.darkmode,
  };
};

export default connect(mapStateToProps)(SkeletonTwo);
