'use client';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
export function ProductImage({src,alt,className=''}){return <img className={className} src={src} alt={alt} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src='/placeholder.svg';}}/>}
export default function Card({item}){return <article className="product-card"><Link href={`/items/${item.id}`} className="product-image"><ProductImage src={item.image} alt={item.title}/><span className="tag">{item.category}</span><span className="round-arrow"><ArrowUpRight size={19}/></span></Link><div className="product-title"><h3><Link href={`/items/${item.id}`}>{item.title}</Link></h3><span>${item.price.toLocaleString()}</span></div><p>{item.short}</p><Link className="detail-link" href={`/items/${item.id}`}>View Details <ArrowUpRight size={14}/></Link></article>}
