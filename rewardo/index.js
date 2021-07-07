const {google} = require('googleapis');

const fs = require('fs');
const { file } = require('googleapis/build/src/apis/file');

const CLIENT_ID = '1026199634916-i8735itictheha6ispk56os0ru953vlt.apps.googleusercontent.com';
const CLIENT_SECRET = 'OdD7S8p6gF4xBTiA_Ro06b1k';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04Mta3I73chC_CgYIARAAGAQSNwF-L9IrCDj3JGrYM9k-KRHvGRDomXkqzKlJgi42zI7sUktK-PIqg3IrkgC7oOLVzl0SPdDO058';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
   
const drive  = google.drive({
    version: 'v3',
    auth: oauth2Client
})


async function uploadFile(filepath){
    try {

        const response = await drive.files.create({
            requestBody: {
                name: filepath,
                mimeType: 'application/pdf'
            },
            media:{
                mimeType: 'application/pdf',
                body: fs.createReadStream(filepath)
            }
        })

        console.log(filepath);
    } catch (error) {
        console.log(error.message);
    }
}



function downloadFile(drive, fileId, fileName) {
        const filePath = `/Users/ASUS/Downloads/${fileName}`;
        const dest = fs.createWriteStream(filePath);
        let progress = 0;
      
        drive.files.get(
          { fileId, alt: 'media' },
          { responseType: 'stream' }
        ).then(res => {
          res.data
            .on('end', () => {
              console.log('Done downloading file.');
            })  
            .on('error', err => {
              console.error('Error downloading file.');
            })  
            .on('data', d => {
              progress += d.length;
              if (process.stdout.isTTY) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(`Downloaded ${progress} bytes`);
              }   
            })  
            .pipe(dest);
        }); 
      }










module.exports = {downloadFile, drive, uploadFile};




