'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {onAuthStateChanged,signOut} from 'firebase/auth';
import {configured,firebaseAuth} from '@/lib/firebase';
import {products as initial} from '@/lib/data';
const Context=createContext({user:null,loading:true,items:initial,ready:false,add:()=>{},remove:()=>{},logout:async()=>{}});
export const useApp=()=>useContext(Context);
export default function Providers({children}){
 const [user,setUser]=useState(null),[loading,setLoading]=useState(true),[items,setItems]=useState(initial),[ready,setReady]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem('forma-products');if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed)&&parsed.every(p=>typeof p.id==='string'&&typeof p.title==='string'&&typeof p.short==='string'&&typeof p.description==='string'&&typeof p.category==='string'&&typeof p.image==='string'&&typeof p.material==='string'&&typeof p.price==='number'))setItems(parsed);}}catch{}setReady(true);if(!configured){setLoading(false);return;}return onAuthStateChanged(firebaseAuth(),u=>{setUser(u);setLoading(false);},()=>setLoading(false));},[]);
 function save(next){localStorage.setItem('forma-products',JSON.stringify(next));setItems(next);}
 return <Context.Provider value={{user,loading,items,ready,add:p=>{if(!user)throw Error('Please sign in.');save([p,...items]);},remove:id=>{if(!user)throw Error('Please sign in.');save(items.filter(p=>p.id!==id));},logout:()=>signOut(firebaseAuth())}}>{children}</Context.Provider>
}
