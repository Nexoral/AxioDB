/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import buildResponse from "../../helper/responseBuilder.helper";
import { StatusCodes } from "outers";
import { AxioDB } from "../../../Services/Indexation.operation";
import CollectionController from "../../controller/Collections/Collection.controller";

// Extended options interface to include AxioDB instance
interface RouterOptions extends FastifyPluginOptions {
  AxioDBInstance: AxioDB;
}

// Collection Router
export default async function collectionRouter(
  fastify: FastifyInstance,
  options: RouterOptions,
) {
  const { AxioDBInstance } = options;

  // Get All Collection
  fastify.get("/all/", async (request, reply) => {
    return new CollectionController(AxioDBInstance).getCollections(request);
  });

  // Create Collection
  fastify.post("/create-collection", async (request, reply) =>
    new CollectionController(AxioDBInstance).createCollection(request),
  );

  // Delete Collection
  fastify.delete("/delete-collection/", async (request, reply) =>
    new CollectionController(AxioDBInstance).deleteCollection(request),
  );
}
