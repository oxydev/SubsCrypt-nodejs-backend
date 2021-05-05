module.exports = {
  get: {
    tags: ['User Info Getters'],
    description: 'CheckCheck password of user for given provider with username.',
    operationId: 'checkAuthWithUsername',
    parameters: [
      {
        name: 'username',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/Username',
        },
        required: true,
        description: 'Username Of User',
      },
      {
        name: 'providerAddress',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/Address',
        },
        required: true,
        description: 'Address Of Provider',
      },
      {
        name: 'phrase',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/Password',
        },
        required: true,
        description: 'Password of user for given provider',
        example: 'someThings',
      },
    ],
    responses: {
      200: {
        description: 'Result of request is fetched from blockchain',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BooleanResult',
            },
          },
        },
      },
      404: {
        description: 'Result of request is fetched from blockchain',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Failed',
              example: {
                message: 'WrongArgs',
              },
            },
          },
        },
      },
      500: {
        description: 'Problem in request to blockchain',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Failed',
              example: {
                status: 'Failed',
                result: 'some info',
              },
            },
          },
        },
      },
    },
  },
};
