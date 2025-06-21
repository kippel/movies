"use client"
import { useForm } from "react-hook-form"

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from '@/components/ui/button'

type Inputs = {
    name: string,
    password: string,

}

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [error, setError] = useState("");
    const router = useRouter();
    //const [message, setMessage] =
    const onSubmit = handleSubmit(async (data) => {
        //console.log(data)
        const res = await signIn("credentials",{
            name: data.name,
            password: data.password,
            redirect: false
        })

        if (res?.error) return setError(res.error as string)

        if (res?.ok) return router.push("/abc")
        
    })

    
    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <div className="absolute top-5 right-5">
                <Link href="/auth/register" className="text-blue-500">Register</Link>
            </div>
            <form onSubmit={onSubmit} className="w-1/4">
                <h1 className="text-slate-200 font-black text-4xl mb-4">
                    Login
                </h1>
                { error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
                
                <label htmlFor="name" className="text-slate-400 mb-2 block text-lg">
                    Name
                </label>
                <input type="text"
                    {...register("name", {
                        required: {
                            value: true,
                            message: 'Namel is required'
                        }
                    })}
                    className="p-3 rounded block mb-2 bg-slate-800 text-slate-300 w-full" />
                 {
                    errors.name && (
                        <span className="text-red-300">{errors.name.message}</span>
                    )
                }
                
                <label htmlFor="password" className="text-slate-400 mb-2 block text-lg">
                    Password
                </label>
                <input type="password" {...register("password", {
                    required: {
                            value: true,
                            message: 'Password is required'
                        }
                })} className="p-3 rounded block mb-2 bg-slate-800 text-slate-300 w-full" />
                {
                    errors.password && (
                        <span className="text-red-300">{errors.password.message}</span>
                    )
                }
                <Button variant="primary" className="w-full mt-2 rounded-lg">Register</Button>
                
            </form>
        </div>
    )
}

export default LoginPage;