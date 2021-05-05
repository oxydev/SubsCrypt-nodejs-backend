module.exports = {
  get: {
    tags: ['Server Status Getter'],
    description: 'Check if SubsCrypt contract is connected or not.',
    operationId: '/isConnected',
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
      500: {
        description: 'Server is not connected to SubsCrypt',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Failed',
            },
            example: 'NotConnected',
          },
        },
      },
    },
  },
};
