import React from "react";
import { connect } from "react-redux";

import "./SkeletonOne.scss";

const SkeletonOne = (props) => {
  return <div className={props.darkmode ? "skeleton1" : "skeleton1 light"} ></div>;
};

const mapStateToProps = (state) => {
  return {
    darkmode: state.blog.darkmode,
  };
};

export default connect(mapStateToProps)(SkeletonOne);
