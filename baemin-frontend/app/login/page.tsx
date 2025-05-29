'use client'
import { EyeInvisibleOutlined, EyeTwoTone, FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { authAPI } from "../../services/api";

const Page: React.FC = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        identifier: '', // For email/phone/username
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLogin = async () => {
        // Validate fields
        if (!loginData.identifier || !loginData.password) {
            message.error("Vui lòng nhập đầy đủ thông tin đăng nhập!");
            return;
        }

        setLoading(true);
        
        try {
            // Determine what the user entered (email, username, or phone)
            const isEmail = loginData.identifier.includes('@');
            
            const credentials = {
                // Pass the identifier as email, username, or phone based on content
                ...(isEmail ? { email: loginData.identifier } : 
                    /^\d+$/.test(loginData.identifier) ? 
                    { phone: loginData.identifier } : 
                    { username: loginData.identifier }),
                password: loginData.password
            };

            console.log("Login credentials:", credentials);
            
            const { data, response } = await authAPI.login(credentials);
            
            if (response.ok) {
                message.success("Đăng nhập thành công!");
                
                // Store the token in localStorage if it exists in the response
                if (data.access_token) {
                    localStorage.setItem('token', data.access_token);
                }
                
                // Redirect to dashboard or home page
                router.push('/dashboard');
            } else {
                console.error("Login failed with status:", response.status);
                message.error(data.message || `Đăng nhập thất bại (${response.status}). Vui lòng thử lại!`);
            }
        } catch (error) {
            console.error("Login error:", error);
            
            // Check if it's a CORS error
            if (error instanceof TypeError && error.message.includes('fetch')) {
                message.error("Lỗi kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng!");
                console.error("This might be a CORS issue. Make sure your backend has CORS enabled.");
            } else {
                message.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
            }
        } finally {
            setLoading(false);
        }
    };
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };
    
    return (
        <>
            <div className="mt-14 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
                <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
                    Đăng Nhập
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input 
                        placeholder="Email/Số điện thoại/Tên đăng nhập" 
                        className="h-[40px]"
                        name="identifier"
                        value={loginData.identifier}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="flex flex-col w-full mt-3">
                    <Input.Password
                        placeholder="Mật khẩu"
                        className="h-[40px]"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>
                <div className="flex flex-col w-full mt-3">
                    <button 
                        className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Sign in'}
                    </button>
                    <div className="flex flex-row justify-between items-center w-full text-sm text-beamin">
                        <span className="cursor-pointer" >Quên mật khẩu </span>
                        <span className="cursor-pointer">Đăng nhập bằng SMS </span>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-600">HOẶC</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-5 h-[40px] ">
                        <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
                            <FacebookOutlined />
                            <span>Facebook</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 border w-full h-full p-1 text-beamin text-base">
                        <GoogleOutlined />
                            <span>Google</span>
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-gray-600">Bạn mới biết đến Baemin? 
                        </span>
                        <Link className="text-beamin cursor-pointer" href={"/register"}> Đăng kí</Link>
                    </div>
            </div>
        </>


    );

}
export default Page;