// src/controllers/blogController.js
import BlogPost from '../models/BlogPost.js';

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().sort('-createdAt');

        res.status(200).json({
            success: true,
            count: blogPosts.length,
            data: blogPosts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
const getBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findOne({
            slug: req.params.slug,
        });

        if (!blogPost) {
            return res.status(404).json({
                success: false,
                error: 'Blog post not found'
            });
        }

        res.status(200).json({
            success: true,
            data: blogPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private
const createBlogPost = async (req, res) => {
    try {

        const blogData = req.body
        const blogPost = await BlogPost.create(blogData);

        res.status(201).json({
            status: 201,
            success: true,
            message: 'Blog Added sucesfully ',
            blogData: blogPost
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
    }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private
const updateBlogPost = async (req, res) => {
    try {
        let blogPost = await BlogPost.findById(req.params.id);

        if (!blogPost) {
            return res.status(404).json({
                success: false,
                error: 'Blog post not found'
            });
        }

        // Update the updatedAt field
        req.body.updatedAt = Date.now();

        blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: 'Blog Updated Succesfully',
            data: blogPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private
const deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);

        if (!blogPost) {
            return res.status(404).json({
                success: false,
                error: 'Blog post not found'
            });
        }

        await blogPost.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Blog Deleted Succesfully',
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

export default { getBlogPost, getBlogPosts, createBlogPost, deleteBlogPost, updateBlogPost }