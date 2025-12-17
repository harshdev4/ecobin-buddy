import Post from '../models/Post.model.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.utils.js';
import mongoose from 'mongoose';
export const submitPost = async (req, res) => {
    try {
        if (!req.file || !req.body.text) {
            return res.status(401).json({ message: "All fields are required" });
        }
        const image = await uploadToCloudinary(req.file);
        await Post.create({ author: req.user.id, image, text: req.body.text });
        res.status(201).json({ message: "Post created" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error: Something went wrong" });
    }
}

export const fetchPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).populate('author', 'name');
        return res.status(200).json({ posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error: Something went wrong" });
    }
}

export const toggleLike = async (req, res) => {
    try {
        let { postId } = req.params;
        if (!postId) {
            return res.status(401).json({ message: "Invalid post selection" });
        }

        const userId = req.user.id;

        let post = await Post.findById(postId);

        if (post.likes.includes(userId)) {
            post = await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } },
                { new: true }
            ).populate('author', 'name');
        }

        else {
            post = await Post.findByIdAndUpdate(
                postId,
                { $addToSet: { likes: userId } },
                { new: true }
            ).populate('author', 'name');
        }

        res.status(200).json({ post });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error - liking the post" })
    }
}