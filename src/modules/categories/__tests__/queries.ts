// import assert from 'node:assert'
import { ApolloServer } from '@apollo/server'
import { defaultContext } from '@utils/test/apollo/defaultContext.js'
import { getTestServer } from '@utils/test/apollo/getTestServer.js'

const { prisma } = defaultContext

describe('categories', () => {
  let server: ApolloServer

  beforeAll(async () => {
    server = await getTestServer()
    await prisma.category.create({
      data: {
        name: 'test',
        code: 'test',
      },
    })
  })

  test('categories query', async () => {
    const response = await server.executeOperation(
      {
        query: `
            query categories {
                categories {
                    id
                    name
                    code
                }
            }
        `,
        variables: {},
      },
      { contextValue: defaultContext },
    )
    expect(response.body.kind).toBe('single')
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.categories).toHaveLength(1)
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })
})
