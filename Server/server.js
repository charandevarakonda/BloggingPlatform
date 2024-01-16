import express from "express"
import mongoose from "mongoose"
import router from './routes/user-routes.js';
import blogRouter from "./routes/blog-routes.js";
import cors from "cors"
const app = express();
app.use(cors());
const port = 3100;
app.use(express.json());

app.use("/api/user",router)
app.use("/api/blog",blogRouter)

const connectionString = "";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to database");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});