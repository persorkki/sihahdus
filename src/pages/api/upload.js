// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {

    console.log(req.query);

    if (!req.query.name || !req.query.path) {
        res.status(400).json({ message: "no name or path" })
        return;
    }

    const dbObject = {
        name: req.query.name,
        path: req.query.path,
    }

    await prisma.image.create({
        data: {
            name: dbObject.name,
            path: dbObject.path,
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