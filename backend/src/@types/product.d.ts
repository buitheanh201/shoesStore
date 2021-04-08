interface like {
    IDAccount: string;
}

interface imageGallery {
    _id: string;
    image: string;
}

export interface IComment {
    IDAccount: string;
    content: string;
    likes: like[];
    disLikes: like[];
}

export interface IProduct {
    name: string;
    price: Number;
    oldPrice: Number;
    sale: string;
    sizes?: [
        {
            size: Number;
            inventory: Number;
        }
    ];
    description: string;
    brandID: string;
    comments?: IComment[];
    imageGallery?: imageGallery[];
    folderID?: string;
    views?: number;
}
