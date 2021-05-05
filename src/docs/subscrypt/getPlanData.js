module.exports = {
  get: {
    tags: ['Provider Info Getters'],
    description: 'Getting Plan Data of a provider.',
    operationId: 'getPlanData',
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
      {
        name: 'planIndex',
        in: 'path',
        schema: {
          type: 'number',
        },
        required: true,
        description: 'Index of plan (from 0)',
        example: '1',
      },
    ],
    responses: {
      200: {
        description: 'Result of request is fetched from blockchain',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PlanConst',
              description: 'Plan info',
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
