'use client'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authAPI } from "../../services/api";

const Page: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleNavigate = () => {
        router.push('/login');
    };
    
    const handleSubmit = async () => {
        // Validate fields
        if (!formData.firstName || !formData.lastName || !formData.username || 
            !formData.phone || !formData.email || !formData.password) {
            message.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            message.error("Mật khẩu không khớp!");
            return;
        }
        
        setLoading(true);
        
        try {
            const userData = {
                email: formData.email,
                password: formData.password,
                username: formData.username,
                name: `${formData.firstName} ${formData.lastName}`,
                phone: formData.phone,
                address: '' // This field is empty as it's not in the form
            };

            console.log("User data to register:", userData);
            
            const { data, response } = await authAPI.register(userData);
            
            if (response.ok) {
                message.success("Đăng ký thành công!");
                router.push('/login');
            } else {
                console.error("Registration failed with status:", response.status);
                message.error(data.message || `Đăng ký thất bại (${response.status}). Vui lòng thử lại!`);
            }
        } catch (error) {
            console.error("Registration error:", error);
            
            // Check if it's a CORS error
            if (error instanceof TypeError && error.message.includes('fetch')) {
                message.error("Lỗi kết nối đến máy chủ. Vui lòng kiểm tra CORS và kết nối mạng!");
                console.error("This might be a CORS issue. Make sure your backend has CORS enabled.");
            } else {
                message.error("Có lỗi xảy ra. Vui lòng thử lại sau!");
            }
        } finally {
            setLoading(false);
        }
    };
    
    return(
        <>
         <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
                <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
                    Đăng Kí
                </div>
                <div className="flex flex-row w-full gap-2">
                    <Input 
                        placeholder="Họ" 
                        className="h-[40px]"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <Input 
                        placeholder="Tên" 
                        className="h-[40px]"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input 
                        placeholder="Tên đăng nhập" 
                        className="h-[40px]"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input 
                        placeholder="Số điện thoại" 
                        className="h-[40px]"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full gap-3">
                    <Input 
                        placeholder="Email" 
                        className="h-[40px]"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col w-full ">
                    <Input.Password
                        placeholder="Mật khẩu"
                        className="h-[40px]"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>
                <div className="flex flex-col w-full ">
                    <Input.Password
                        placeholder="Nhập lại mật khẩu"
                        className="h-[40px]"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <button 
                        className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Register'}
                    </button>
                </div>
                <div className="flex items-center justify-center gap-1">
                        <span className="text-gray-600">Bạn đã có tài khoản? 
                        </span>
                        <Link className="text-beamin cursor-pointer" href={"/login"}> Đăng nhập</Link>
                    </div>  
            </div>
        </>


    );

}
export default Page;