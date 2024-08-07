"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';


const AuthForm = ({ type }: {type : string}) => {
  // 1. Define your form.
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  
  const router= useRouter();
  const formSchema= authFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })
  
  // 2. Define a submit handler.
  const onSubmit= async (data: z.infer<typeof formSchema>) =>{
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true)
    try {
        // signup with appwrite and create a plaid token


        if(type==='sign-up'){
            const userData= {
                firstName: data.firstName!,
                lastName: data.lastName!,
                address1: data.address1!,
                city: data.city!,
                state: data.state!,
                postalCode: data.postalCode!,
                ssn: data.ssn!,
                dateOfBirth: data.dateOfBirth!,
                email: data.email,
                password: data.password,
            }
            const newUser= await signUp(userData);
            setUser(newUser)
        }
        if(type==='sign-in'){
            const response= await signIn({
                email:data.email,
                password:data.password
            })
            if (response) router.push('/'); 
        }

    }catch(error){
    console.log(error)
  } finally {
    setLoading(false)
  }
}
  
  
  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='mr-4 cursor-pointer flex items-center gap-2'>
              <Image 
                  src="/icons/logo.png"
                  width={50}
                  height={50}
                  alt='MoneyMatrix logo'
              />
              <h1 
                  className='text-22 font-ibm-plex-serif font-bold text-black-1'
              >MoneyMatrix</h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user 
                        ? 'Link account' 
                        : type === 'sign-in'
                            ? 'Sign In'
                            : 'Sign Up'}

                </h1>
                <p className='text-16 font-normal text-gray-600'>
                    {
                        user ? 'Ling your account to get started'
                        : 'Please enter your details'
                    }
                </p>
            </div>
        </header>
            {
            user ? (
                <div className='flex flex-col gap-4'>
                    <PlaidLink user={user} variant='primary' />

                </div>
              ) : ( 
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {
                                type === 'sign-up' &&(
                                    <>
                                    <div className='flex flex-row gap-4'>
                                            <CustomInput  
                                                control={form.control}
                                                name='firstName'
                                                label='First Name'
                                                placeholder='Ex Krishna'
                                            />
                                            <CustomInput  
                                                control={form.control}
                                                name='lastName'
                                                label='Last Name'
                                                placeholder='Ex Gupta'
                                            />
                                        </div>
                                        <CustomInput  
                                            control={form.control}
                                            name='address1'
                                            label='Address'
                                            placeholder='Enter your specific address'
                                        />
                                        <CustomInput  
                                            control={form.control}
                                            name='city'
                                            label='City'
                                            placeholder='Enter your city'
                                        />
                                        <div className='flex flex-row gap-4'>
                                            <CustomInput  
                                                control={form.control}
                                                name='state'
                                                label='State'
                                                placeholder='Ex: NY'
                                            />
                                            <CustomInput  
                                                control={form.control}
                                                name='postalCode'
                                                label='Postal Code'
                                                placeholder='Ex 119011'
                                            />
                                        </div>
                                        <div className='flex flex-row gap-4'>
                                            <CustomInput  
                                                control={form.control}
                                                name='dateOfBirth'
                                                label='Date Of Birth'
                                                placeholder='Ex: yyyy-mm-dd'
                                            />
                                            <CustomInput  
                                                control={form.control}
                                                name='ssn'
                                                label='SSN'
                                                placeholder='Ex 1234'
                                            />
                                        </div>
                                            
                                        

                                    </>
                                ) 
                            }
                            <CustomInput  
                                control={form.control}
                                name='email'
                                label='Email'
                                placeholder='Enter your email'
                            />
                            <CustomInput  
                                control={form.control}
                                name='password'
                                label='Password'
                                placeholder='Enter your password'
                            />
                            
                            <div className='flex flex-col gap-4'>
                                <Button className='form-btn' type="submit" disabled={loading}>
                                    {
                                        loading ? (
                                            <>
                                                <Loader2 size={20} className='animate-spin'/> &nbsp; Loading ...
                                            </>
                                        ) : type === 'sign-in' ? 'sign in' : 'sign up'
                                    }
                                </Button>
                            </div>
                            
                        </form>
                    </Form>

                    <footer className='flex items-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {
                                type === 'sign-in' ? "Dont't have an account?" : 'Already have an account?'
                            }
                        </p>
                        <Link href={ type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                            {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                        </Link>
                    </footer>
                </>
             )
         }
    </section>
  )
}
export default AuthForm