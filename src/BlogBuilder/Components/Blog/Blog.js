import React from "react";
// import QuillEditor from "./Quill";
import classes from "./Blog.module.css";
import Image from "../Image/Image";
import autosize from "autosize";
import "react-quill/dist/quill.snow.css";

export const componentMapping = {
  img: (content, updateBlog, deleteImageHandler) => (
    <Image
      {...content}
      updateBlog={updateBlog}
      deleteImageHandler={deleteImageHandler}
    />
  ),
};
const Blog = (props) => {
  autosize(document.querySelectorAll("textarea"));
  let view = null;
  if (props.type === null) {
    view = (
      <textarea autoFocus
          className={props.darkmode ? [classes.writearea, classes.Dark].join(' ') : classes.writearea}
          value={props.content}
          placeholder={props.placeholder}
          onChange={e => props.updateBlog(e.target.value)}
          onKeyPress={e => props.handleKeyPress(e, props.id)}
          onKeyDown={e => props.handleBackspace(e, props.id)}/>
    );
  } else if (props.type === "title") {
    view = (
      <textarea
        className={
          props.darkmode
            ? [classes.title, classes.Dark].join(" ")
            : classes.title
        }
        value={props.content}
        placeholder="Title"
        onKeyPress={(e) => props.handleKeyPress(e, props.id)}
        onChange={(e) => props.updateBlog(e.target.value)}
      />
    );
  } else {
    view = componentMapping[props.type](
      props.content,
      props.updateBlog,
      props.deleteImageHandler
    );
  }

  return <div>{view}</div>;
};

export default Blog;
