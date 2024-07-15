import axios, {AxiosResponse} from "axios";

const API_HOST = process.env.REACT_APP_BACKEND_API_URL;

class LoginFunctionClass {
    async login(
        username: string,
        password: string
    ): Promise<any> {
        return await axios
            .post(
                `${API_HOST}/users/login/`,
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {

                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    return {
                        status: true,
                        data: response.data,
                        statusCode: response.status,
                    };
                } else {
                    return {
                        status: false,
                        data: response,
                        statusCode: response.status,
                    };
                }
            })
            .catch((err: any) => {
                let statusCode = 500;
                let statusMsg = "CONNECTION REFUSED";
                if (err.response) {
                    statusMsg = err.response?.data;
                    statusCode = err.response.status;
                }
                return {status: false, message: statusMsg, statusCode: statusCode};
            });
    }
}

const LoginFunction = new LoginFunctionClass();
export default LoginFunction;
