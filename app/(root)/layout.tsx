import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn= { firstName: 'Vinay', lastName:'Gajula'}
  return (
    <main className="h-screen w-full flex font-inter">
        <SideBar user={loggedIn} />
        <div className="flex flex-col size-full">
          <div className="root-layout">
            <Image 
              src='/icons/logo.svg'
              alt="logo"
              height={30}
              width={30}
            />
            <div>
              <MobileNav 
                user={loggedIn}
              />
            </div>
          </div>
          {children}
        </div>
        
    </main>
  );
}