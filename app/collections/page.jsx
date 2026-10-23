import Link from 'next/link';
import {products,categories} from '@/lib/data';
export const metadata={title:'Collections'};
export default function Collections(){return <div className="wrap page"><span className="eyebrow">A HOME, PIECE BY PIECE</span><h1>Find your everyday.</h1><p className="lead">Four considered collections. Endless ways to make them yours.</p><div className="collection-grid collections-page">{categories.map(c=><Link className="collection-card" key={c} href={`/items?category=${c}`} style={{backgroundImage:`linear-gradient(transparent,rgba(0,0,0,.6)),url(${products.find(p=>p.category===c).image})`}}><span><small>THE FORMA EDIT</small><h2>{c}</h2></span><span>↗</span></Link>)}</div></div>}
