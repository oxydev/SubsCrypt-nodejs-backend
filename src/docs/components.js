module.exports = {
  components: {
    schemas: {
      Address: {
        type: 'string',
        description: 'Address in blockchain',
        example: '5Dyu5YxLufavjPg8vP31BhKs5xz8ncdkQcNdGwf5XtW4C9Ym',
      },
      PlanConst: {
        type: 'object',
        properties: {
          duration: {
            type: 'number',
            description: 'Duration of plan in milliseconds',
            example: '10000',
          },
          price: {
            type: 'number',
            description: 'Price of plan',
            example: '1000',
          },
          max_refund_permille: {
            type: 'number',
            description: 'Number between 0 to 1000, indicates the refund policy of plan',
            example: 100,
          },
          disabled: {
            type: 'boolean',
            example: false,
          },
        },
      },
      SubscriptionRecord: {
        type: 'object',
        properties: {
          provider: {
            type: 'string',
            description: 'Address of provider',
            example: '5Dyu5YxLufavjPg8vP31BhKs5xz8ncdkQcNdGwf5XtW4C9Ym',
          },
          plan: {
            type: 'PlanConst',
            description: 'Plan information',
          },
          plan_index: {
            type: 'number',
            description: 'Index of plan',
            example: 1,
          },
          subscription_time: {
            type: 'number',
            description: 'Epoch time of start of subscription',
            example: 16801129209000,
          },
          characteristics_values_encrypted: {
            type: 'array',
            items: {
              type: 'string',
              description: 'each value encrypted',
              example: 'somevalue',
            },
            description: 'Array of Values of characteristics encrypted by public key of provider',
          },
          refunded: {
            type: 'bool',
            description: 'whether or not plan is refunded',
            example: false,
          },
        },
      },
      BooleanResult: {
        type: 'bool',
        example: false,
      },
      Failed: {
        type: 'string',
        description: 'Status of request("NotConnected" or "Failed" or "WrongArgs") in this case',
        example: 'WrongArgs',
      },
      Username: {
        type: 'string',
        description: 'Username of user or provider in contract',
        example: 'Hadi',
      },
      Characteristics: {
        type: 'array',
        items: {
          type: 'string',
          description: 'each key',
          example: 'key1',
        },
        description: 'Array of keys of characteristics of that plan',
      },
    },
  },
};
