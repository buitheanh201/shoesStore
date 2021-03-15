import axiosClient from './axiosClient';

class CategoryAPI {
    findAll(){
        const url = '/category';
        return axiosClient.get(url);
    }
    create(data){
        const url = '/category';
        return axiosClient.post(url,data);
    }
    findOne(id){
        const url = `/category/${id}`;
        return axiosClient.get(url);
    }
    update(id,data){
        const url = `/category/${id}`;
        return axiosClient.put(url,data);
    }
    delete(id,folderID){
        const url = `/category/${id}-${folderID}`;
        return axiosClient.delete(url);
    }
}


export default new CategoryAPI();