module.exports = {
  get: {
    tags: ['User Info Getters'],
    description: 'Returning username of given address',
    operationId: 'getUsername',
    parameters: [
      {
        name: 'username',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/UserName',
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
        name: 'planIndex',
        in: 'query',
        required: true,
        description: 'Index of plan',
        example: 0,
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
