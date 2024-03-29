const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const authAdminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");
const env = require("dotenv");
const app = express();

// env variable
env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.PASSWORD}@cluster0.ugfuj.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(express.json());
/*========= Here we want to let the server know that we should expect and allow a header with the content-type of 'Authorization' ============*/
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
//   next();
// });

app.use("/api/v1", authRoutes);
app.use("/api/v1", authAdminRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", productRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
