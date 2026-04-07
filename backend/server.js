require('dotenv').config({ path: __dirname + '/.env' });

console.log("ENV TEST:", process.env.GROQ_API_KEY);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problem");
const saveRoutes = require("./routes/save");
const aiRoutes = require("./routes/ai");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/problem", problemRoutes);
app.use("/api/save", saveRoutes);
app.use("/api/ai", aiRoutes);

app.listen(3001, () => console.log("Server running on port 3001"));
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");
// const problemRoutes = require("./routes/problem");
// const saveRoutes = require("./routes/save");

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb+srv://githubgsachin_db_user:IJWPP2aICtjpFsRI@cluster0.vh12ase.mongodb.net/")
// .then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));


// app.use("/api/auth", authRoutes);
// app.use("/api/problem", problemRoutes);
// app.use("/api/save", saveRoutes);


// app.get("/test", (req, res) => {
//   res.send("Server working");
// });


// app.listen(5000, () => console.log("Server running on port 5000"));



// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");
// const problemRoutes = require("./routes/problem");
// const saveRoutes = require("./routes/save");

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ✅ MongoDB Atlas Connection
// mongoose.connect("mongodb+srv://githubgsachin_db_user:IJWPP2aICtjpFsRI@cluster0.vh12ase.mongodb.net/")
// .then(() => console.log("MongoDB Connected ✅"))
// .catch(err => console.log(err));

// // ✅ TEST ROUTE
// app.get("/test", (req, res) => {
//   res.send("Server working ✅");
// });

// // ✅ ROUTES
// app.use("/api/auth", authRoutes);
// app.use("/api/problem", problemRoutes);
// app.use("/api/save", saveRoutes);

// app.listen(3001, () => console.log("Server running on port 3001"));

// MUST BE FIRST LINE