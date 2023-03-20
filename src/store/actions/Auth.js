import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (userId, token, image, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        userId: userId,
        token: token,
        image: image,
        username: username,
    }
}
export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}
export const clearall = () => {
    return {
        type: "CLEAR_ALL",
    }
}
export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const authTimeOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
            dispatch(clearall())
        }, expirationTime * 1000)
    }
}
export const auth = (email, password, isSignup, username) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/signup'
        let authData = {
            username: username,
            email: email,
            password: password,
        }
        if (!isSignup) {
            url = process.env.REACT_APP_BACKEND_URL + '/auth/login'
            authData = {
                email: email,
                password: password,
            }
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('image', response.data.image)
                localStorage.setItem('username', response.data.username)
                dispatch(authSuccess(response.data.userId, response.data.token, response.data.image, response.data.username))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}
export const authCheckState = () => {
    const token = localStorage.getItem('token')
    const localId = localStorage.getItem('userId')
    const image = localStorage.getItem('image')
    const username = localStorage.getItem('username')
    return dispatch => {
        if (token === null) {
            dispatch(logout())
            dispatch(clearall())
        } else {
            dispatch(authSuccess(localId, token, image, username))
        }
    }
}
export const googleauth = (response) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/googlelogin'
        let authData = {
            tokenId: response.tokenId
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('image', response.data.image)
                localStorage.setItem('username', response.data.username)
                dispatch(authSuccess(response.data.userId, response.data.token, response.data.image, response.data.username))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}
export const facebookauth = (response) => {
    return dispatch => {
        dispatch(authStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/auth/facebooklogin'
        let authData = {
            userId: response.userID,
            accessToken: response.accessToken
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('userId', response.data.userId)
                localStorage.setItem('image', response.data.image)
                localStorage.setItem('username', response.data.username)
                dispatch(authSuccess(response.data.userId, response.data.token, response.data.image, response.data.username))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.message))
            })
    }
}


export const updateuserprofessionstart = () => {
    return {
        type: actionTypes.UPDATE_USER_PROFESSION_START
    }
}
export const updateuserprofessionsuccess = data => {
    return {
        type: actionTypes.UPDATE_USER_PROFESSION_SUCCESS,
        data: data
    }
}
export const updateuserprofessionfailed = error => {
    return {
        type: actionTypes.UPDATE_USER_PROFESSION_FAILED,
        error: error
    }
}
export const updateuserprofession = (token, profession, userid) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    let data = {
        profession,
        userid
    }
    console.log(token, profession, userid)
    return dispatch => {
        dispatch(updateuserprofessionstart)
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/profile/profession`, data, config)
            .then(response => {
                dispatch(updateuserprofessionsuccess(response.data.user.profession))
            })
            .catch(error => dispatch(updateuserprofessionfailed(error)))
    }
}


export const updateuserbiostart = () => {
    return {
        type: actionTypes.UPDATE_USER_BIO_START
    }
}
export const updateuserbiosuccess = data => {
    return {
        type: actionTypes.UPDATE_USER_BIO_SUCCESS,
        data: data
    }
}
export const updateuserbiofailed = error => {
    return {
        type: actionTypes.UPDATE_USER_BIO_FAILED,
        error: error
    }
}
export const updateuserbio = (token, bio, userid) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    let data = {
        bio,
        userid
    }
    return dispatch => {
        dispatch(updateuserbiostart)
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/profile/bio`, data, config)
            .then(response => {
                dispatch(updateuserbiosuccess(response.data.user.bio))
            })
            .catch(error => dispatch(updateuserbiofailed(error)))
    }
}


export const updateuserimagestart = () => {
    return {
        type: actionTypes.UPDATE_USER_IMAGE_START
    }
}
export const updateuserimagesuccess = data => {
    return {
        type: actionTypes.UPDATE_USER_IMAGE_SUCCESS,
        data: data
    }
}
export const updateuserimagefailed = error => {
    return {
        type: actionTypes.UPDATE_USER_IMAGE_FAILED,
        error: error
    }
}
export const updateuserimage = (token, image, userid) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    let data = {
        image,
        userid
    }
    return dispatch => {
        dispatch(updateuserimagestart())
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/profile/picture`, data, config)
            .then(response => {
                // localStorage.setItem('image', response.data.user.image)
                dispatch(updateuserimagesuccess(response.data.user.image))
            })
            .catch(error => dispatch(updateuserimagefailed(error)))
    }
}


export const fetchAllUserInfoStart = () => {
    return {
        type: actionTypes.FETCH_USER_INFO_START,
    }
}
export const fetchAllUserInfoSuccess = (email,image,username, profession,bio,views,blogs,) => {
    return {
        type: actionTypes.FETCH_USER_INFO_SUCCESS,
        email, 
        image, 
        username, 
        profession, 
        bio,
        views,
        blogs,
    }
}
export const fetchAllUserInfoFailed = error => {
    return {
        type: actionTypes.FETCH_USER_INFO_FAILED,
        error: error
    }
}
export const fetchAllUserInfo = (id) => {
    return dispatch => {
        dispatch(fetchAllUserInfoStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/profile/' + id
        axios.get(url)
            .then(response => {
                    dispatch(fetchAllUserInfoSuccess(
                        response.data.email, 
                        response.data.image, 
                        response.data.username, 
                        response.data.profession, 
                        response.data.bio,
                        response.data.views,
                        response.data.blogs,
                        // response.data.liked,
                        // response.data.bookmarks
                        ))
            })
            .catch(error => {
                dispatch(fetchAllUserInfoFailed(error))
            })
    }
}

export const fetchUserBookmarkStart = () => {
    return {
        type: actionTypes.FETCH_USER_BOOKMARK_START,
    }
}
export const fetchUserBookmarkSuccess = (userBookmarks) => {
    return {
        type: actionTypes.FETCH_USER_BOOKMARK_SUCCESS,
        userBookmarks: userBookmarks
    }
}
export const fetchUserBookmarkFailed = error => {
    return {
        type: actionTypes.FETCH_USER_BOOKMARK_FAILED,
        error: error
    }
}
export const fetchUserBookmark = (userid, token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(fetchUserBookmarkStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/user/bookmark/' + userid
        axios.get(url,config)
            .then(response => {
                dispatch(fetchUserBookmarkSuccess(response.data.userBookmarks))
            })
            .catch(error => {
                dispatch(fetchUserBookmarkFailed(error))
            })
    }
}


export const fetchUserLikeStart = () => {
    return {
        type: actionTypes.FETCH_USER_LIKED_START,
    }
}
export const fetchUserLikeSuccess = (userLikes) => {
    return {
        type: actionTypes.FETCH_USER_LIKED_SUCCESS,
        userLikes: userLikes
    }
}
export const fetchUserLikeFailed = error => {
    return {
        type: actionTypes.FETCH_USER_LIKED_FAILED,
        error: error
    }
}
export const fetchUserLike = (userid, token) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(fetchUserLikeStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/user/like/' + userid
        axios.get(url,config)
            .then(response => {
                    dispatch(fetchUserLikeSuccess(response.data.userLikes))
            })
            .catch(error => {
                dispatch(fetchUserLikeFailed(error))
            })
    }
}


export const deleteUserBlogStart = () => {
    return {
        type: actionTypes.DELETE_USER_BLOG_START
    }
}
export const deleteUserBlogSuccess = (blogid) => {
    return {
        type: actionTypes.DELETE_USER_BLOG_SUCCESS,
        blogid: blogid
    }
}
export const deleteUserBlogFailed = (error) => {
    return {
        type: actionTypes.DELETE_USER_BLOG_FAILED,
        error: error
    }
}
export const deleteUserBlog = (token,blogid, userid) => {
    let config = {
        headers: {
            Authorization: 'Bearer '+ token,
        }
    }
    return dispatch => {
        dispatch(deleteUserBlogStart())
        let url = process.env.REACT_APP_BACKEND_URL + '/blog/delete'
        let authData = {
            blogid: blogid,
            userid: userid,
        }
        axios.post(url, authData, config)
            .then(response => {
                dispatch(deleteUserBlogSuccess(blogid))
            })
            .catch(error => {
                dispatch(deleteUserBlogFailed(error))
            })
    }
}

