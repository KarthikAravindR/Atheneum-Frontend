import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons';


import classes from './Image.module.css'
import ImagePicker from '../../../shared/components/FormElements/ImageUpload'

const Image = (props) => {
    return(
        <div className={classes.imagecontainer}>
            {props.src && props.alt ? 
                <div className={classes.particularimagecontainer}>
                    <img src={props.src} alt={props.alt}/>
                    <button onClick={props.deleteImageHandler}><FontAwesomeIcon icon={faTrash} /></button>
                </div> : 
                <ImagePicker updateBlog={props.updateBlog}/>
            }
        </div>
    )
} 

export default Image