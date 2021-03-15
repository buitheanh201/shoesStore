import AxiosClient from './axiosClient';

class ProductAPI {
    findAll(params){
        const url = '/product';
        return AxiosClient.get(url,{params});
    }
    create(data){
        const url = '/product';
        return AxiosClient.post(url,data) 
    }
    findOne(id){
        const url = `/product/${id}`;
        return AxiosClient.get(url);
    }
    update(id,data){
        const url = `/product/${id}`;
        return AxiosClient.put(url,data);
    }
    delete(id,folderID){
        const url = `/product/${id}-${folderID}`;
        return AxiosClient.delete(url);
    }
}

export default new ProductAPI();