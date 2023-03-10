// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import path from 'path'
import { IncomingForm } from "formidable"

export const config = {
    api: {
        bodyParser: false,
    }
}
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        
        return res.status(405).end()
    }
    
    const options = {
        // this should be changed if it was a public site
        filename: (name, ext, part) => {
            return part.originalFilename.replaceAll(" ", "_");
            //return part.originalFilename;
        },
        // this too
        keepExtensions: true,
        allowEmptyFiles: false,
        // TODO: needs to be env var
        uploadDir: path.join(process.cwd(), "public"), 
        // default is 200 * 1024 * 1024
        maxFileSize: 5 * 1024 * 1024,
        hashAlgorithm: 'md5',
    }
    
    const form = new IncomingForm(options);
    form.parse(req, (err, fields, files) => {
        if (err) {
            if (err.httpCode) {
                
                res.status(err.httpCode).end()
            }
            return res.status(400).end()
        }
        
        const file = files.uploadFile[0]
        const fileObject = {
            mimeType: file.mimetype,
            md5: file.hash,
            filename: file.newFilename,
            size: file.size,
            localFilepath: file.filepath,
            remoteFilepath: "http://localhost:3000/" + file.newFilename,
        }

        console.log(fileObject);
        if (fileObject.mimeType === "image/gif") {
            // maybe ffmpeg exec call?
            // ffmpeg -i fist.gif -vf "select=eq(n\,0)" -vframes 1 output.png
            return res.status(422).end()
        }
                
        const prisma = new PrismaClient()
        //console.log(files);

        prisma.$disconnect();
        return res.send({test:"test"})
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