export const authDocs = {
  paths: {
    "/api-v1/register": {
      post: {
        summary: "Buat pengguna baru",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/requestAuth/Auth" },
            },
          },
        },
        responses: {
          "200": { $ref: "#/components/responsesAuth/Register200" },
          "400": { $ref: "#/components/responsesAuth/Register400" },
        },
      },
    },
    "/api-v1/login": {
      post: {
        summary: "login user",
        tags: ["Auth"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/requestAuth/Auth" },
            },
          },
        },
        responses: {
          "200": { $ref: "#/components/responsesAuth/Login200" },
          "400": { $ref: "#/components/responsesAuth/Login400" },
        },
      },
    },
  },
  components: {
    requestAuth: {
      Auth: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "john.doe@example.com" },
          password: { type: "string", format: "password", example: "securepassword123" },
        },
      },
    },
    responsesAuth: {
      Login200: {
        description: "User berhasil Login",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "integer", example: 200 },
                data: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                    expired: { type: "string", format: "date-time", example: "2025-03-21T12:00:00Z" },
                  },
                },
                message: { type: "string", example: "success" },
              },
            },
          },
        },
      },
      Login400: {
        description: "User gagal Login",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "integer", example: 400 },
                data: { type: "null", example: null },
                message: { type: "string", example: "john.doe@example.com belum terdaftar" },
              },
            },
          },
        },
      },
      Register200: {
        description: "User berhasil dibuat",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "integer", example: 200 },
                data: { type: "null", example: null },
                message: { type: "string", example: "success" },
              },
            },
          },
        },
      },
      Register400: {
        description: "User gagal dibuat",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                status: { type: "integer", example: 400 },
                data: { type: "null", example: null },
                message: { type: "string", example: "john.doe@example.com telah terdaftar" },
              },
            },
          },
        },
      },
    },
  },
};
