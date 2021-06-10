module.exports = {
  get: {
    tags: ['Provider Info Getters'],
    description: 'Getting Plan Length of a provider.',
    operationId: 'getPlanLength',
    parameters: [
      {
        name: 'providerAddress',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/Address',
        },
        required: true,
        description: 'Address Of Provider',
      },
    ],
    responses: {
      200: {
        description: 'Result of request is fetched from blockchain',
        content: {
          schema: {
            $ref: '#/components/schemas/Number',
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
