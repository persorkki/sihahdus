// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

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
    //console.log(req.body);
    console.log(__dirname);
    
    const options = {
        //filename: ({ name, ext, part, form }) => { console.log(name, ext, part, form);  return ""},
        allowEmptyFiles: false,
        uploadDir: __dirname,     /* relative? */ 
        maxFileSize: 200 * 1024 * 1024,                 /* default */
    }
    const form = new IncomingForm(options);
    form.parse(req, (err, fields, files) => {
        
        if (err) {
            console.log(err);
        }
        
        console.log(fields);
        console.log(files);
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
    res.status(200).json({ message: "mo" })

    
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