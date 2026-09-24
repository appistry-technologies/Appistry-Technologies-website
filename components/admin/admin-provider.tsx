"use client";
import {createContext,useContext,useEffect,useState} from "react";
import {onIdTokenChanged,signOut as firebaseSignOut,type User} from "firebase/auth";
import {auth} from "@/lib/firebase";
const AdminContext=createContext<{user:User|null;isAdmin:boolean;isLoading:boolean;signOut:()=>Promise<void>}>({user:null,isAdmin:false,isLoading:true,signOut:async()=>{}});
export function AdminProvider({children}:{children:React.ReactNode}){const [state,setState]=useState<{user:User|null;isAdmin:boolean;isLoading:boolean}>({user:null,isAdmin:false,isLoading:true});useEffect(()=>{let active=true;const unsubscribe=onIdTokenChanged(auth,async user=>{try{const token=await user?.getIdTokenResult();const allow=(process.env.NEXT_PUBLIC_ADMIN_EMAILS||"").split(",").map(v=>v.trim().toLowerCase()).filter(Boolean);const isAdmin=token?.claims.admin===true||!!(user?.emailVerified&&allow.includes(user.email?.toLowerCase()||""));if(active)setState({user,isAdmin,isLoading:false});}catch{if(active)setState({user,isAdmin:false,isLoading:false});}});return()=>{active=false;unsubscribe();};},[]);return <AdminContext.Provider value={{...state,signOut:()=>firebaseSignOut(auth)}}>{children}</AdminContext.Provider>;}
export const useAdmin=()=>useContext(AdminContext);
