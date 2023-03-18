
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function devAddToDB(data) {

    await prisma.message.create(
        {
            data: {
                text: data.text,
                isOnline: data.isOnline === "true",
                remoteFilepath: data.remoteFilepath
            }
        }
    )
}

export default async function handler(req, res) {
    /*
    if (req.method !== 'POST') {
        return res.status(405).end()
    }
    */
    //TODO: idiomatic nextjs would probably be dynamic routing /api/message/[id]
    if (req.method === 'GET') {
        await devAddToDB(req.query)
        return res.status(200).json({ message: "dev GET received" })
    }

    if (req.method === 'POST') {
        const data = await JSON.parse(req.body);
        console.log(`POST${data}`);
        const result = await prisma.message.create({
            data: data
        })
    }
    if (req.method === 'PUT') {
        const data = await JSON.parse(req.body);
        console.log(`PUT ${data}`);
        const result = await prisma.message.update({
            where: {
                id: data.id
            },
            data: data
        })
    }
    if (req.method === 'DELETE') {

        const data = await JSON.parse(req.body);
        console.log(`DELETE ${data}`);
        const result = await prisma.message.delete({
            where: {
                id: data.id
            }
        })

    }




    /*
    await prisma.message.create(
        {
            data: {
                text: data.text,
                isOnline: data.isOnline,
                remoteFilepath: data.remoteFilepath
            }
        }
      )
      */
    return res.status(200).json({ message: "hello" })
}
