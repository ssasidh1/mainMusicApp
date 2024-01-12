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
            const metadataKey = "artist-name";
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
                            const audioUrls = contents.map(async (object) => {
                                if (object.Key && object.Key.endsWith("mp3")) {
                                    const metadataParams = {
                                        Bucket: bucketName,
                                        Key: object.Key,
                                    };
                                    const metadata = await s3.headObject(metadataParams).promise();
                                    // Access metadata using the specified key
                                    let artistName = null;
                                    if (metadata.Metadata) {
                                        artistName = metadata.Metadata[metadataKey];
                                        //console.log("artit",metadata.Metadata)
                                    }
                                    return {
                                        url: `https://ec2-54-237-118-91.compute-1.amazonaws.com:3005/stream/${encodeURIComponent(object.Key)}`,
                                        artist: artistName,
                                    };
                                }
                                return null;
                            });
                            const filteredAudioUrls = (await Promise.all(audioUrls)).filter((url) => url !== null);
                            //console.log("######",filteredAudioUrls)
                            if (filteredAudioUrls.length > 0) {
                                playlist.push({
                                    folder: folderName,
                                    audioUrls: filteredAudioUrls,
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
        //console.log("inside my userplaylist",req.body.folder)
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
                    return `https://ec2-54-237-118-91.compute-1.amazonaws.com:3005/stream/${encodeURIComponent(object.Key)}`;
                }
                return null;
            });
            if (audioUrls.length > 0) {
                //console.log("@@@@@@@",audioUrls,paramsListFolders.Prefix,"#####")
                playlist.push({
                    folder: paramsListFolders.Prefix,
                    audioUrls: audioUrls.filter((url) => url !== null),
                });
                //console.log("play",playlist)
            }
            res.json(playlist);
        }
        catch (error) {
            console.error('Error serving audio files:', error);
            res.sendStatus(500);
        }
    });
}
const bucketN = 'playlist-details';
// const playlistPrefix = 'playlists/';
const getAllPlaylists = async () => {
    try {
        const params = {
            Bucket: bucketN,
            // Prefix: playlistPrefix,
            Delimiter: '/',
        };
        const data = await s3.listObjectsV2(params).promise();
        //console.log("New buck",data);
        if (data.CommonPrefixes) {
            const playlist = data.CommonPrefixes.map((playlistPrefix) => {
                var _a;
                const playlistN = (_a = playlistPrefix.Prefix) === null || _a === void 0 ? void 0 : _a.replace("/", "");
                return {
                    playlistName: playlistN,
                    imageURl: `https://${bucketN}.s3.amazonaws.com/${playlistPrefix.Prefix}${playlistN}.jpeg`
                };
            });
            return playlist;
        }
    }
    catch (err) {
        console.error('Error fetching playlists:', err);
    }
};
getAllPlaylists();
//     const playlists = data.CommonPrefixes.map((playlistPrefix) => {
//       const playlistName = playlistPrefix.Prefix.replace(playlistPrefix.Delimiter, '');
//       return {
//         name: playlistName,
//         imageUrl: `s3://${bucketName}/${playlistPrefix.Prefix}${playlistName}_playlist_image.jpg`,
//       };
//     });
//     return playlists;
//   } catch (error) {
//     console.error('Error fetching playlists:', error);
//     throw error;
//   }
// };
const getFilesForPlaylist = async (playlistName) => {
    try {
        const params = {
            Bucket: bucketN,
            Prefix: `${playlistName}/`
        };
        const data = await s3.listObjectsV2(params).promise();
        //console.log("data",data.Contents)
        if (data.Contents) {
            let tem = {};
            const files = await Promise.all(data.Contents.map(async (file) => {
                let currFile;
                //console.log("lets begin")
                if (file.Key) {
                    // if(file.Key?.endsWith("/")){
                    //console.log('fil',file.Key)
                    const metadataParams = {
                        Bucket: bucketN,
                        Key: file.Key,
                    };
                    const metadata = await s3.headObject(metadataParams).promise();
                    if (metadata.Metadata) {
                        console.log("c", metadata.Metadata);
                        if (Object.keys(metadata.Metadata).length > 0 && file.Key.split('/').length > 2) {
                            currFile = metadata.Metadata;
                            const songPrefix = file.Key.substring(0, file.Key.lastIndexOf('/'));
                            const temPath = `https://${bucketN}.s3.amazonaws.com/${songPrefix}`;
                            //console.log("tempath",temPath)
                            if (!tem[temPath]) {
                                //console.log("check temp path",tem[temPath])
                                tem[temPath] = {};
                            }
                            //console.log("\n^^^^^currfile",currFile)
                            if (currFile.artist && !tem[temPath]['artist']) {
                                //console.log("\nartist",currFile.artist)
                                tem[temPath]['artist'] = currFile.artist;
                            }
                            if (currFile.songname && !tem[temPath]['songName']) {
                                //console.log("\songName",currFile.songname)
                                tem[temPath]['songName'] = currFile.songname;
                            }
                        }
                    }
                    //}
                    if (file.Size && file.Key.split('/').length > 2) {
                        const fileName = file.Key.split('/').pop();
                        //console.log("filename",fileName)
                        const songPrefix = file.Key.substring(0, file.Key.lastIndexOf('/')); // Extract the folder path
                        if (fileName) {
                            const temKey = fileName.endsWith('.mp3') ? 'audio' : fileName.endsWith('.jpeg') ? 'image' : null;
                            if (temKey) {
                                const temPath = `https://${bucketN}.s3.amazonaws.com/${songPrefix}`;
                                //console.log("tempath",temPath,temKey)
                                if (!tem[temPath]) {
                                    //console.log("check temp path",tem[temPath])
                                    tem[temPath] = {};
                                }
                                if (!tem[temPath][temKey]) {
                                    //console.log("check",tem[temPath][temKey]);
                                    tem[temPath][temKey] = `https://${bucketN}.s3.amazonaws.com/${file.Key}`;
                                }
                            }
                        }
                    }
                }
                return tem;
            }));
            // const filteredFiles = tem.filter((file)=>file!==null);
            // console.log("filtered",filteredFiles)
            // const combinedObject = filteredFiles.reduce((result, currentFile) => {
            //   console.log("currF",currentFile)
            //   if (currentFile) {
            //       Object.assign(result, currentFile);
            //   }
            //     return result;
            // }, {});
            //   const songs = tem.reduce((result, song) => {
            //     for (const key in song) {
            //         if (Object.prototype.hasOwnProperty.call(song, key)) {
            //             result.push(song[key]);
            //         }
            //     }
            //     return result;
            // }, []);
            const res = Object.values(tem);
            //console.log("combined",tem)
            return tem;
        }
    }
    catch (error) {
        console.error(`Error fetching files for playlist ${playlistName}:`, error);
        throw error;
    }
};
// // Usage example
export async function getAllPlaylistSongs(app) {
    app.get("/getAllPlaylistAndSongs", async (req, res) => {
        try {
            const playlists = await getAllPlaylists();
            //console.log("playlists",playlists)
            let allPlayLists = [];
            if (playlists) {
                //let allPlayLists:any = [{playlistName:playlist.playlistName}]
                for (const playlist of playlists) {
                    // console.log(playlist)
                    const files = await getFilesForPlaylist(playlist.playlistName);
                    //console.log("\n %%%%%%",files)
                    let artist;
                    if (files !== undefined) {
                        //not sure if always the first index holds artist name
                        //  artist = files.artist
                        allPlayLists.push({ playlistName: playlist.playlistName, playlistImage: playlist.imageURl, details: Object.values(files) });
                        //console.log("filex,",allPlayLists[0])
                    }
                    // if(files)
                    // {for (const file of files) {
                    //   console.log(`File: ${file.name}`);
                    //   console.log(`File URL: ${file.url}`);
                    // }}
                }
            }
            res.json(allPlayLists);
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
