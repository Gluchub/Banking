"use client";

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer';

const SideBar = ({user}: SiderbarProps) => {
    const pathname= usePathname();
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className='mr-4 mb-12 cursor-pointer flex items-center gap-2'>
                <Image 
                    src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt='MoneyMatrix logo'
                    className='size-[24px] max-xl:size-14'
                />
                <h1 
                    className='sidebar-logo'
                >MoneyMatrix</h1>
            </Link>

            {sidebarLinks.map((items)=>{
            const isActive= pathname===items.route|| pathname.startsWith(`${items.route}/`)
            
            return (
                <Link
                    href={items.route}
                    key={items.label}
                    className={cn(
                        'flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start',{
                            'bg-bank-gradient': isActive
                        }
                    )}
                >
                    
                        <Image 
                            src={items.imgURL}
                            alt={items.label}
                            height={30}
                            width={30}
                            className={cn({'brightness-[3] invert-0' : isActive})}
                        />
                        <p
                            className={cn(
                                'sidebar-label ml-0 text-sm',
                                {
                                    '!text-white': isActive
                                }
                            )}
                        >
                            {items.label}
                        </p>
                    
                </Link>
            )
        }
        )}
        USER
        </nav>
        <Footer user={user} type='desktop'/>
    </section>
  )
}

export default SideBar