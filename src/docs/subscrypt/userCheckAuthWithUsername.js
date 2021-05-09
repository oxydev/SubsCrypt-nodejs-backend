module.exports = {
  get: {
    tags: ['User Info Getters'],
    description: 'Check password of user for SubsCrypt Dashboard with username.',
    operationId: 'userCheckAuth',
    parameters: [
      {
        name: 'username',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/Username',
        },
        required: true,
        description: 'Username Of user',
      },
      {
        name: 'passPhrase',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/Password',
        },
        required: true,
        description: 'Password of User',
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