import { readline, fs } from 'mz';
import { google } from 'googleapis';
import path from 'path';
import {
    IOptionFile,
    IOptionFolder,
    IResponseFile,
    IResponseFolder,
} from 'src/@types/drive';

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
const authorize = async () => {
    let credentials: any = await fs.readFile(
        path.join(__dirname, 'credentials.json')
    );
    credentials = JSON.parse(credentials);
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );
    try {
        const data: any = await fs.readFile(path.join(__dirname, TOKEN_PATH));
        oAuth2Client.setCredentials(JSON.parse(data));
        return oAuth2Client;
    } catch (err) {
        return getAccessToken(oAuth2Client);
    }
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getAccessToken(oAuth2Client: any) {
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
        await fs.writeFile(
            path.join(__dirname, TOKEN_PATH),
            JSON.stringify(tokens)
        );
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

export async function createFolder<T>(folderName: string, parentFolderID: string) {
    const auth = await authorize();
    const drive = google.drive({ version: 'v3', auth });
    try {
        const option: IOptionFolder = {
            fields: 'id',
            resource: {
                name: folderName,
                parents: [parentFolderID],
                mimeType: 'application/vnd.google-apps.folder',
            },
        };
        const res: IResponseFolder | any = await drive.files.create(option);
        return res;
    } catch (error) {
        return error;
    }
}

export const createFile = async(fileName: string, folderID: string) => {
    const auth = await authorize();
    const drive = google.drive({ version: 'v3', auth });
    try {
        const option: IOptionFile = {
            resource: {
                name: `${fileName}`,
                parents: [folderID],
            },
            media: {
                mimeType: 'image/jpeg',
                body: fs.createReadStream(
                    path.join(__dirname,`../../../public/static/media/${fileName}`)
                ),
            },
            fields: 'id,webContentLink',
        };
        const res = await drive.files.create(option);
        await drive.permissions.create({
            fileId: res.data.id,
            requestBody: {
                type: 'anyone',
                role: 'reader',
            },
        });
        const result: IResponseFile | any = await drive.files.get({
            fileId: res.data.id,
            fields: 'id,webContentLink',
        });
        return result;
    } catch (error) {
        return error;
    }
};

export const deleteFile = async (IDFile: string) => {
    try {
        const auth = await authorize();
        const drive = google.drive({ version: 'v3', auth });
        const res = await drive.files.delete({
            fileId: IDFile,
        });
        return res;
    } catch (error) {
        return error;
    }
};

export const deleteFolder = async (folderID: string) => {
    try {
        const auth = await authorize();
        const drive = google.drive({ version: 'v3', auth });
        const response = await drive.files.delete({
            fileId: folderID,
        });
        return response;
    } catch (error) {
        return error;
    }
};

export const Drive = {
    accountFolder : '1-4YnAh4yyutPgTrWTjjL3JvrIqi-dkJj',
    productFolder : '1nDOHR6a0yawtSt1ci8Q4OhJDk8qQwWzM'
}
