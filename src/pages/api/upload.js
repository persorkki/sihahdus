import path from 'path'
import { IncomingForm } from "formidable"
import { spawn } from 'child_process';
import prisma from "../../lib/prisma"

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 5M

export const config = {
    api: {
        bodyParser: false,
    }
}

async function convertGIF(fileObject) {
    const filenameNoExtension = fileObject.filename.split(".")[0];
    const cmd = "ffmpeg";
    const targetLocation = path.join(process.cwd(), "public", `${filenameNoExtension}.webm`)
    const args = ['-i', fileObject.localFilepath, '-c:v', 'vp9', targetLocation];
    const ffmpeg = spawn(cmd, args)
    
    ffmpeg.stdout.on('data', (data) => {
        console.log(`data: ${data}`);
    })
    ffmpeg.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
    ffmpeg.on('close', (code) => {
        console.log(`exit: ${code}`);
      });
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
        
        //TODO: do we want to compress gifs?
        
        if (fileObject.mime === "image/gif") {
            await convertGIF(fileObject)           
        }
        

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
