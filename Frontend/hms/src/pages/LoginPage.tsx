import React from "react";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import {IconHeartbeat} from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../service/UserService";
import { errorNotification, sucessNotification } from "../Utility/NotificationUtil";
import { useDispatch } from "react-redux";
import { setJwt } from "../slices/JwtSlice";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../slices/UserSlice";

const LoginPage = () => {
    const dispatch = useDispatch();
    const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (!value ? 'Password is required' : value.length >= 8 && value.length <=16 ? null : 'Password must be 8-16 characters long'),
    },
});

const handleSubmit = (values: typeof form.values) => {
    loginUser(values).then((_data)=>{
        
        sucessNotification("Logged in successfully!");
        
        dispatch(setJwt(_data))
        dispatch(setUser(jwtDecode(_data)));
    }).catch((error) => {
        errorNotification(error.response.data.errorMessage);
    })
}

    return (
        
        <div className="h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center " style={{backgroundImage: 'url("/bg.jpg")'}}>
            <div className="flex gap-2 items-center py-5" style={{color: "#1fad9f"}}>
                <IconHeartbeat size='30' stroke={2.5}/>
                <span className="font-heading font-semibold text-4xl">Medix</span>
            </div>
            <div className="w-[450px] backdrop-blur-2xl shadow-md p-10 py-8 rounded-2xl" style={{backgroundColor: 'rgba(31, 172, 159, 0.1)'}}>
                <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-5 [&_input]:!placeholder-white [&_.mantine-Input-input]:!border-white [&_input]:!pl-2 [&_input]:!text-white [&_svg]:text-white">
                    <div className="self-center font-medium font-heading text-white text-xl">Login</div>

                    <TextInput {...form.getInputProps('email')}  variant="unstyled" size="md" radius="lg" placeholder="Email"/>
                    
                    <PasswordInput {...form.getInputProps('password')} variant="unstyled" size="md" radius="lg" placeholder="Enter your password"/>
                    
                    <Button type="submit"  radius={"md"} color='rgba(31, 172, 159)'>Login</Button>

                    <div className="text-white text-sm self-center">Don't have an account? <Link to={"/register"} className="hover:underline hover:text-black">Register</Link></div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;