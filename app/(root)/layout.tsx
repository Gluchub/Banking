import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn= await getLoggedInUser()
  if (!loggedIn) redirect('/sign-in')
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