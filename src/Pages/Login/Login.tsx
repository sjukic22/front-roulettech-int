import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Alert, Button, Form, Input} from 'antd';

import "./Login.css"
import LoginFunction from "../../Functions/Login/Login";
import {setAccess} from "../../Redux/Access/accessSlice";

type LoginType = {
    username: string
    password: string
}
const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isErrorShown, setIsErrorShown] = useState<boolean>(false);

    const onSubmit = (values: LoginType) => {
        setIsLoading(true);
        setIsErrorShown(false);
        LoginFunction.login(values.username, values.password).then((resp) => {
            console.log("Resp:", resp);
            if (resp.statusCode !== 200){
                setIsErrorShown(true);
            } else{
                dispatch(setAccess(resp.data));
                navigate("/books")
            }


        }).catch((err) => {
            console.log("Catch:", err);
            setIsLoading(false);
            setIsErrorShown(true);
        }).finally(() => {
            setIsLoading(false);
        })
    };

    return (
        <div className="loginContainer">
            <img key="logo" src="/logoCompany.jpg" alt="logo"/>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                name="loginForm"
                className="loginFormContainer"
                onFinish={onSubmit}
            >
                <Form.Item<LoginType>
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<LoginType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                {isErrorShown &&
                    <Form.Item wrapperCol={{offset: 0, span: 24}}>
                        <Alert message="An error occurred while trying to log in. Please try again." type="warning"
                               showIcon />
                    </Form.Item>
                }

                <Form.Item wrapperCol={{offset: 0, span: 24}}>
                    <Button loading={isLoading} type="primary" htmlType="submit" className="w-100">
                        Login
                    </Button>
                </Form.Item>
            </Form>

            <Alert message="Login credidentials: username: test, password: 123456" type="success" className="m-2"
                   showIcon />
        </div>
    );
};

export default Login;
