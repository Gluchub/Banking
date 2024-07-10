import React, { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from 'react-plaid-link'
import { createLinkUser, exchangePublicToken } from '@/lib/actions/user.actions'
import Image from 'next/image'
const PlaidLink = ({user, variant}: PlaidLinkProps) => {
  const [token, setToken]= useState('');
  const router= useRouter()
  useEffect(()=>{
    const getLinkToken= async ()=>{
        const data= await createLinkUser(user)
        setToken(data?.linkToken)
    }
    getLinkToken()

  }, [user])

  const onSuccess= useCallback<PlaidLinkOnSuccess>(async (public_token:string)=>{
    await exchangePublicToken({
        publicToken:public_token,
        user,
    })
    router.push('/')
  }, [user])
  const config: PlaidLinkOptions={
    token,
    onSuccess,
  }
  const {open, ready}= usePlaidLink(config)
  return (
    <>
        {
            variant === 'primary' ? (
                <Button
                onClick={()=> open()}
                disabled={!ready}
                className='plaidlink-primary'>
                    Connect bank
                </Button>
            ) : variant === 'ghost' ? (
                <Button onClick={()=> open()} className='plaidlink-ghost' variant='ghost'>
                  <Image 
                    src='/icons/connect-bank.svg'
                    alt='connect bank'
                    height={24}
                    width={24}
                  />
                    <p className='hiddenl xl:block text-[16px] font-semibold text-black-2'>Connect bank</p>
                </Button>
            ) : (
                <Button onClick={()=> open()} className='plaidlink-default'>
                  <Image 
                    src='/icons/connect-bank.svg'
                    alt='connect bank'
                    height={24}
                    width={24}
                  />
                  <p className='text-[16px] font-semibold text-black-2'>Connect bank</p>
                    
                </Button>
            )
        }
    </>
  )
}

export default PlaidLink