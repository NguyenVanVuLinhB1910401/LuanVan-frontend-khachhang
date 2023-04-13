import {Box} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import Comment from "./comment";
import CommentForm from "./commentform";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from 'react-toastify';
const Comments = ({currentUserId}) => {
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const [params] = useSearchParams();
    const idSP = params.get("idSP");
    //Get all bình luận
    const [backendComments, setBackendComments] = useState([]);
    //Lấy các bình luận cấp 1
    const rootComments = backendComments.filter((backendComment) => backendComment.parentId === null);
    //Lấy các bình luận cấp 2 của bình luận cấp 1
    const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      //api Thêm bình luận
    const addComment = (text, parentId) => {
        //Viet api them comment
        console.log("o add comment: "+parentId);
        if(user?._id) {
            const data = {
                productId: idSP,
                body: text,
                hoTen: user.hoTen,
                userId: user._id,
                parentId: parentId,
                createdAt: new Date(),
            };
            axios
            .post(`http://localhost:3000/api/binhluans`, data,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if(response.status === 200) {
                console.log(response.data);
                setBackendComments(backendComments => [response.data.result, ...backendComments]);
                //console.log(backendComments);
              }
            })
            .catch((err) => console.log(err));
        }else{
            toast.warning("Bạn chưa đăng nhập!!!");
        }
      };
    //Api get comments
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/binhluans/${idSP}` ,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              if(response.status === 200) {
                setBackendComments(response.data.result);
              }
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <Box>
            <Box>
                <Box>Viết bình luận</Box>
                <CommentForm submitLabel="Lưu" handleSubmit={addComment} parentId={null} />
            </Box>
            <Box>
            {rootComments.map((rootComment, index) => (
                <Comment key={index} comment={rootComment} replies={getReplies(rootComment._id)} handleAddComment={addComment} isReply={true} />
            ))}
            </Box>
        </Box>
    );
}

export default Comments;