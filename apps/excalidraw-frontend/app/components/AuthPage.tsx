"use client";

import { Brush } from "lucide-react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { UserCircle } from "lucide-react";
import { User2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import  axios from 'axios';
import { loginValidation, registerValidation } from "@repo/common/types";

import { useDispatch } from "react-redux";
import { setToken } from "../slice/userSlice";
import { toast, Toaster } from 'react-hot-toast';
import { useState } from "react";

interface Auth {
  isSignin: boolean;
}

interface IFormInput{
  firstName?:string,
  lastName?:string,
  email:string,
  password:string
}

export default function AuthPage({ isSignin }: Auth) {

  const router = useRouter();
  const { register, handleSubmit } = useForm<IFormInput>()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

 


  const onSubmitHandler = async(data:IFormInput)=>{
    let id = toast.loading('loading')
    setLoading(true)
    
    if(isSignin){
      try {
        const parsedData = loginValidation.safeParse(data)
        if(!parsedData.success){
          console.log("Invalid Credentails")
          return;
        }
        const signIn = await axios.post(`${process.env.NEXT_PUBLIC_HTTP_BACKEND}/user/signin`, parsedData.data)
        const token = signIn.data.token
        
        localStorage.setItem('token', `Bearer ${token}`)
        dispatch(setToken(`Bearer ${token}`))
        setLoading(false)
        toast.success('Logged In',{
          id:id
        })
        router.push('/canvasList')
       
      } catch (error) {
        
        if(axios.isAxiosError(error)){
          toast.error(error.response?.data?.message || "Invalid credentials",{
            id:id
          })
        }else{
          toast.error( "Something went wrong",{
            id:id
          })
        }
        setLoading(false)
      }

    }
    else{
      try {
        const parsedData = registerValidation.safeParse(data)
        if(!parsedData.success){
          console.log('Invalid credentials')
          return ;
        }
        const createUser = await axios.post(`${process.env.NEXT_PUBLIC_HTTP_BACKEND}/user/signup`, parsedData?.data);
        if(createUser.data.success){
          router.push('/signin')
        }
        setLoading(false)
        toast.success("Account created",{
          id:id
        })
      } catch (error) {

       
        if(axios.isAxiosError(error)){
          toast.error(error.response?.data?.message || "Something went wrong",{
            id:id
          })
        }else{
          toast.error( "Something went wrong",{
            id:id
          })
        }
        setLoading(false)
      }
    }
  }



  return (
    <div onSubmit={handleSubmit(onSubmitHandler)} className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-orange-500 to-[#160D08]">
      <form className="w-[55%] md:w-[45%] lg:w-[460px] min-h-96 flex flex-col gap-3 px-8 py-8 bg-white shadow-lg rounded-lg ">
        <div className="flex  flex-col">
        <div className="border-2 border-slate-300 mx-auto rounded-full p-3 bg-orange-200 text-orange-500 shadow-md">
          <Brush className="w-7 h-7" />
        </div>
        <h3 className="text-md lg:text-xl mx-auto mt-2 font-bold font-sans tracking-wide">
          DrawTogether
        </h3>
        <p className="text-md mx-auto font-medium font-sans tracking-wide">
          Welcome back!
        </p>
        </div>
          <Toaster/>

        {!isSignin && (
      
          <div className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-0 mt-2">

          
                <div className="flex w-full lg:w-[49%] flex-col  relative">
                  <UserCircle className="w-5 h-5 absolute top-[39px] left-3 opacity-35" />
                  <label
                    htmlFor="firstName"
                    className="text-md font-semibold font-sans inset-full mb-1"
                  >
                    First Name
                  </label>
                  <input
                  {...register("firstName")}
                  name="firstName"
                    type="text"
                    placeholder="First Name"
                    id="firstName"
                    className="border-2 px-10 py-2 rounded-md outline-none shadow-inner border-gray-300 "
                  />
                </div>

                <div className="flex w-full lg:w-[49%] flex-col relative">
                <User2 className="w-5 h-5 absolute top-[39px] left-3 opacity-35" />
                <label
                  htmlFor="lastName"
                  className="text-md font-semibold font-sans mb-1"
                >
                  Last Name
                </label>
                <input
                {...register("lastName")}
                name="lastName"
                  type="text"
                  placeholder="Last Name"
                  id="lastName"
                  className="border-2 px-10 py-2 rounded-md outline-none shadow-inner border-gray-300 "
                />
              </div>

            </div>
    
        )}
        <div className="flex flex-col  relative">
          <Mail className="w-5 h-5 absolute top-[39px] left-3 opacity-35" />
          <label
            htmlFor="email"
            className="text-md font-semibold font-sans mb-1"
          >
            Email
          </label>
          <input
          {...register("email")}
          name="email"
            type="email"
            placeholder="Email"
            id="email"
            className="border-2 px-10 py-2 rounded-md outline-none shadow-inner border-gray-300 "
          />
        </div>
        <div className="flex flex-col relative">
          <Lock className="w-5 h-5 absolute top-[39px] left-3 opacity-35" />
          <label
            htmlFor="password"
            className="text-md font-semibold font-sans mb-1"
          >
            Password
          </label>
          <input
          {...register("password")}
          name="password"
            type="password"
            placeholder="Password"
            id="password"
            className="border-2 px-10 py-2 rounded-md outline-none shadow-inner border-gray-300 "
          />
        </div>

        <button
        disabled={loading}
          type="submit"
          className="bg-gradient-to-l from-black to-orange-500 px-5 py-2  text-white rounded-md hover:opacity-90 font-sans mt-3"
        >
          {isSignin ? "Sign in" : "Sign up"}
        </button>

        {isSignin ? (
          <p className="mx-auto text-orange-600 font-sans font-medium">
            Don't have an account?{" "}
            <Link href="/signup">
                <button>
                  Sign up
                </button>
            </Link>
          </p>
        ) : (
          <p className="mx-auto text-orange-600 font-sans font-medium">
            Already have an account?{" "}
            <Link href={'/signin'}>
            <button>
              Sign in
            </button>{" "}
            </Link>
           
          </p>
        )}

        <hr className="border-[1px] mt-6"></hr>
        <p className="text-sm md:text-md text-center text-slate-700 font-medium">Join thousand of artist and create together in real time</p>
        <div className="flex  ">
          <div className="text-center w-[33%]">
            <h3 className="text-orange-700 font-medium lg:font-bold">1000*</h3>
            <p className ="text-gray-600 text-sm lg:text-md ">Active Users</p>
          </div>
          <div className="text-center border-l-[1px] w-[33%]">
            <h3 className="text-orange-700  font-medium lg:font-bold">20+</h3>
            <p className ="text-gray-600 text-sm lg:text-md">Connections</p>
          </div>
          <div className="text-center border-l-[1px] w-[33%]">
            <h3 className="text-orange-700  font-medium lg:font-bold">300+</h3>
            <p className ="text-gray-600 text-sm lg:text-md">Stroke</p>
          </div>
        </div>
      </form>
    </div>
  );
}
