"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const CustomDialog = ({ openDialog, setOpenDialog, closeDialog }) => {
  const CreateUser=useMutation(api.users.createUser)
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user=userInfo?.data;
      await CreateUser({
        name:user?.name,
        email:user?.email,
        picture:user?.picture,
        uid:uuidv4()
      });

      if(typeof window!==undefined){
        localStorage.setItem('user',JSON.stringify(user));
      }

      setUserDetail(userInfo?.data);
      closeDialog(false);
      if (userInfo) setOpenDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <div>
      {(openDialog&&userDetail==null)&& (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <div className="flex flex-col items-center gap-3">
                <DialogTitle className="text-center text-2xl font-bold">
                  Let's Webify your own Innovative Ideas
                </DialogTitle>
                <DialogDescription className="text-center font-extralight  ">
                  Sign In to Proceed
                </DialogDescription>
                <Button onClick={googleLogin} className="mt-2">
                  Sign In with Google <LogInIcon></LogInIcon>
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CustomDialog;
