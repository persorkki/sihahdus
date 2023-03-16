import path from 'path'
import { IncomingForm } from "formidable"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
        // TODO: move to a constant (env var?)
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
        /*
        TODO: do we want to compress gifs?
        if (fileObject.mime === "image/gif") {
            
            // maybe ffmpeg exec call?
            // ffmpeg -i fist.gif -vf "select=eq(n\,0)" -vframes 1 output.png
            return res.status(422).end()
        }
        */
        await prisma.file.create({
            data: fileObject
        }).then(res => console.log(res))
        console.log(fileObject);
        return res.status(200).json({ fileObject });
    })
}
