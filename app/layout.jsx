import './globals.css';
import Providers from '@/components/providers';
import {Header,Footer} from '@/components/shell';
export const metadata={title:{default:'Forma — Thoughtful pieces. Everyday living.',template:'%s | Forma'},description:'Discover considered furniture and objects for a home that feels like you.'};
export default function RootLayout({children}){return <html lang="en"><body><Providers><a className="skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></Providers></body></html>}
