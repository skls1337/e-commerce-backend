const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/.env" });

// Connect to database
connectDB();

// Route files
const products = require("./routes/products");
const users = require("./routes/users");
const orders = require("./routes/orders");
const auth = require("./routes/auth");
const sendInvoice = require("./routes/sendInvoice");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use("/users", users);
app.use("/products", products);
app.use("/orders", orders);
app.use("/auth", auth);
app.use("/invoice", sendInvoice);

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
