// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import path from 'path'
import { IncomingForm } from "formidable"

export const config = {
    api: {
        bodyParser: false,
    }
}

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    }
    const options = {
        // this should be changed if it was a public site
        filename: (name, ext, part) => {
            //console.log(encodeURI(part.originalFilename));
            //return part.originalFilename.replaceAll(" ", "_");
            return part.originalFilename;
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
    form.parse(req, async (err, fields, files) => {
        if (err) {
            if (err.httpCode) {
                res.status(err.httpCode).end()
            }
            return res.status(400).end()
        }

        const file = files.uploadFile[0]
        const fileObject = {
            mime: file.mimetype,
            md5: file.hash,
            filename: file.newFilename,
            size: file.size,
            localFilepath: file.filepath,
            //TODO: to env...
            remoteFilepath: "http://localhost:3000/" + encodeURI(file.newFilename)
        }

        
        if (fileObject.mime === "image/gif") {
            // maybe ffmpeg exec call?
            // ffmpeg -i fist.gif -vf "select=eq(n\,0)" -vframes 1 output.png
            return res.status(422).end()
        }

        const newObj = await prisma.file.create({
            data: fileObject
        }).then(res => console.log(res))
        console.log(fileObject);
        console.log(newObj);
        return res.status(200).json({ fileObject });
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