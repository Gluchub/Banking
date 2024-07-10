
import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

const mybanks = async() => {
  const loggedIn = await getLoggedInUser();
  const user_id = loggedIn[0]['$id'];
  const accounts = await getAccounts({ 
    userId: user_id
  })
  return (
    <section className='flex'>
      <div className='my-banks'>
        <HeaderBox 
          title='My Banks'
          subtext='flawlessly manage your bank activities'
        />
        <div className='space-y-4'>
          <h2 className='header-2'>
            Your Cards
          </h2>
          {accounts && accounts.data.map((a: Account)=>(
            <BankCard 
              key={accounts.id}
              userName={loggedIn[0]?.firstName}
              account={a}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default mybanks