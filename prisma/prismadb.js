// import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require('@prisma/client');
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const client = global.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client

// export default client

const prisma = new PrismaClient();

module.exports = {
  prisma
};
