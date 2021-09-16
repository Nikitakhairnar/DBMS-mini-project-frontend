const authurl = "/api/auth/";

/* eslint-disable no-async-promise-executor */

class postService {
    static createUser = async (user) => {
        // console.log(JSON.stringify( user ))
        try {
            let res = await fetch(authurl + 'signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(data => data.json());
            return res;
        } catch (err) {
            console.log(err)
        }
    }

    static loginUser = async (user) => {
        try {
            let res = await fetch(authurl + 'login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(data => data.json());
            return res;
        } catch (err) {
            console.log(err)
        }
    }
}

export default postService;
