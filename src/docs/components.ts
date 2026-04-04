/**
 * @swagger
 * components:
 *   schemas:
 *     Response200:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           nullable: true
 *           example: null
 *         message:
 *           type: string
 *           example: "Success"
 *
 *     Response400:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         data:
 *           type: object
 *           nullable: true
 *           example: null
 *         message:
 *           type: string
 *           example: "Something Wrong"
 */
