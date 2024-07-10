import HeaderBox from '@/components/HeaderBox'
import PaymentTransferForm from '@/components/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'


const PaymentTransfer = async () => {
  const loggedIn = await getLoggedInUser();
  const user_id = loggedIn[0]['$id'];
  const accounts = await getAccounts({ 
    userId: user_id
  })

  if(!accounts) return;
  
  const accountsData = accounts?.data;
  return (
    <section className='payment-transfer'>
      <HeaderBox 
        title='Payment Transfer'
        subtext='Securely transferring your funds with ease and confidence.'
      />
      <section className="size-full pt-5">
        <PaymentTransferForm 
          accounts={accountsData}
        />
      </section>
    </section>
  )
}

export default PaymentTransfer