// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import path from 'path'
import { IncomingForm } from "formidable"

const prisma = new PrismaClient()

export const config = {
    api: {
        bodyParser: false,
        //responseLimit: '300mb',
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: "endpoint accepts POST only" })
        return
    }
    const options = {
        // this should be changed if it was a public site
        filename: (name, ext, part, form) => { return part.originalFilename; },
        // this too
        keepExtensions: true,                                                   
        allowEmptyFiles: false,
        // TODO: needs to be env var
        uploadDir: path.join(process.cwd(), "public"), 
        // default is 200 * 1024 * 1024
        maxFileSize: 5 * 1024 * 1024,                                         
    }
    const form = new IncomingForm(options);
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.dir(err)
            prisma.$disconnect();
            return res.status(400).json({ message: err })
        }
        console.log(fields);
        console.log(files);
        prisma.$disconnect();
        return res.status(200).json({ message: "mo" })
    })

    /*
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
    */

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