import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addComment} from '../actions/recipe';
import {removeAlert} from '../actions/alert';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

const Comment = ({recipe: {_id, comments}, addComment, removeAlert}) => {
    const [text, setText] = useState('');

    const onSubmit = e => {
        e.preventDefault();
        addComment(_id, text);
        setText('');
        e.target.reset();
    }

    return (
        <div>
            <form className='comment-form' onSubmit={onSubmit}>
                <input className='comment-input' name='text' value={text} onChange={e => setText(e.target.value)} placeholder='Comment' required />
                <button className='comment-submit' type='submit' onClick={removeAlert}>Submit</button>
            </form>
            
            {!!comments.length &&
                <div className='comment-list'>
                    <h4>Comments</h4>
                    {comments.map(comment => <CommentItem key={comment._id} comment={comment} recipeId={_id} />)}
                </div>
            }
        </div>
    );
}

Comment.propTypes = {
    addComment: PropTypes.func.isRequired,
    removeAlert: PropTypes.func.isRequired
}

export default connect(null, {addComment, removeAlert})(Comment);