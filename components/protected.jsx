'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useApp} from './providers';
export default function Protected({children}){const {user,loading}=useApp();const router=useRouter();useEffect(()=>{if(!loading&&!user)router.replace('/login');},[loading,user,router]);if(loading||!user)return <div className="wrap page" role="status">{loading?'Checking your account…':'Taking you to sign in…'}</div>;return children;}
