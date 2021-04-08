const AuthModel = require('../models/AccountModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');
const { createFolder, authCredentials, authorize, createFile } = require('./../../helpers/useDrive');

class AccountController {
    // async login(req, res) {
    //     const { email, password, token ,cartLocal } = req.body;
    //     if (token) {
    //         try {
    //             const verifyJWT = jwt.verify(token, process.env.SECRET);
    //             const account = await AuthModel.findOne({ _id: verifyJWT._id })
    //             res.status(200).json({ message: 'success', data: account })
    //         } catch (error) {
    //             res.status(500).json({ message: 'token is expired' })
    //         }

    //     } else {
    //         try {
    //             const data = await AuthModel.findOne({ email })
    //             if (data !== null) {
    //                 const passowrdVerify = await bcrypt.compare(password,data.password);
    //                 console.log(password,data.password);
    //                 if (!passowrdVerify) return res.status(200).json({ message: 'incorrect' });
    //                 if(cartLocal){
    //                     data.carts = cartLocal;
    //                     var cartReset = await data.save();
    //                 }
    //                 res.status(200).json({
    //                     message: 'success',
    //                     data : cartLocal ? cartReset : data,
    //                     token: jwt.sign({ _id: data._id }, process.env.SECRET, { expiresIn: '2 days' })
    //                 })
    //             } else return res.status(200).json({ message: 'incorrect' });
    //         } catch (error) {
    //             res.status(500).json({ message: error })
    //         }
    //     }
    // }
    // async loginWithFB(req, res) {
    //     try {
    //         const { email, name, id, picture } = req.body;
    //         const account = await AuthModel.find({ _id: id });
    //         if (account.length === 0) {
    //             const credentials = await authCredentials();
    //             const oAuthentication = await authorize(JSON.parse(credentials));
    //             const { data } = await createFolder(oAuthentication, `user-${uuid()}`, '1-4YnAh4yyutPgTrWTjjL3JvrIqi-dkJj')
    //             const newAccount = new AuthModel({
    //                 _id: id,
    //                 email,
    //                 name,
    //                 avatar: picture,
    //                 folderID: data.id
    //             })
    //             const saved = await newAccount.save();
    //             res.status(200).json({
    //                 message: 'success', data: saved,
    //                 token: jwt.sign({ _id: saved._id }, process.env.SECRET, { expiresIn: '2 days' })
    //             })
    //         } else {
    //             res.status(200).json({
    //                 message: 'success', data: account[0],
    //                 token: jwt.sign({ _id: account[0]._id }, process.env.SECRET, { expiresIn: '2 days' })
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: 'error', account: error });
    //     }
    // }
    // loginWithGoogle(req, res) {

    // }
    // async register(req, res) {
    //     const { email, password, name } = req.body;
    //     try {
    //         const credentials = await authCredentials();
    //         const oAuthentication = await authorize(JSON.parse(credentials));
    //         const { data } = await createFolder(oAuthentication, `user-${uuid()}`, '1-4YnAh4yyutPgTrWTjjL3JvrIqi-dkJj');
    //         const passwordHash = await bcrypt.hash(password,8);
    //         const newAccount = new AuthModel({
    //             email,
    //             password : passwordHash,
    //             name,
    //             folderID: data.id,
    //             _id: uuid()
    //         })
    //         const account = await newAccount.save()
    //         res.status(200).json({ message: 'success', account })
    //     } catch (error) {
    //         res.status(500).json({ message: 'error', account: error });
    //     }

    // }
    // async existEmail(req, res) {
    //     console.log('ok')
    //     const { email } = req.body;
    //     try {
    //         const existAccount = await AuthModel.find({ email })
    //         res.status(200).json(existAccount)
    //     } catch (error) {

    //     }
    // }
    // async findAll(req, res) {
    //     try {
    //         const account = await AuthModel.find({})
    //         res.status(200).json({ message: 'success', data: account });
    //     } catch (error) {
    //         res.status(500).json({ message: error })
    //     }
    // }
    // async addToCart(req, res) {
    //     try {
    //         const { id } = req.params;
    //         const { size, idProduct, status, picture, quantity, price, name } = req.body;
    //         const account = await AuthModel.findOne({ _id: id });
    //         const subdoc = account.carts.id(idProduct);
    //         if (subdoc !== null) {
    //             if (subdoc.size == size) {
    //                 subdoc.quantity += quantity;
    //                 const saved = await account.save();
    //                 return res.status(200).json({ message: 'success', data: saved.carts })
    //             }
    //         }
    //         account.carts.push({
    //             _id: idProduct, status, picture, quantity, size, price, name
    //         });
    //         const saved = await account.save();
    //         res.status(200).json({ message: 'success', data: saved.carts });
    //     } catch (error) {
    //         res.status(500).json({ message: error })
    //     }
    // }
    // async editCart(req, res) {
    //     try {
    //         const { id,idproduct } = req.params;
    //         const { quantity } = req.body;
    //         const account = await AuthModel.findOne({ _id : id });
    //         const subdoc = account.carts.id(idproduct);
    //         subdoc.quantity += quantity;
    //         const data = await account.save();
    //         res.status(200).json({ message: 'success', data: data.carts });
    //     } catch (error) {
    //         console.log(error.message);
    //         res.status(500).json({ message: error })
    //     }
    // }
    // async removeItemCart(req, res) {
    //     try {
    //         const { idproduct,id } = req.params;
    //         const account = await AuthModel.findOne({ _id : id });
    //         const subdoc = account.carts.id(idproduct);
    //         subdoc.remove();
    //         const data = await account.save();
    //         res.status(200).json({ message: 'success', data: data.carts });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({ message: error })
    //     }
    // }
    // async findOne(req, res) {
    //     const { id } = req.params;
    //     const account = await AuthModel.findOne({ _id: id });
    //     res.json({ account });
    // }
    // async update(req, res) {
    //     const { id } = req.params;
    //     const { file } = req;
    //     const { name, address, phoneNumber } = req.body;
    //     try {
    //         const account = await AuthModel.findOne({ _id: id });
    //         if (file) {
    //             const credentials = await authCredentials();
    //             const oAuthentication = await authorize(JSON.parse(credentials));
    //             var { data } = await createFile(oAuthentication, file.originalname, account.folderID);
    //         }
    //         await AuthModel.updateOne({ _id: id },
    //             { name, address, phoneNumber, avatar: file ? data.webContentLink : account.avatar });
    //         const newAcc = await AuthModel.findOne({ _id: id });
    //         res.status(200).json({ message: 'success', data: newAcc });
    //     } catch (error) {
    //         res.status(500).json({ message: error })
    //     }
    // }
    // async signup(req,res){
    //     const { name , email , password,gender} = req.body;
    //     try {
    //         const newAccount = new UserModel({
    //            name,email,password,gender
    //         })
    //         const user = await newAccount.save();
    //         res.status(200).json({
    //             message: 'success', data: user,
    //         })
    //     } catch (error) {
    //         res.status(500).json({ message: error.message })
    //     }
    // }
}


export default new AccountController();