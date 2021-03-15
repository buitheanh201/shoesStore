import axiosClient from './axiosClient';


class AuthAPI {

    login(data){
        const baseUrl = '/auth/login';
        return axiosClient.post(baseUrl,data);
    }
    register(data){
        const baseUrl = '/auth';
        return axiosClient.post(baseUrl,data);
    }
    loginFacebook(data){
        const baseUrl = '/auth/loginfacebook';
        return axiosClient.post(baseUrl,data);
    }
    existEmail(emailCheck){
        const baseUrl = '/auth/existemail';
        return axiosClient.post(baseUrl,emailCheck)
    }
    addToCart(idaccount,data){
        const baseUrl = `/auth/${idaccount}/cart`;
        return axiosClient.post(baseUrl,data);
    }
    findAll(){
        const url = '/auth';
        return axiosClient.get(url);
    }
    editCart(id,idproduct,data){
        const url = `/auth/${id}/cart/${idproduct}`;
        return axiosClient.put(url,data);
    }
    deleteCartItem(id,idproduct){
        const url = `/auth/${id}/cart/${idproduct}`;
        return axiosClient.delete(url);
    }
    update(id,data){
        const url = `/auth/${id}`;
        return axiosClient.put(url,data);
    }
    signUp(data){
        const url = '/auth/signup';
        return axiosClient.post(url,data);
    }
}

export default new AuthAPI();