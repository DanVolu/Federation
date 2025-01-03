import express from "express";
import cors from "cors";
import connectDB from "./db/db";
import routes from "./routes/index";

const app = express();

connectDB();

const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use(express.json()); // Parse JSON body in requests

// Define routes
app.use("/api/v1/", routes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/api/v1/`);
    
});

export default app;