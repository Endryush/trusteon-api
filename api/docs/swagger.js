const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Trusteon API',
    version: '1.0.0',
    description: 'Documentação da API Trusteon'
  },
  servers: [
    { url: '/api', description: 'API base path' }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      },
      RegisterUser: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
          userImage: { type: 'string' }
        }
      },
      Login: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email' },
          password: { type: 'string' }
        }
      },
      UpdateUser: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          userImage: { type: 'string' },
          newEmail: { type: 'string', format: 'email' }
        }
      },
      CreateProduct: {
        type: 'object',
        required: ['name', 'totalAmount'],
        properties: {
          name: { type: 'string' },
          totalAmount: { type: 'number', exclusiveMinimum: 0 },
          description: { type: 'string' },
          categories: { type: 'array', items: { type: 'string' } },
          productImages: { type: 'array', items: {} },
          serviceStatus: { type: 'string' }
        }
      },
      UpdateProduct: {
        allOf: [
          { $ref: '#/components/schemas/CreateProduct' },
          {
            type: 'object',
            required: ['id'],
            properties: {
              id: { type: 'integer' }
            }
          }
        ]
      },
      CreateOrder: {
        type: 'object',
        required: ['totalAmount', 'authorId', 'serviceId'],
        properties: {
          totalAmount: { type: 'number', exclusiveMinimum: 0 },
          authorId: { type: 'integer' },
          serviceId: { type: 'integer' },
          orderStatus: {
            type: 'integer',
            default: 1,
            description: 'Defaults to 1 (Aberto) when omitted'
          }
        }
      },
      UpdateOrderStatus: {
        type: 'object',
        required: ['orderId', 'status'],
        properties: {
          orderId: { type: 'integer' },
          status: { type: 'integer' }
        }
      },
      CreateFeedback: {
        type: 'object',
        required: ['orderId', 'questions'],
        properties: {
          orderId: { type: 'integer' },
          questions: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              required: ['questionId', 'rating'],
              properties: {
                questionId: { type: 'integer' },
                rating: { type: 'number' },
                orderId: { type: 'integer' }
              }
            }
          }
        }
      }
    }
  },
  paths: {
    '/health-check': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        responses: {
          200: {
            description: 'API and database are healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: { status: { type: 'string', example: 'ok' } }
                }
              }
            }
          },
          503: { description: 'Service unavailable' }
        }
      }
    },
    '/user/register': {
      post: {
        tags: ['User'],
        summary: 'Register user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RegisterUser' }
            }
          }
        },
        responses: {
          201: {
            description: 'User created. JWT returned in Authorization header',
            headers: {
              Authorization: {
                schema: { type: 'string' },
                description: 'Bearer <token>'
              }
            }
          },
          409: { description: 'User already exists' }
        }
      }
    },
    '/user/login': {
      post: {
        tags: ['User'],
        summary: 'Login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Login' }
            }
          }
        },
        responses: {
          200: {
            description: 'Login successful. JWT returned in Authorization header'
          },
          401: { description: 'Invalid credentials' }
        }
      }
    },
    '/user/me': {
      get: {
        tags: ['User'],
        summary: 'Get current user',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Current user' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/user': {
      patch: {
        tags: ['User'],
        summary: 'Update current user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateUser' }
            }
          }
        },
        responses: {
          200: { description: 'User updated. JWT returned in Authorization header' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/products/add': {
      post: {
        tags: ['Products'],
        summary: 'Create product',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateProduct' }
            }
          }
        },
        responses: {
          201: { description: 'Product created' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'List products',
        parameters: [
          {
            name: 'authorId',
            in: 'query',
            schema: { type: 'integer' }
          },
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer' }
          },
          {
            name: 'pageSize',
            in: 'query',
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: { description: 'Product list' }
        }
      }
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get product by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: { description: 'Product found' },
          404: { description: 'Product not found' }
        }
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete product',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          204: { description: 'Product deleted' },
          401: { description: 'Unauthorized' },
          404: { description: 'Product not found' }
        }
      }
    },
    '/products/edit': {
      patch: {
        tags: ['Products'],
        summary: 'Update product',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateProduct' }
            }
          }
        },
        responses: {
          200: { description: 'Product updated' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/order': {
      post: {
        tags: ['Orders'],
        summary: 'Create order',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateOrder' }
            }
          }
        },
        responses: {
          201: { description: 'Order created (orderStatus defaults to 1)' },
          400: { description: 'Invalid payload' },
          401: { description: 'Unauthorized' }
        }
      },
      get: {
        tags: ['Orders'],
        summary: 'List orders for current buyer',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Buyer orders' },
          401: { description: 'Unauthorized' }
        }
      },
      patch: {
        tags: ['Orders'],
        summary: 'Update order status',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateOrderStatus' }
            }
          }
        },
        responses: {
          204: { description: 'Status updated' },
          400: { description: 'Nothing to update' },
          401: { description: 'Unauthorized' },
          403: { description: 'Transition not allowed' },
          404: { description: 'Order not found' }
        }
      }
    },
    '/order/author': {
      get: {
        tags: ['Orders'],
        summary: 'List orders for current author',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Author orders' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/order/allStatus': {
      get: {
        tags: ['Orders'],
        summary: 'List enabled order statuses',
        responses: {
          200: {
            description: 'Status list with applicable transitions',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'integer' },
                      status: { type: 'string' },
                      applicableStatus: {
                        type: 'array',
                        items: { type: 'integer' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/wallet': {
      get: {
        tags: ['Wallet'],
        summary: 'Get current user wallet',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'Wallet balance and history' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/feedback/questions': {
      get: {
        tags: ['Feedback'],
        summary: 'Get feedback questions for an order',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'orderId',
            in: 'query',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: { description: 'Questions list' },
          401: { description: 'Unauthorized' }
        }
      }
    },
    '/feedback': {
      post: {
        tags: ['Feedback'],
        summary: 'Create feedback for an order',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateFeedback' }
            }
          }
        },
        responses: {
          201: { description: 'Feedback created' },
          400: { description: 'Order not approved yet' },
          401: { description: 'Unauthorized' }
        }
      }
    }
  }
}

export default swaggerSpec
