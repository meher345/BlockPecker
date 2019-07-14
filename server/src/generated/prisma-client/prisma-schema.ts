// Code generated by Prisma (prisma@1.31.0). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateTrademark {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createTrademark(data: TrademarkCreateInput!): Trademark!
  updateTrademark(data: TrademarkUpdateInput!, where: TrademarkWhereUniqueInput!): Trademark
  updateManyTrademarks(data: TrademarkUpdateManyMutationInput!, where: TrademarkWhereInput): BatchPayload!
  upsertTrademark(where: TrademarkWhereUniqueInput!, create: TrademarkCreateInput!, update: TrademarkUpdateInput!): Trademark!
  deleteTrademark(where: TrademarkWhereUniqueInput!): Trademark
  deleteManyTrademarks(where: TrademarkWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  trademark(where: TrademarkWhereUniqueInput!): Trademark
  trademarks(where: TrademarkWhereInput, orderBy: TrademarkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Trademark]!
  trademarksConnection(where: TrademarkWhereInput, orderBy: TrademarkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TrademarkConnection!
  node(id: ID!): Node
}

type Subscription {
  trademark(where: TrademarkSubscriptionWhereInput): TrademarkSubscriptionPayload
}

type Trademark {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  description: String
  type: String!
  className: String!
}

type TrademarkConnection {
  pageInfo: PageInfo!
  edges: [TrademarkEdge]!
  aggregate: AggregateTrademark!
}

input TrademarkCreateInput {
  id: ID
  name: String!
  description: String
  type: String!
  className: String!
}

type TrademarkEdge {
  node: Trademark!
  cursor: String!
}

enum TrademarkOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  type_ASC
  type_DESC
  className_ASC
  className_DESC
}

type TrademarkPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  description: String
  type: String!
  className: String!
}

type TrademarkSubscriptionPayload {
  mutation: MutationType!
  node: Trademark
  updatedFields: [String!]
  previousValues: TrademarkPreviousValues
}

input TrademarkSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TrademarkWhereInput
  AND: [TrademarkSubscriptionWhereInput!]
  OR: [TrademarkSubscriptionWhereInput!]
  NOT: [TrademarkSubscriptionWhereInput!]
}

input TrademarkUpdateInput {
  name: String
  description: String
  type: String
  className: String
}

input TrademarkUpdateManyMutationInput {
  name: String
  description: String
  type: String
  className: String
}

input TrademarkWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  className: String
  className_not: String
  className_in: [String!]
  className_not_in: [String!]
  className_lt: String
  className_lte: String
  className_gt: String
  className_gte: String
  className_contains: String
  className_not_contains: String
  className_starts_with: String
  className_not_starts_with: String
  className_ends_with: String
  className_not_ends_with: String
  AND: [TrademarkWhereInput!]
  OR: [TrademarkWhereInput!]
  NOT: [TrademarkWhereInput!]
}

input TrademarkWhereUniqueInput {
  id: ID
}
`