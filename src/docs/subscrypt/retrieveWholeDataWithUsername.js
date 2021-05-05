module.exports = {
  get: {
    tags: ['User Info Getters'],
    description: 'Retrieving Whole Subscription Data With Password of SubsCrypt dashboard.',
    operationId: 'retrieveWholeDataWithUsername',
    parameters: [
      {
        name: 'username',
        in: 'query',
        schema: {
          $ref: '#/components/schemas/Username',
        },
        required: true,
        description: 'Username of user',
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
              type: 'array',
              items: {
                $ref: '#/components/schemas/SubscriptionRecord',
                description: 'Each Subscription',
              },
              description: 'Array of SubscriptionRecords of that user',
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
