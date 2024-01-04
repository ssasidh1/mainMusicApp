import AWS from 'aws-sdk';
import { authenticateToken } from './server.js';
// Configure AWS with your S3 credentials
AWS.config.update({
    accessKeyId: process.env.AK2,
    secretAccessKey: process.env.SA2,
    region: 'us-east-2',
});
// Create an S3 instance
const s3 = new AWS.S3();
// Specify the S3 bucket and object key (file path)
const bucketName = 'general-songs';
const objectKey = 'life_goes_on.mp3';
// Create a read stream to download the file
// Example: Stream the file to the response (Express.js example)
export function getPlaylists(app) {
    app.get('/playlistz', authenticateToken, async (req, res) => {
        var _a;
        try {
            const playlist = [];
            const paramsListFolders = {
                Bucket: bucketName,
                Delimiter: '/',
            };
            const dataFolders = await s3.listObjectsV2(paramsListFolders).promise();
            // console.log("inside playlistx",dataFolders)
            if (dataFolders.CommonPrefixes !== undefined) {
                // List all objects in the S3 bucket
                for (const folderPrefix of dataFolders.CommonPrefixes) {
                    if (folderPrefix.Prefix) {
                        const folderName = folderPrefix.Prefix.replace(/\/$/, ''); // Remove trailing slash
                        if (folderName !== '') {
                            // console.log("folder name",folderName)
                            const paramsListFiles = {
                                Bucket: bucketName,
                                Prefix: folderName,
                            };
                            const dataFiles = await s3.listObjectsV2(paramsListFiles).promise();
                            // Use nullish coalescing operator to handle undefined data or Contents
                            const contents = (_a = dataFiles === null || dataFiles === void 0 ? void 0 : dataFiles.Contents) !== null && _a !== void 0 ? _a : [];
                            const audioUrls = contents.map((object) => {
                                if (object.Key && object.Key.endsWith("mp3")) {
                                    // console.log("####obj",object.Key)
                                    return `http://localhost:3005/stream/${encodeURIComponent(object.Key)}`;
                                }
                                return null;
                            });
                            if (audioUrls.length > 0) {
                                // console.log("@@@@@@@",audioUrls,folderName,"#####")
                                playlist.push({
                                    folder: folderName,
                                    audioUrls: audioUrls.filter((url) => url !== null),
                                });
                                //console.log("play",playlist)
                            }
                        }
                    }
                }
                res.json(playlist);
            }
            //res.setHeader('Content-Type', 'audio/mpeg');
            // Iterate through each file and stream it to the response
            // for (const object of contents) {
            //   if(object.Key){
            //     console.log("$$$",object.Key)
            //     const fileStream = s3.getObject({ Bucket: bucketName, Key: object.Key }).createReadStream();
            //     fileStream.pipe(res, { end: false });
            //     fileStream.on('end', () => {
            //       res.write('\n');
            //       res.end();
            //     });
            //   }
            // }
            // console.log("########",res)
            // Signal the end of the response
        }
        catch (error) {
            console.error('Error serving audio files:', error);
            res.sendStatus(500);
        }
    });
    app.get('/stream/:key', (req, res) => {
        res.setHeader('Content-Type', 'audio/mpeg');
        const key = req.params.key; // Set the appropriate content type for MP3
        const fileStream = s3.getObject({ Bucket: bucketName, Key: key }).createReadStream();
        fileStream.pipe(res);
    });
}
export function getUserPlaylist(app) {
    app.post('/userPlaylist', /*authenticateToken*/ async (req, res) => {
        var _a;
        console.log("inside my userplaylist", req.body.folder);
        try {
            const playlist = [];
            const paramsListFolders = {
                Bucket: bucketName,
                Prefix: req.body.folder
            };
            const dataFiles = await s3.listObjects(paramsListFolders).promise();
            const contents = (_a = dataFiles === null || dataFiles === void 0 ? void 0 : dataFiles.Contents) !== null && _a !== void 0 ? _a : [];
            // console.log("contents",contents)
            const audioUrls = contents.map((object) => {
                if (object.Key && object.Key.endsWith("mp3")) {
                    return `http://localhost:3005/stream/${encodeURIComponent(object.Key)}`;
                }
                return null;
            });
            if (audioUrls.length > 0) {
                console.log("@@@@@@@", audioUrls, paramsListFolders.Prefix, "#####");
                playlist.push({
                    folder: paramsListFolders.Prefix,
                    audioUrls: audioUrls.filter((url) => url !== null),
                });
                console.log("play", playlist);
            }
            res.json(playlist);
        }
        catch (error) {
            console.error('Error serving audio files:', error);
            res.sendStatus(500);
        }
    });
}
