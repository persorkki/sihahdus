import prisma from "../../lib/prisma"

export default async function handler(req, res) {

    if (req.method === 'GET') {
        return res.status(405).json({ message: "no GET requests" })
    }

    //TODO: idiomatic nextjs would probably be dynamic routing /api/message/[id]

    if (req.method === 'POST') {
        const data = await JSON.parse(req.body);
        await prisma.message.create({
            data: data
        })
    }
    if (req.method === 'PUT') {
        const data = await JSON.parse(req.body);
        await prisma.message.update({
            where: {
                id: data.id
            },
            data: data
        })
    }
    if (req.method === 'DELETE') {
        const data = await JSON.parse(req.body);
        await prisma.message.delete({
            where: {
                id: data.id
            }
        })

    }

    return res.status(200).json({ message: "hello" })
}
