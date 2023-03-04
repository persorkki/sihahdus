import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const allImages = await prisma.image.findMany({
        include: {
          tags: true,
        },
    
      })

    res.status(200).json({ allImages })

    //upload(prisma)
    prisma.$disconnect();    
  }