import axios from 'axios';
export const setToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.headers.common['Authorization'];
    }
};

export const copyToClipboard = (item) => {
    navigator.clipboard.writeText(item);
}
