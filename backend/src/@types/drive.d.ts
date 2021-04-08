export interface IOptionFolder {
    fields: string;
    resource: {
        name: string;
        mimeType?: string;
        parents: string[];
    };
}

export interface IOptionFile extends IOptionFolder {
    media: {
        mimeType: string;
        body: any;
    };
}

export interface IResponseFile {
    data: {
        id: string;
        webContentLink: string;
    };
}

export interface IResponseFolder {
    data: {
        id: string;
    };
}

export interface ICreateFile {
    fileName : string,
    folderID : string
}
