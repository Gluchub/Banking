
import HeaderBox from '@/components/HeaderBox'
import { Pagination } from '@/components/Pagination';
import TransactionsTable from '@/components/TransactionsTable';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { formatAmount, generateTransactions } from '@/lib/utils';
import React from 'react'

const TransactionnHistory = async ({searchParams: {id, page}}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const user_id = loggedIn[0]['$id'];
  const accounts = await getAccounts({ 
    userId: user_id
  })

  if(!accounts) return;
  
  const accountsData = accounts?.data;
  
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  
  return (
    <div
      className='transactions'
    >
      <div className='transactions-header'>
        <HeaderBox 
          title='Transaction History'
          subtext='see your bank details and transactions'
        />

      </div>
      <div className='space-y-6'>
        <div className='transactions-account'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-18 font-semibold text-white'>{account?.data.name}</h2>
            <p className='text-14 text-blue-25'>{account?.data.officialName}</p>
            <p
             className='relative text-14 font-semibold tracking[1.1px] text-white'
            >●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>
          <div className='transactions-account-balance'>
            <p className='text-14'>Current balance</p>
            <p className='text-24 text-center font-bold'>
              {formatAmount(account?.data.currentBalance)}
            </p>

          </div>
        </div>
        <section className='w-full flex flex-col gap-6'>
          <TransactionsTable 
            transactions={account?.transactions}
          />
          
        </section>
      </div>
    </div>
  )
}

export default TransactionnHistory