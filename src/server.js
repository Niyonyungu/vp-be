import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import connectDB from "./config/db.js"
import projectRoutes from "./routes/projectRoutes.js"
import blogRoutes from "./routes/blogRoutes.js"
import contactRoutes from "./routes/contactRoutes.js"
import errorHandler from "./middleware/errorMiddleware.js"


dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors()); // Enables CORS
app.use(helmet());


// Mount routers
app.use('/api/projects', projectRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contacts', contactRoutes );

app.get('/', (req, res) => {
    res.send('Backend APIs are running...');
});

app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint not found. Please check the URL very well!',
    });
});

// Error handler middleware (must be after routes)
app.use(errorHandler);

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
});
}).catch(err => console.log("Error occured:", err));

