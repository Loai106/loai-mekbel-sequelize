import { NextFunction, Request , Response } from "express";
import { postSchema, PostSchema } from "../utils/schema";
import Post from "../database/models/Post";
import User from "../database/models/User";
import Comment from "../database/models/Comment";
import Category from "../database/models/Category";
import Category_Post from "../database/models/Category_Post";



export const createPost = async(req:Request,res:Response,next:NextFunction)=>{


    try{
        const validatedData : PostSchema = postSchema.parse(req.body);
        const newPost =await Post.create({
            autherId: validatedData.autherId,
            title: validatedData.title,
            summary: validatedData.summary,
            content: validatedData.content

        })
        res.status(201).json({message:"post created successfully",newPost:newPost});
    }catch(err){
        next(err);
    }

}

//get all posts

export const getAllPosts = async(req:Request,res:Response,next:NextFunction)=>{

    try{    
        const posts = await Post.findAll({
            include:[
                {
                    model: User,
                    as:'user',
                    attributes:['id','username','email']
                    
                },
                {
                    model: Category,
                    through:{attributes: []},
                    as:'categories',
                    attributes:['id','name','description']
                },
                {
                    model: Comment,
                    as:"comments",
                    attributes : ["userId","content"]
                }
            ]
        });
        res.status(200).json({
            message:"post fetched successfully",
            posts,
        })

    }catch(err){
        next(err);
    }
}

//get post by autherId 
export const getPostById = async(req:Request,res:Response,next:NextFunction)=>{
   
  try{
    const postId=  req.params.postId;

    const post = await Post.findByPk(postId,{
        include:[
            {
                model: User,
                as:'user',
                attributes:['id','username','email']
                
            },
            {
                model: Category,
                through:{attributes: []},
                as:'categories',
                attributes:['id','name','description']
            },
            {
                model: Comment,
                as:"comments",
                attributes : ["userId","content"]
            }
        ]    });

    if(!post){
        throw new Error('no post found by this id');
    }

    res.status(200).json(post);
  }
  catch(err){
    next(err);
  }
    
}


export const updatePost = async(req:Request,res:Response,next:NextFunction)=>{
    const postId= req.params.postId;
    //check if the post is exist
    const post = await Post.findByPk(postId);
    if(!post){
        throw new Error("No post with this id");
    }
    try{
       

        //getting the edited attribute
        const validatedData : PostSchema = postSchema.parse(req.body);

        if(validatedData.autherId){
            post.autherId = validatedData.autherId;
        }
        if(validatedData.title){
            post.title = validatedData.title;
        }
        if(validatedData.content){
            post.content = validatedData.content;
        }
        if(validatedData.summary){
            post.summary = validatedData.summary;
        }

        //save the changes
        await post.save();
        res.status(203).json({
            message:"the post updated successfully!",
            post,
        })
    }catch(err){
        next(err);
    }
}

//deleting post by id 

export const deletePost = async(req:Request,res:Response,next:NextFunction)=>{

    const postId = req.params.postId;
    //check if post is exist 
    const post = await Post.findByPk(postId);
    if(!post){
        throw new Error('no post exist to delete');
    }
    try{
        await Post.destroy({
            where:{
                id:postId,
            }
        });

        res.status(202).json({
            message:"post deleted successfully!",
            post,
        })

    }catch(err){
        next(err);
    }
}

export const createPostCategory = async(req:Request,res:Response,next:NextFunction)=>{

    const postId = req.params.postId;
    const {name,description} = req.body;

   try{
    const [category , doesExist] = await Category.findOrCreate({
        where:{
            name,
            description,
        }
    })
   await Category_Post.create({
            postId,
            categoryId: category.id ,
        })
   
    res.status(201).json({
        message:"category added successfully!",
        category
    })
    }catch(err){
    next(err);
   }
}

export const getPostCategory = async(req:Request,res:Response,next:NextFunction)=>{

    const postId = req.params.postId;
    try{
        const post = await Post.findByPk(postId,{
            include:[
                {
                    model: Category,
                    through:{attributes: []},
                    as:'categories',
                    attributes:['id','name','description']
                },
            
            ]   
         });
    
        if(!post){
            throw new Error('no post found by this id');
        }
    
        res.status(200).json(post);
    }catch(err){
        next(err);
       }
}

export const createComment = async(req:Request,res:Response,next:NextFunction)=>{
    const postId = req.params.postId;
    const {userId, content} = req.body;
    if(content.trim() === "")
        throw new Error('empty comment');
    try{
        const comment = await Comment.create({
            userId,
            postId,
            content
        });

        res.status(201).json({
            message:"comment created successfully",
            comment
        })
    }
    catch(err){
        next(err);
    }

}

export const getComments = async(req:Request,res:Response,next:NextFunction)=>{
    
    const postId = req.params.postId;
    try{
        const post = await Post.findByPk(postId,{
            include:[
                { 
                    model: Comment,
                    as:"comments",
                    attributes : ["userId","content"]
                }
            
            ]   
         });
    
        if(!post){
            throw new Error('no post found by this id');
        }
    
        res.status(200).json({
            post
        });
    }catch(err){
        next(err);
       }

}