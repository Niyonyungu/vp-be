
import mongoose from 'mongoose';

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    image: {
        type: String,
        default: '/placeholder.svg'
    },
    readTime: {
        type: String
    },
    tags: {
        type: [String]
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Generate slug from title and calculate read time before saving
BlogPostSchema.pre('save', function (next) {
    // Only generate slug if it doesn't exist or title has changed
    if (!this.slug || this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }

    // Calculate read time (approx. 200 words per minute)
    const wordCount = this.content.split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / 200);
    this.readTime = `${readTimeMinutes} min read`;

    next();
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

export default BlogPost;