import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Search.css'


const Search = (props) => {
    const [searchText, setSearchText] = useState('')
    const searchTaskHandler1 = event => {
        event.preventDefault()
        if(searchText || searchText.length > 0) {
            props.history.push('/search/' + searchText)
        }
    }
    return (
        <form className={props.darkmode ? "form1 Dark" : "form1"} onSubmit={searchTaskHandler1}>
            <button className="buttonserach" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            <input
                className="searchbar1"
                placeholder="Search blogs..."
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
            />
        </form>
    )
}
const mapStateToProps = state => {
    return {
        darkmode: state.auth.darkmode
    }
}
const mapDispatchToState = dispatch => {
    return {
        onnikeshoes: () => { dispatch({ type: "NIKE_SHOES_ONLY" }) },
        onadidasshoes: () => { dispatch({ type: "ADIDAS_SHOES_ONLY" }) },
        onpumashoes: () => { dispatch({ type: "PUMA_SHOES_ONLY" }) },   
        onblueshoes: () => { dispatch({ type: "BLUE_SHOES_ONLY" }) },
        onredshoes: () => { dispatch({ type: "RED_SHOES_ONLY" }) },
        onblackshoes: () => { dispatch({ type: "BLACK_SHOES_ONLY" }) },
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToState)(Search))
