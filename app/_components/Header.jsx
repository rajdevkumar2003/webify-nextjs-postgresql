import { Button } from "@/components/ui/button";
import { OverallContext } from "@/context/OverallContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { googleLogout } from '@react-oauth/google';
import React, { useContext, useEffect } from "react";

const Header = () => {
  
  const {openDialog, setOpenDialog}=useContext(OverallContext);
  const {userDetail,setUserDetail}=useContext(UserDetailContext);

  const handleLogout=()=>{
    googleLogout();
    localStorage.clear('user');
    setOpenDialog(false);
    setUserDetail(null);
  }
  return (
    <div className="flex flex-row justify-between p-4 bg-[#6495ED]">
      <Image 
        src="/logo.svg"
        width={40}
        height={40}
        alt="logo"
      />
      <div className="flex flex-row justify-between gap-6">
        {!userDetail
        ?<Button onClick={()=>setOpenDialog(true)} variant="ghost" className="bg-blue-300">Sign In</Button>
        :<Button onClick={handleLogout} variant="ghost" className="bg-blue-300">LogOut <LogOutIcon/> </Button>
        }
        <Button className=" bg-blue-800">Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
