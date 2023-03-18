
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
    
    await devAddToDB(req.query)
    //const data = JSON.parse(req.query);
    
    

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
    return res.status(200).json({message: "hello"})
}
