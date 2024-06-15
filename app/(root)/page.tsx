import HeaderBox from '@/components/HeaderBox';
import RightSideBar from '@/components/RightSideBar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

const Home = () => {
  const loggedIn= { firstName: 'Vinay' , lastName:'Gajula', email:'vgajula54@gmail.com'}
  return (
    <section className='home'>
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || 'Guest'}
            subtext= "Access and Manage your account and transaction efficiently"
          />

          <TotalBalanceBox 
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1650.45}
          />
        </header>
        RECENT TRANSACTION
      </div>
      <RightSideBar 
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 156.50}, {currentBalance: 342.5}]}
      />
    </section>
  )
}

export default Home;