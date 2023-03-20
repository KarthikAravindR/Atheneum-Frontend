import React from 'react'
import { connect } from "react-redux";

import './ProfileSkeleton.scss'

const ProfileSkeleton = props => {
    return (
        <div className="profile_Skeleton_Container">        
            <div className={props.darkmode ? "profileSkeleton" : "profileSkeleton light"}></div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        darkmode: state.blog.darkmode,
    };
};

export default connect(mapStateToProps)(ProfileSkeleton)