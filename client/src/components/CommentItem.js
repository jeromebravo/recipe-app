import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {deleteComment} from '../actions/recipe';
import 'font-awesome/css/font-awesome.min.css';

const CommentItem = ({comment, auth: {user: {id}}, deleteComment, history, recipeId}) => {
    const removeComment = () => {
        deleteComment(recipeId, comment._id, history);
    }

    return (
        <div className='comment'>
            <img className='comment-picture' src={comment.user.profilePicture} alt={comment.user.name} />
            <div>
                <p className='name'>
                    <Link to='/'>{comment.user.name}</Link>
                </p>
                <p className='date'>
                    <Moment format='MMMM, DD YYYY - h:mm a'>{comment.date}</Moment>
                </p>
                <hr className='hr' />
                <p className='comment-text'>
                    {comment.text}
                    {id === comment.user._id && <button className='delete-comment' onClick={removeComment}><i className='fa fa-trash'></i></button>}
                </p>
            </div>
        </div>
    );
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    recipeId: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(withRouter(CommentItem));