import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: process.env.title,
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
      contact: {
        name: 'NSTDA',
        url: 'https://logrocket.com',
        email: 'info@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/books',
      },
    ],
  },
  apis: ['../routes/*.ts'],
}

export const specs = swaggerJsdoc(options)
