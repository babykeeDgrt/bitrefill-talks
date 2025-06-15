import path from "path";
import cron from "node-cron";
const cors = require("cors");
import express, { Application, Request, Response } from "express";
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
import { getBitrefillMentions } from "./services/bitrefill-talks";
import LeaderBoard from "../src/routes/leaderboard";

class Main {
  port: string | undefined = process.env.PORT;
  frontend: string | undefined = process.env.FRONTEND_URL;
  app: Application = express();
  server?: ReturnType<Application["listen"]>;

  constructor() {
    this.initializeApp();
  }

  async initializeApp() {
    this.setupMiddleware();
    this.setupRoutes();
    this.startServer();
    this.cronJob();
    this.gracefulShutdown();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(cors({ origin: this.frontend }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.resolve(__dirname, "../frontend")));
  }

  setupRoutes() {
    this.app.use("/api", LeaderBoard);

    // Handle 404 errors
    this.app.use((req: Request, res: Response) => {
      res.status(404).send("Not Found");
    });
    // Handle errors
    this.app.use((err: any, req: Request, res: Response) => {
      console.error(err.stack);
      res.status(500).send("Internal Server Error");
    });
  }

  async cronJob() {
    //cron.schedule("0 0 * * *", async () => {
    try {
      console.log("Running daily cron job to fetch Bitrefill mentions...");
      await getBitrefillMentions();
      console.log("Cron job completed successfully.");
    } catch (error: any) {
      console.error("Error during cron job:", error);
    }
    //});
  }

  startServer() {
    this.port
      ? (this.server = this.app.listen(this.port, () => {
          console.log(`Server running at http://localhost:${this.port}`);
        }))
      : console.error(
          `PORT: ${this.port} is not defined in the environment variables.`
        );
  }

  async gracefulShutdown() {
    process.on("SIGINT", () => {
      this.server?.close(() => process.exit(0));
    });
  }
}

new Main();
