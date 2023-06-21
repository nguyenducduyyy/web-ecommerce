const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const db = require("./config/db");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const routers = require("./routers");

const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE", // Thay đổi địa chỉ này thành nguồn gốc của bạn
  credentials: true, // Cho phép gửi cookie
};



app.use(
  session({
    secret: '123', // Thay thế bằng một khóa bí mật
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());




db.connect();

routers(app);

app.listen(PORT, () => {
  console.log(`SERVER is running  on port ${PORT}`);
});
