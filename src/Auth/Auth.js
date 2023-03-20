import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import * as actions from '../store/actions/index'
import Input from '../shared/components/FormElements/Input'
import './Auth.css'
import Logo from '../shared/components/UIElements/Logo'
import Spinner from '../shared/components/UIElements/LoadingSpinner'
import authectication from '../assets/images/authentication2.jpg'

const Auth = (props) => {

    const [signupForm, setSignupForm] = useState({
        name: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Your Name',
                type: 'input'
            },
            value: '',
            validation: {
                isrequired: true,
            },
            valid: true
        },
        email: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Your Mail',
                type: 'input'
            },
            value: '',
            validation: {
                isrequired: true,
                isEmail: true
            },
            valid: true
        },
        password: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Password',
                type: 'password'
            },
            value: '',
            validation: {
                isrequired: true,
                minLength: 7
            },
            valid: true
        },
    })
    const [loginForm, setLoginForm] = useState({
        email: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Your Mail',
                type: 'input'
            },
            value: '',
            validation: {
                isrequired: true,
                isEmail: true
            },
            valid: true
        },
        password: {
            elementtype: 'input',
            elementconfig: {
                placeholder: 'Password',
                type: 'password'
            },
            value: '',
            validation: {
                isrequired: true,
                minLength: 7
            },
            valid: true
        },
    })
    const [isSignup, setIsSignup] = useState(false)

    const { userid } = props
    const { history } = props
    useEffect(() => {
        if (userid) {
            history.push('/')
        }
    }, [userid, history])

    const checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.isrequired) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }

    const inputchangeHandler = (event, controlname) => {
        if (isSignup) {
            const updatedControls = {
                ...signupForm,
                [controlname]: {
                    ...signupForm[controlname],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, signupForm[controlname].validation)
                }
            }
            setSignupForm(updatedControls)
        } else {
            const updatedControls1 = {
                ...loginForm,
                [controlname]: {
                    ...loginForm[controlname],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, loginForm[controlname].validation)
                }
            }
            setLoginForm(updatedControls1)
        }
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
        props.onclearerror()
    }

    const authenticationHandler = event => {
        event.preventDefault()
        if (isSignup) {
            props.onauthHandler(signupForm.email.value, signupForm.password.value, isSignup, signupForm.name.value,)
        } else {
            props.onauthHandler(loginForm.email.value, loginForm.password.value, isSignup)
        }
    }

    const responseSuccessGoogle = (response) => {
        console.log(response)
        props.ongoogleauth(response)
    }
    const responseFailureGoogle = (response) => {
        console.log(response)
    }

    const responseFacebook = (response) => {
        props.onFacebookAuth(response)
    }

    const redirectToGithub = () => {
        var win = window.open('https://github.com/KarthikAravindR', '_blank');
        win.focus();
    }

    let formelementarray1 = [];
    let formelementarray2 = [];
    if (isSignup) {
        for (let key in signupForm) {
            formelementarray1.push({
                id: key,
                config: signupForm[key]
            })
        }
    } else {
        for (let key in loginForm) {
            formelementarray2.push({
                id: key,
                config: loginForm[key]
            })
        }
    }
    let form1 = null
    let form2 = null
    if (isSignup) {
        form1 =
            <form>
                {formelementarray1.map(formelement => (
                    <Input key={formelement.id}
                        error={true}
                        shouldvalidate={formelement.config.validation}
                        validity={formelement.config.valid}
                        changd={(event) => inputchangeHandler(event, formelement.id)}
                        label={formelement.id}
                        elementtype={formelement.config.elementtype}
                        elementconfig={formelement.config.elementconfig}
                        value={formelement.config.value} />
                ))}
            </form>
    } else {
        form2 =
            <form>
                {formelementarray2.map(formelement => (
                    <Input key={formelement.id}
                        error={false}
                        shouldvalidate={formelement.config.validation}
                        validity={formelement.config.valid}
                        changd={(event) => inputchangeHandler(event, formelement.id)}
                        label={formelement.id}
                        elementtype={formelement.config.elementtype}
                        elementconfig={formelement.config.elementconfig}
                        value={formelement.config.value} />
                ))}
            </form>
    }

    let signupbutton = <p>New To Atheneum? <span style={{ color: "#FFc038", cursor: "pointer" }} onClick={switchAuthModeHandler}>Create an Account</span></p>
    let loginbutton = <p>Already have an account? <span style={{ color: "#FFc038", cursor: "pointer" }} onClick={switchAuthModeHandler}>Log-In here</span></p>
    return (
        <div className="Authentication">
            <div id="egg">
                <div className="Authenticationarea">
                    <div className="people">
                        <div className="authtitle"><Logo /><p>Atheneum</p></div>
                        <div className="peopleimg">
                            <img src={authectication} alt="" />
                        </div>
                    </div>
                    <div className="Authenticationform">
                        <p className="welcomemedia">Welcome To Atheneum</p>
                        <div className="Auth">
                            {props.error && <div className="errormessage">
                                {props.error}
                            </div>}
                            {isSignup ? form1 : form2}
                            <div className="signupbutton">
                                <button onClick={authenticationHandler} type="button" className="btn btn-light"><p>{ props.loading ? <Spinner /> :<span>{isSignup ? 'Sign Up' : 'Log-IN'}</span>}</p></button>
                            </div>
                            <div className="or">
                                <div className="ordash"></div>
                                <div className="orword">or</div>
                                <div className="ordash"></div>
                            </div>
                            <div className="Auth_GFB">
                                <GoogleLogin
                                    clientId="162003935215-rp7i00q4jsf94gdg6afqdtmkbr1ohbmk.apps.googleusercontent.com"
                                    className="googlebutton"
                                    buttonText=""
                                    onSuccess={responseSuccessGoogle}
                                    onFailure={responseFailureGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                                <FacebookLogin
                                    appId="447049766349813"
                                    fields="name,email,picture"
                                    icon="fa-facebook"
                                    textButton=""
                                    callback={responseFacebook} />
                            </div>
                            <p className="signupbutton2">{isSignup ? loginbutton : signupbutton}</p>
                            <p className="developer">developed by <span onClick={redirectToGithub}>Karthik Aravind R</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        userid: state.auth.userid,
        loading: state.auth.loading,
        error: state.auth.error,
    }
}
const mapDispatchToState = dispatch => {
    return {
        onauthHandler: (email, password, isSignup, name) => { dispatch(actions.auth(email, password, isSignup, name)) },
        ongoogleauth: (response) => { dispatch(actions.googleauth(response)) },
        onFacebookAuth: (response) => { dispatch(actions.facebookauth(response)) },
        onclearerror: () => { dispatch({ type: "CLEAR_AUTH_ERROR" }) },
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToState)(Auth))



