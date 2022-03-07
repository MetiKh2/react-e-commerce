import {getAxiosInstance} from "./api";
export const fetchProducts = (callback) => {
getAxiosInstance().get('react-store-products')
    .then(res=>{
        callback(true,res.data)
    }).catch(err=>{
        callback(false,err.message)
})
}
export const fetchSingleProduct = (id,callback) => {
getAxiosInstance().get('react-store-single-product?id='+id)
    .then(res=>{
        callback(true,res.data)
    }).catch(err=>{
        callback(false,err.message)
})
}