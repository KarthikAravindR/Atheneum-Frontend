import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';
import * as actions from './store/actions/index'

import HomeFeed from './Home/pages/Home'
import Logout from './Auth/Logout/Logout'
import HomeHeader from './shared/components/Navigation/HomeHeader'
import Toolbar from './shared/components/Navigation/Toolbar'
import Spinner from './shared/components/UIElements/LoadingSpinner'

const Auth = React.lazy(() => import('./Auth/Auth'))
const Profile = React.lazy(() => import('./Profile/pages/Profile'))
const SearchBlogs = React.lazy(() => import('./SearchBlogs/pages/SearchBlogs'))
const Bookmark = React.lazy(() => import('./SearchBlogs/components/Bookmark/Bookmark'))
const Like = React.lazy(() => import('./SearchBlogs/components/Like/Like'))
const BlogBuilder = React.lazy(() => import('./BlogBuilder/pages/NewBlog'))
const BlogViewHome = React.lazy(() => import('./BlogView/pages/BlogViewHome'))

const App = (props) => {

    const {onAutoSignUp} = props;
    useEffect(() => { 
      onAutoSignUp()
    },[onAutoSignUp])

    return (
      <div className={props.darkmode ? "App Dark" : "App"}>
        <BrowserRouter>
          <Suspense fallback={<div className="centerLoading"><Spinner /></div>}>
            {/* <Toast /> */}
            <Route path="/auth" exact >
              <Auth />
            </Route>
            <Route path="/" exact >
              <HomeHeader />
              <HomeFeed />
            </Route>
            <Route path="/newblog" exact >
              <HomeHeader />
              <BlogBuilder />
            </Route>
            <Route path="/blogview/:id" exact >
              <Toolbar />
              <BlogViewHome />
            </Route>
            <Route path="/profile/:id" exact >
              <HomeHeader />
              <Profile />
            </Route>
            <Route path="/search/:query" exact >
              <HomeHeader />
              <SearchBlogs />
            </Route>
            <Route path="/user/like/:userid" exact >
              <HomeHeader />
              <Like />
            </Route>
            <Route path="/user/bookmark/:userid" exact >
              <HomeHeader />
              <Bookmark />
            </Route>
            <Route path="/logout" exact >
              <Logout />
            </Route>
          </Suspense>
        </BrowserRouter>
      </div>
    );
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    darkmode: state.blog.darkmode
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAutoSignUp: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);