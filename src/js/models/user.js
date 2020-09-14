import axios from 'axios'

export default class User {
    constructor() {

    }

    async userSignUp() {
        const Url = "https://cors-anywhere.herokuapp.com/https://localhost:4000/user/signup";
        const user = {
             username: "sanu Patel",
             email: "sanu@gmail.com",
             password: "sanu@54321",
             Address: "50 USA Karl Marx",
             phoneNumber: "9920256174"
        }

        axios({
            method: 'POST',
            url: Url,
            data: {
                ...user
            }
        })
        .then(data => console.log(data))
        .catch(err=> console.log(err))


    }
}