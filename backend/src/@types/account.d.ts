export interface ICart {
    _id: string;
    status: string;
    quantity: string;
    size: string;
    idProduct: string;
}

export interface INotification {
    sendBy: string;
    content: string;
    status: string;
}

export interface IAccount {
    role: string;
    email: string;
    password: string;
    name: string;
    address: string;
    avatar: string;
    notifications: INotification[];
    carts: ICart[];
    _id: string;
    phoneNumber: string;
    folderID: string,
    refeshToken : string
}

export interface ITokenLife {
    name : string,
    password : string | number,
    typeLogin : number,
    iat : number ,
    exp : number,
    email : string
}

export const enum typeLogin {
    system, facebook ,google
}