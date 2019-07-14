import { GraphQLServer } from "graphql-yoga";
import {
  queryType,
  stringArg,
  objectType,
  extendType,
  mutationType
} from "nexus";
import { makePrismaSchema, prismaObjectType } from "nexus-prisma";
import * as path from "path";
import datamodelInfo from "./generated/nexus-prisma";
import { prisma } from "./generated/prisma-client";

// const Trademark = prismaObjectType({
//   name: "Trademark",
//   definition(t) {
//     t.prismaFields(["name", "description", "className", "type"]);
//   }
// });

const Trademark = objectType({
  name: "Trademark",
  definition(t) {
    t.string("name");
    t.string("description");
    t.string("className");
    t.string("type");
  }
});

const ResponseMessage = objectType({
  name: "ResponseMessage",
  definition(t) {
    t.string("message");
  }
});

const Query = queryType({
  definition(t) {
    t.list.field("searchTrademarks", {
      type: "Trademark",
      args: {
        searchString: stringArg({ nullable: true })
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.trademarks({
          where: {
            OR: [
              { name_contains: searchString },
              { description_contains: searchString },
              { type_contains: searchString },
              { className_contains: searchString }
            ]
          }
        });
      }
    });
    t.field("hello", {
      type: "ResponseMessage",
      resolve: (parent, args, ctx) => {
        return {
          message: "Hello"
        };
      }
    });
  }
});

const Mutation = mutationType({
  definition(t) {
    t.field("createTrademark", {
      type: "Trademark",
      args: {
        name: stringArg(),
        description: stringArg(),
        type: stringArg(),
        className: stringArg()
      },
      resolve: (parent, args, ctx) => {
        return ctx.prisma.createTrademark({
          name: args.name,
          description: args.description,
          type: args.type,
          className: args.className
        });
      }
    });
  }
});

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: [Query, Mutation, Trademark, ResponseMessage],

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, "./generated/schema.graphql"),
    typegen: path.join(__dirname, "./generated/nexus.ts")
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, "./types.ts"),
        alias: "types"
      }
    ],
    contextType: "types.Context"
  }
});

const server = new GraphQLServer({
  schema,
  context: { prisma }
});

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`));
