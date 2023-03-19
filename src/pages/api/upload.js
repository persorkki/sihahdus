import path from 'path'
import { IncomingForm } from "formidable"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 5M

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
        // TODO: public needs to be env var
        uploadDir: path.join(process.cwd(), "public"),
        maxFileSize: MAX_FILE_SIZE,
        hashAlgorithm: 'md5',
    }
    console.log(options);
    const form = new IncomingForm(options);
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.log(err);
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
            remoteFilepath: process.env.PUBLIC_FILE_LOCATION  + encodeURI(file.newFilename)
        }
        /*
        TODO: do we want to compress gifs?
        if (fileObject.mime === "image/gif") {
            
            // maybe ffmpeg exec call?
            // ffmpeg -i fist.gif -vf "select=eq(n\,0)" -vframes 1 output.png
            return res.status(422).end()
        }
        */

        // TODO: docs suggest using try-catch instead of .then .catch
        await prisma.file.create({
            data: fileObject
        }).then(() => {
            return res.status(200).json({ fileObject });
        })
            .catch(async (err) => {
                console.log(err);
                // if md5 already exists on the server we return the existing file
                if (err.code === 'P2002') {
                    const existingFile = await prisma.file.findUnique({
                        where: {
                            md5: fileObject.md5
                        }
                    })
                    return res.status(409).json({ existingFile });
                }
            });

    })
}
