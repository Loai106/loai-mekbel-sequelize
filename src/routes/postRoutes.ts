import express from "express"
import { createComment, createPost, createPostCategory, deletePost, getAllPosts, getComments, getPostById, getPostCategory, updatePost } from "../controlers/PostController";

const router = express.Router();


router.post('/api/posts',createPost);
router.get('/api/posts',getAllPosts);
router.get('/api/posts/:postId',getPostById);
router.put('/api/posts/:postId',updatePost);
router.delete('/api/posts/:postId',deletePost);
router.post('/api/posts/:postId/categories',createPostCategory);
router.get('/api/posts/:postId/categories',getPostCategory);
router.post('/api/posts/:postId/comments',createComment);
router.get('/api/posts/:postId/comments',getComments);
export {router as PostRouter}