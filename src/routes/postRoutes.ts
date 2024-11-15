import express from "express"
import { createComment, createPost, createPostCategory, deletePost, getAllPosts, getComments, getPostById, getPostCategory, updatePost } from "../controlers/PostController";
import { verifyToken } from "../utils/verfiyToken";
import { verifyUser } from "../utils/userVerification";
const router = express.Router();


router.post('/api/posts',verifyToken,verifyUser,createPost);
router.get('/api/posts',verifyToken,getAllPosts);
router.get('/api/posts/:postId',verifyToken,getPostById);
router.put('/api/posts/:postId',verifyToken,verifyUser,updatePost);
router.delete('/api/posts/:postId',verifyToken,verifyUser,deletePost);
router.post('/api/posts/:postId/categories',verifyToken,verifyUser,createPostCategory);
router.get('/api/posts/:postId/categories',verifyToken,verifyUser,getPostCategory);
router.post('/api/posts/:postId/comments',verifyToken,verifyUser,createComment);
router.get('/api/posts/:postId/comments',verifyToken,verifyUser,getComments);
export {router as PostRouter}