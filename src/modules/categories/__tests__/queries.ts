import { PrismaClient } from '@prisma/client'
import { ApolloServer } from '@apollo/server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import categoryResolvers from '@modules/categories/resolvers.js'
import authResolvers from '@modules/auth/resolvers.js'
import { CustomAuthChecker } from '@core/auth.js'
import assert from 'node:assert'

const prisma = new PrismaClient()

const contextValue = { prisma };

const schema = await buildSchema({
  resolvers: [...categoryResolvers, ...authResolvers],
  validate: false,
  authChecker: CustomAuthChecker,
})

async function getServer() {
  return new ApolloServer({
    schema
  });
}

async function categories() {
  const testServer = await getServer()
  return testServer.executeOperation({
      query: `
            query categories {
                categories {
                    id
                    name
                    code
                }
            }
        `,
      variables: {}
    },
    { contextValue });
}

describe('categories', () => {
  prisma.category.create({
    data: {
      name: "test",
      code: "test",
    },
  })

  describe('Categories list', () => {
    it('return all categories', async () => {
      const response = await categories();
      assert(response.body.kind === 'single');
      expect(response.body.singleResult.errors).toBeUndefined();
      expect(response.body.singleResult.data?.categories).toHaveLength(1);
    });
  });
});