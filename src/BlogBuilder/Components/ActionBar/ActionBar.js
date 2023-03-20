import React from 'react'

import componentMapping from '../Blog/Blog'

const ActionBar = (props) => {
    return(
        <React.Fragment>
            {Object.keys(componentMapping).map(key => (
                <button onClick={() => props.addItem(key, {})}>{key}</button>
            ))}
        </React.Fragment>
    )
} 

export default ActionBar