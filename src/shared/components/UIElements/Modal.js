import React from "react";
import { connect } from "react-redux";

import "./Modal.css";
import Backdrop from "./Backdrop";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../shared/components/UIElements/LoadingSpinner";

const Modal = (props) => {
  return (
    <div>
      <Backdrop show={props.show} clicked={props.modalclosed} />
      {props.show ? (
        <div
          className="Modal1"
          style={{
            transform: props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: props.show ? "1" : "0",
          }}
        >
          {props.content === "DELETE" ? (
            <div>
              <p>
                <strong>Are you absolutely sure?</strong>
              </p>
              <p>
                This action cannot be undone. This will permanently delete the{" "}
                <strong>{props.modalblogtitle}</strong> blog
              </p>
              <div className="modal_action_buttons">
                <div
                  className="modal_action_buttons1"
                  onClick={props.modalclosed}
                >
                  cancel
                </div>
                <div
                  className="modal_action_buttons2"
                  onClick={() =>
                    props.onDeleteUserBlog(
                      props.token,
                      props.modalblogid,
                      props.userId
                    )
                  }
                >
                  {props.loading ? <Spinner /> : "confirm"}
                </div>
              </div>
            </div>
          ) : (
            <div>{props.content}</div>
          )}
        </div>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userid,
    token: state.auth.token,
    loading: state.auth.loading,
  };
};
const mapDispatchToState = (dispatch) => {
  return {
    onDeleteUserBlog: (token, blogid, userid) => {
      dispatch(actions.deleteUserBlog(token, blogid, userid));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToState)(Modal);
