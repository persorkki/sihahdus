// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: "POST only" })
        return
    }

    console.log(`[RECEIVING] ${req.body.name}`);
    console.log(req.body.tags);
    const dbObject = {
        name: req.body.name,
        path: req.body.path,
        tags: req.body.tags
    }

    await prisma.image.create({
        data: {
            name: dbObject.name,
            path: dbObject.path,
            tags: {
                create: dbObject.tags
              },
        }
    })
    
    res.status(200).json({ message: "mo" })

    //upload(prisma)
    prisma.$disconnect();

    
  }
/*
async function upload() {
    await prisma.image.create({
        data: {
            name: "nice image",
            path: "g:/code/web/sihahdus-necro/public/7.gif",
            tags: {
                create: [{ description: "meme" }, { description: "gif" }],
            }
        }
    })
}
*/