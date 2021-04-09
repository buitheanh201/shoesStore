import mongoose, { Schema } from 'mongoose';
import { IAccount } from 'types/account';
import bcrypt from 'bcryptjs';


const cart: Schema = new Schema({
    _id: String,
    status: Number,
    quantity: Number,
    size: Number,
    idProduct: String,
});
const notification: Schema = new Schema(
    {
        sendBy: String,
        content: String,
        status: Number,
    },
    {
        timestamps: true,
    }
);
const account: Schema = new Schema(
    {
        role: { type: String, default: 1 },
        email: { type: String, required: true },
        password: { type: String, default: '123456789', required: true },
        name: { type: String, required: true },
        avatar: {
            type: String,
            default:
                'https://drive.google.com/uc?id=1jnDa2xmwh1pvJmWQ-V8UGErvf0UC9MMz&export=download',
        },
        notifications: [notification],
        carts: [cart],
        _id: String,
        address: { type: String, default: '' },
        phoneNumber: { type: String, default: '' },
        folderID: { type: String, required: true },
        refeshToken: String,
        typeLogin: { type: String, default: 1 }
    },
    {
        timestamps: true,
    }
);

account.pre('save', async function (this: IAccount | any, next) {
    // console.log('function is run !');
    //console.log(this.isModified('password'));
    //return next if password not change !
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password,salt);
    this.password = passwordHash;
})

account.methods = {
    verifyPassword : function(this : IAccount | any ,passwordHashed){
        return bcrypt.compareSync(passwordHashed,this.password);
    }
}

export default mongoose.model('accounts', account);
