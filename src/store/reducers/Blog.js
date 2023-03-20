import * as actionTypes from '../actions/actionTypes'
// import searchfilter from '../../shared/components/UIElements/Searchfilter'
const initialState = {
    author: null,
    authorpic: null,
    dateposted: null,
    minread: null,
    blogs: [],
    firstloaddone: false,
    remblogs: [],
    loadedblog: null,
    error: null,
    loading: false,
    homepageloading: false,
    blogloading: false,
    searchloading: false,
    queriedBlogs: [],
    isbookmarked: false,
    isliked: false,
    blogPublished: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PUBLISH_BLOG_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PUBLISH_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                blogPublished: true,
            }
        case actionTypes.PUBLISH_BLOG_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_LATEST_BLOGS_START:
            return {
                ...state,
                homepageloading: true
            }
        case actionTypes.FETCH_LATEST_BLOGS_SUCCESS:
            return {
                ...state,
                homepageloading: false,
                firstloaddone: true,
                blogs: action.blog,
            }
        case actionTypes.FETCH_LATEST_BLOGS_FAILED:
            return {
                ...state,
                homepageloading: false,
                error: action.error
            }
        case actionTypes.FETCH_BLOGS_START:
            return {
                ...state,
                // homepageloading: true
            }
        case actionTypes.FETCH_BLOGS_SUCCESS:
            return {
                ...state,
                // homepageloading: false,
                remblogs: action.blog,
            }
        case actionTypes.FETCH_BLOGS_FAILED:
            return {
                ...state,
                // homepageloading: false,
                error: action.error
            }
        case actionTypes.FETCH_PARTICULAR_BLOG_START:
            return {
                ...state,
                blogloading: true
            }
        case actionTypes.FETCH_PARTICULAR_BLOG_SUCCESS:
            return {
                ...state,
                blogloading: false,
                loadedblog: action.blog,
                isbookmarked: action.isbookmarked,
                isliked: action.isliked,
            }
        case actionTypes.FETCH_PARTICULAR_BLOG_FAILED:
            return {
                ...state,
                blogloading: false,
                error: action.error
            }
        case actionTypes.FETCH_QUERIED_BLOG_START:
            return {
                ...state,
                searchloading: true
            }
        case actionTypes.FETCH_QUERIED_BLOG_SUCCESS:
            return {
                ...state,
                searchloading: false,
                queriedBlogs: action.blogs
            }
        case actionTypes.FETCH_QUERIED_BLOG_FAILED:
            return {
                ...state,
                searchloading: false,
                error: action.error
            }
        case actionTypes.ADD_BOOKMARK_START:
            return {
                ...state,
            }
        case actionTypes.ADD_BOOKMARK_SUCCESS:
            return {
                ...state,
                isbookmarked: true,
            }
        case actionTypes.ADD_BOOKMARK_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.ADD_LIKED_START:
            return {
                ...state,
            }
        case actionTypes.ADD_LIKED_SUCCESS:
            let newloadedblog = {...state.loadedblog}
            if(newloadedblog.id === action.blogid){
                newloadedblog.likes += 1
            }
            return {
                ...state,
                isliked: true,
                loadedblog: newloadedblog
            }
        case actionTypes.ADD_LIKED_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.REMOVE_BOOKMARK_START:
            return {
                ...state,
            }
        case actionTypes.REMOVE_BOOKMARK_SUCCESS:
            return {
                ...state,
                isbookmarked: false,
            }
        case actionTypes.REMOVE_BOOKMARK_FAILED:
            return {
                ...state,
                error: action.error
            }
        case actionTypes.REMOVE_LIKED_START:
            return {
                ...state,
            }
        case actionTypes.REMOVE_LIKED_SUCCESS:
            let anotherloadedblog = {...state.loadedblog}
            if(anotherloadedblog.id === action.blogid){
                anotherloadedblog.likes -= 1
            }
            return {
                ...state,
                isliked: false,
                loadedblog: anotherloadedblog
            }
        case actionTypes.REMOVE_LIKED_FAILED:
            return {
                ...state,
                error: action.error
            }
        case 'CLEAR_STATE':
            console.log("clear state")
            return {
                ...state,
                firstloaddone: false
            }
        case 'PUBLISH_BLOG_RESET':
            console.log("PUBLISH_BLOG_RESET")
            return {
                ...state,
                blogPublished: false
            }
        default:
            return state
    }
}

export default reducer