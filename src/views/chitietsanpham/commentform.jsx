import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';

const CommentForm = ({ handleSubmit, submitLabel, parentId }) => {
  const [text, setText] = useState('');
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    //console.log("O comment form: "+parentId);
    handleSubmit(text, parentId);
    setText('');
  };
  return (
    <Box>
      <form onSubmit={onSubmit}>
        <Box>
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
            {submitLabel}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CommentForm;
