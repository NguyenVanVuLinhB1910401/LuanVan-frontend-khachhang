import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import CommentForm from './commentform';
//comment là bình luận cấp một
//replies là các bình luận con
//handleAddComment là để trả lời bình luận
const Comment = ({ comment, replies, handleAddComment, isReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [xemTatCa, setXemTatCa] = useState(false);
  const [text, setText] = useState('');
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    //console.log("O comment form: "+parentId);
    handleAddComment(text, comment._id);
    setText('');
  };
  return (
    <Box>
      <Box display="flex" gap={2}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            width="30px"
            src={'http://localhost:3002/assets/user-icon.png'}
            alt="ko thấy"
          />
        </Box>
        <Box>
          <Box display="flex" gap={2}>
            <Box>{comment.hoTen}</Box>
            <Box>{comment.createdAt}</Box>
          </Box>
          {isReply &&(<Box display="flex" gap={2}>
            <Box onClick={() => setIsReplying(true)}>Trả lời</Box>
            <Box onClick={() => setXemTatCa(!xemTatCa)}>
              Xem tất cả câu trả lời ({replies.length})
            </Box>
          </Box>)}
          <Box>{comment.body}</Box>
        </Box>
      </Box>

      {isReplying && (
        <Box>
          <Box>
            <form onSubmit={onSubmit}>
              <TextField
                multiline
                rows="2"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Button
                type="submit"
                variant="outlined"
                disabled={isTextareaDisabled}
              >
                Trả lời
              </Button>
            </form>
          </Box>
        </Box>
      )}
      {replies.length > 0 && xemTatCa && (
        <Box ml="30px">
          {replies.map((reply, index) => (
            <Comment key={index} comment={reply} replies={[]} isReply={false}/>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Comment;
