import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";
import { resolvers } from "./resolvers";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import express from "express";

const typeDefs = gql(
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  }),
);

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  app.get("/sounds/:id", (req, res) =>
    res.sendFile(`${__dirname}/sounds/${req.params.id}.mp3`),
  );

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(cors(), bodyParser.json(), expressMiddleware(server));

  await new Promise(() => httpServer.listen({ port: 4000 }));

  console.log(`🚀 Server ready at http://localhost:4000`);
}

startApolloServer();
