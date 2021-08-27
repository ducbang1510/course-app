import axios from 'axios'

export let endpoints = {
    'categories': '/categories/',
    'courses': '/courses/',
    'lessons': '/lessons/',
    'users': '/users/',
    'current-user': '/users/current-user/',
    'login': '/o/token/',
}

export default axios.create({
    baseURL: "http://127.0.0.1:8000/",
})