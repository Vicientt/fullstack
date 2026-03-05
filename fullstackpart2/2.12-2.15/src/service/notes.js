import axios from 'axios'


const urlBase = `http://localhost:3001/persons`
// Need get, post, delete, put

const getData = () => {
    return axios
        .get(urlBase)
        .then(response => response.data)
}

const postData = (object) => {
    return axios
        .post(urlBase, object)
        .then(response => response.data)
}

const deleteData = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
        return axios
            .delete(`${urlBase}/${id}`)
    }
}

const putData = (id, newobject) => {
    return axios
        .put(`${urlBase}/${id}`,newobject)
        .then(response => response.data)
}

export default {getData, postData, deleteData, putData}