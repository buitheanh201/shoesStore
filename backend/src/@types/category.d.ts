export interface categoryImage {
    _id: string;
    avatar: string;
}

export interface ICategory {
    categoryName: string;
    folderID: string;
    categoryImage: categoryImage;
}
