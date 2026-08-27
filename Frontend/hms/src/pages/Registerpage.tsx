import React from "react";
import { SegmentedControl, TextInput, PasswordInput, Button } from "@mantine/core";
import {IconHeartbeat} from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../service/UserService";
import { errorNotification, sucessNotification } from "../Utility/NotificationUtil";

const RegisterPage = () => {
    const navigate = useNavigate();
    const form = useForm({
    initialValues: {
      role: 'PATIENT',
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (!value ? 'Name is required' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => 
        !value
          ? "Password is required"
          : !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,15}$/.test(value)
          ? "Password must be 8-15 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
          : null,
        
      confirmPassword: (value, values) => value !== values.password ? 'Passwords do not match' : null,
    },
});

const handleSubmit = (values: typeof form.values) => {
    registerUser(values).then((_data)=>{
        sucessNotification("Registered successfully! You can now login.");
        navigate("/login");
    }).catch((error)=>{
        console.error("Registration failed:", error);
        errorNotification(error.response.data.errorMessage);
    });
}

    return (
        
        <div className="h-screen w-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center " style={{backgroundImage: 'url("/bg.jpg")'}}>
            <div className="flex gap-2 items-center py-5" style={{color: "#1fad9f"}}>
                <IconHeartbeat size='30' stroke={2.5}/>
                <span className="font-heading font-semibold text-4xl">Medix</span>
            </div>
            <div className="w-[450px] backdrop-blur-2xl shadow-md p-10 py-8 rounded-2xl" style={{backgroundColor: 'rgba(31, 172, 159, 0.1)'}}>
                <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-5 [&_input]:!placeholder-white [&_.mantine-Input-input]:!border-white [&_input]:!pl-2 [&_input]:!text-white [&_svg]:text-white">
                    <div className="self-center font-medium font-heading text-white text-xl">Register</div>

                    <SegmentedControl {...form.getInputProps('role')} fullWidth data={['PATIENT', 'DOCTOR', 'ADMIN']} />

                    <TextInput {...form.getInputProps('name')}  variant="unstyled" size="md" radius="lg" placeholder="Name"/>

                    <TextInput {...form.getInputProps('email')}  variant="unstyled" size="md" radius="lg" placeholder="Email"/>
                    
                    <PasswordInput {...form.getInputProps('password')} variant="unstyled" size="md" radius="lg" placeholder="Enter your password"/>

                    <PasswordInput {...form.getInputProps('confirmPassword')} variant="unstyled" size="md" radius="lg" placeholder="To confirm your password"/>
                    
                    <Button type="submit"  radius={"md"} color='rgba(31, 172, 159)'>Register</Button>

                    <div className="text-white text-sm self-center">Have an account? <Link to={"/login"} className="hover:underline hover:text-black">Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;