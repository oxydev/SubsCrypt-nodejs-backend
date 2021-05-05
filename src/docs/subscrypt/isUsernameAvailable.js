module.exports = {
  get: {
    tags: ['User Info Getters'],
    description: 'Returning if username is available or not',
    operationId: 'isUsernameAvailable',
    parameters: [
      {
        name: 'username',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/Username',
        },
        required: true,
        description: 'UserName',
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
