import AWS from 'aws-sdk';
import express, {Request,Response} from 'express';
import cors from 'cors'
import app from './server.js'
// Configure AWS with your S3 credentials
AWS.config.update({
  accessKeyId: 'AKIAX5PVXHYWSXDGU7WW',
  secretAccessKey: 'NMayyvR+Vp7g2AXvkBz06qjkA7HVB7PHZp/3uQtg',
  region: 'us-east-2',
});


// Create an S3 instance
const s3 = new AWS.S3();

// Specify the S3 bucket and object key (file path)
const bucketName = 'songy-bucket';
const objectKey = 'life_goes_on.mp3';
const musicFiles = []
// Create a read stream to download the file
let continuationToken;
const params = {
    Bucket:'songy-bucket',
    ContinuationToken:continuationToken,
}
export const getPlaylist = async(res:Response)=>{
    const data =await s3.listObjectsV2(params).promise()
    const contents = data?.Contents ?? [];
    res.setHeader('Content-Type', 'audio/mpeg');
    for (const obj of contents){
        if(obj.Key){
            //console.log("key",obj.Key)
            const fileStream = s3.getObject({ Bucket: bucketName, Key: obj.Key }).createReadStream();
            fileStream.pipe(res, { end: false });
            fileStream.on('end', () => {
                //console.log(`Stream for ${obj.Key} ended`);
              });
        }
       
        res.end();
    }
    return res
}

// Example: Stream the file to the response (Express.js example)
// app.get('/playlists',async(req,res)=>{
    

// })

// app.get('/stream', (req:Request, res:Response) => {
//   res.setHeader('Content-Type', 'audio/mpeg'); // Set the appropriate content type for MP3
//   const fileStream = s3.getObject({ Bucket: bucketName, Key: objectKey }).createReadStream();

//   fileStream.pipe(res);
// });