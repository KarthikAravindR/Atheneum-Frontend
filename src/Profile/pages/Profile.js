import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import classes from './Profile.module.css'
import * as actions from '../../store/actions/index'
import ProfilePictureUpload from '../../shared/components/FormElements/ProfilePicture'
import UserBlogs from '../components/UserBlogs/UserBlogs'
import ProfileSkeleton from '../../shared/components/Skeleton/ProfileSkeleton'

const Profile = props => {
    const { match, onFetchAllUserInfo } = props
    React.useEffect(() => {
        if (match.params.id) {
            onFetchAllUserInfo(match.params.id)
        }
    }, [match, onFetchAllUserInfo])
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    const [profession, setProfession] = useState('')
    const [bio, setBio] = useState('')

    const updateprofessionstate = e => {
        setProfession(e.target.value)
    }
    const updatebiostate = e => {
        setBio(e.target.value)
    }
    const updateprofessionclickHandler = () => {
        props.onupdateuserprofessionHandler(props.token, profession, props.userid)
    }
    const updatebioclickHandler = () => {
        props.onupdateuserbioHandler(props.token, bio, props.userid)
    }
    const changeProfessionHandler = () => {
        setProfession(props.userProfession)
        props.onremoveProfession()
    }
    const changeBioHandler = () => {
        setBio(props.userBio)
        props.onremoveBio()
    }
    const newimageHandler = (image) => {
        props.onupdateuserImageHandler(props.token, image.src, props.userid)
    }
    return (
        <div className={classes.searchContainer}>
            {props.Profileloading ?
                <div className={classes.skeltonLoading}>
                    <ProfileSkeleton />
                </div> :
                <div className={props.darkmode ? [classes.profileContainer, classes.Dark].join(' ') : classes.profileContainer }>
                    <div className={classes.profilePerson}>
                        <div className={classes.profilePicture}><img src={props.image} alt="dp" /></div>
                        {(match.params.id === props.userid) && <ProfilePictureUpload uploadimage={newimageHandler} />}
                    </div>
                    <p className={classes.profileUsername}>{props.username}</p>
                    {props.userProfession
                        ? <div className={classes.profileuserProfession}>
                            <p className={classes.profileProfession}>{props.userProfession}</p>
                            {(match.params.id === props.userid) &&
                                <button onClick={changeProfessionHandler}><FontAwesomeIcon icon={faEdit} /><span className={classes.tooltiptextone}>Edit Profession</span></button>}
                        </div>
                        : match.params.id === props.userid && <div className={classes.profileEditProfession}>
                            <input placeholder="Add your Profession" onChange={updateprofessionstate} value={profession} />
                            <button onClick={updateprofessionclickHandler}>save</button>
                        </div>}
                    {props.userBio
                        ? <div className={classes.profileuserBio}>
                            <p className={classes.profileBio}>{props.userBio}
                                {(match.params.id === props.userid) && <button onClick={changeBioHandler}><FontAwesomeIcon icon={faEdit} /><span className={classes.tooltiptexttwo}>Edit Bio</span></button>}</p>
                        </div>
                        : match.params.id === props.userid && <div className={classes.profileEditBio}>
                            <p>Bio</p>
                            <input placeholder="Add your Bio" onChange={updatebiostate} value={bio} />
                            <button onClick={updatebioclickHandler}>save</button>
                        </div>}
                    <UserBlogs />
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        userid: state.auth.userid,
        Profileloading: state.auth.Profileloading,
        username: state.auth.Profileusername,
        image: state.auth.Profileimage,
        userProfession: state.auth.profession,
        userBlogs: state.auth.ProfileuserBlogs,
        userBio: state.auth.bio,
        darkmode: state.auth.darkmode
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchAllUserInfo: (id) => dispatch(actions.fetchAllUserInfo(id)),
        onupdateuserprofessionHandler: (token, profession, userid) => dispatch(actions.updateuserprofession(token, profession, userid)),
        onupdateuserbioHandler: (token, bio, userid) => dispatch(actions.updateuserbio(token, bio, userid)),
        onupdateuserImageHandler: (token, image, userid) => dispatch(actions.updateuserimage(token, image, userid)),
        onremoveProfession: () => dispatch({ type: 'REMOVE_USER_PROFESSION' }),
        onremoveBio: () => dispatch({ type: 'REMOVE_USER_BIO' }),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))