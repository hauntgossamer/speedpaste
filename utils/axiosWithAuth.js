const axios = require("axios");
const token = process.env.TOKEN;

module.exports = {
    axiosWithAuth: () => {
        return axios.create({
            baseURL: 'https://api-ssl.bitly.com/v4',
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            }
        });
    }
};