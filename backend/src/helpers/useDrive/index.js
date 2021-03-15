const fs = require('mz/fs');
const readline = require('mz/readline');
const { google } = require('googleapis');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const e = require('express');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = async (credentials) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);
  try {
    const data = await fs.readFile(path.join(__dirname, TOKEN_PATH));
    oAuth2Client.setCredentials(JSON.parse(data));
    return oAuth2Client;
  } catch (err) {
    return getAccessToken(oAuth2Client);
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    const code = await rl.question('Enter the code from that page here: ');
    rl.close();
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    await fs.writeFile(path.join(__dirname, TOKEN_PATH), JSON.stringify(tokens));
    console.log('Token stored to', TOKEN_PATH);
    return oAuth2Client;
  } catch (error) {
    console.log(error);
  }

}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listFiles(auth) {
  const drive = google.drive({ version: 'v3', auth });
  try {
    const res = await drive.files.list({
      pageSize: 10,
      fields: 'files(id, name)',
    });
    return res.data;
  } catch (err) {
    console.log(err)
  }
}

async function createFolder(auth, folderName ,parentFolderID = null) {
  const drive = google.drive({ version: 'v3', auth });
  try {
    const res = await drive.files.create({
      fields: 'id',
      resource: {
        'name': folderName,
        'mimeType': 'application/vnd.google-apps.folder',
        parents : [parentFolderID]
      }
    });
    return res;
  } catch (error) {
    return error;
  }
}

const createFile = async (auth,fileName,folderID) => {

  const drive = google.drive({ version: 'v3', auth });
  try {
    const res = await drive.files.create({
      resource: {
        'name': `${fileName}`,
        parents : [folderID]
      },
      media: {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(path.join(__dirname, '..', '..', 'resources/images', fileName))
      },
      fields : 'id,webContentLink'
    });
    return res;
  } catch (error) {
    return error;
  }
}

const deleteFile = async(auth,IDFile) => {
  try {
    const drive = google.drive({ version : 'v3' ,auth})
    const res = await drive.files.delete({
      fileId : IDFile
    })
    return res;
  } catch (error) {
    return error
  }
}

const deleteFolder = async (auth,folderID) => {
  try {
    const drive = google.drive({ version : 'v3' ,auth})
    const response = await drive.files.delete({
      fileId : folderID
    })
    return response
  } catch (error) {
    return error;
  }
}

module.exports = {
  authCredentials: () => fs.readFile(path.join(__dirname, 'credentials.json')),
  authorize: (credentials) => authorize(credentials),
  listFiles: (auth) => listFiles(auth),
  createFile : (auth,fileName,folderID) => createFile(auth,fileName,folderID),
  createFolder : (auth,folderName,parentFolderID) => createFolder(auth,folderName,parentFolderID),
  deleteFile : (auth,IDFile) => deleteFile(auth,IDFile),
  deleteFolder : (auth,folderID) => deleteFolder(auth,folderID)
}