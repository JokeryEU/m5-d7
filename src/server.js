import express from "express";
import morgan from "morgan";
import cors from "cors";
import productsRoutes from "./routes/products.js";
import reviewsRoutes from "./routes/reviews.js";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import {
  errorHandler,
  routeNotFoundHandler,
} from "./middlewares/errors/errorHandling.js";

const currentFile = fileURLToPath(import.meta.url);
const currentFolder = dirname(currentFile);
const publicFolder = join(currentFolder, "../public");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const whiteList = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];

const corsOptions = {
  origin: function (origin, next) {
    if (whiteList.indexOf(origin) !== -1) {
      console.log("ORIGIN: ", origin);

      next(null, true);
    } else {
      next(new ErrorResponse(`NOT ALLOWED BY CORS`, 403));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.static(publicFolder));
app.use(express.json());

app.use("/products", productsRoutes);
app.use("/reviews", reviewsRoutes);
app.use(routeNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Server running on cloud on port: ", PORT);
  } else {
    console.log("Server running locally on port: ", PORT);
  }
});
