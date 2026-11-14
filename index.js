const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.disable("x-powered-by");

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

const products = [];

app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Noriaki SHOP",
    products,
    categories: ["All", "Cute", "Kawaii", "Pixel", "Animated"]
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "noriaki-store" });
});

app.use((req, res) => {
  res.status(404).render("not-found", { pageTitle: "ไม่พบหน้านี้" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Noriaki SHOP website running on port ${PORT}`);
});
