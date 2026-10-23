'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useRef, useState} from 'react';
import {ArrowUpRight, Menu, X, ChevronDown} from 'lucide-react';
import {useApp} from './providers';
const navigationLinks = [['/', 'Home'], ['/items', 'Explore furniture'], ['/collections', 'Collections'], ['/about', 'Our story']];

export function Header() {
  const {user, logout, loading} = useApp();
  const [open, setOpen] = useState(false);
  const [signOutError, setSignOutError] = useState('');
  const pathname = usePathname();
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const accountRef = useRef(null);

  function closeMenus() {
    setOpen(false);
    if (accountRef.current) accountRef.current.open = false;
  }

  useEffect(() => { closeMenus(); }, [pathname]);
  useEffect(() => {
    function dismiss(event) {
      if (!headerRef.current?.contains(event.target)) closeMenus();
    }
    function escape(event) {
      if (event.key !== 'Escape') return;
      if (accountRef.current?.open) {
        accountRef.current.open = false;
        accountRef.current.querySelector('summary')?.focus();
      } else if (open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function focusOutside(event) {
      if (!headerRef.current?.contains(event.target)) closeMenus();
    }
    const desktop = window.matchMedia('(min-width: 981px)');
    const resize = () => closeMenus();
    desktop.addEventListener('change', resize);
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    document.addEventListener('focusin', focusOutside);
    return () => {
      desktop.removeEventListener('change', resize);
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
      document.removeEventListener('focusin', focusOutside);
    };
  }, [open]);

  async function handleLogout() {
    try { await logout(); closeMenus(); setSignOutError(''); }
    catch { setSignOutError('Unable to sign out. Please try again.'); }
  }

  return <header className="site-header" ref={headerRef}>
    <div className="header-inner wrap">
      <Link href="/" className="logo" aria-label="Forma home" onClick={closeMenus}>forma<span>®</span></Link>
      <button ref={toggleRef} type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="header-menu" onClick={() => setOpen(value => !value)}>
        {open ? <X size={21} aria-hidden="true"/> : <Menu size={21} aria-hidden="true"/>}
      </button>
      <div id="header-menu" className={`header-menu${open ? ' is-open' : ''}`}>
        <nav className="header-links" aria-label="Main navigation">
          {navigationLinks.map(([url, label]) => {
            const active = url === '/' ? pathname === '/' : pathname === url || pathname.startsWith(`${url}/`);
            return <Link key={url} href={url} onClick={closeMenus} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined}>{label}<ArrowUpRight className="mobile-link-arrow" size={17} aria-hidden="true"/></Link>;
          })}
        </nav>
        <div className="header-account">
          {loading ? <span role="status">Loading account…</span> : user ? <details ref={accountRef} className="account-menu">
            <summary><span className="account-avatar" aria-hidden="true">{(user.displayName || user.email || 'F').slice(0, 1).toUpperCase()}</span><span className="account-name">{user.displayName || 'My account'}</span><ChevronDown size={15} aria-hidden="true"/></summary>
            <div className="account-dropdown">
              <div className="account-info"><strong>{user.displayName || 'Forma member'}</strong><small>{user.email}</small></div>
              <Link href="/items/add" onClick={closeMenus}>Add Product <ArrowUpRight size={15}/></Link>
              <Link href="/items/manage" onClick={closeMenus}>Manage Products <ArrowUpRight size={15}/></Link>
              <button type="button" onClick={handleLogout}>Sign out</button>
              {signOutError && <p role="alert">{signOutError}</p>}
            </div>
          </details> : <><Link className="header-login" href="/login" onClick={closeMenus}>Log in</Link><Link className="button header-cta" href="/register" onClick={closeMenus}>Get started <ArrowUpRight size={16} aria-hidden="true"/></Link></>}
        </div>
      </div>
    </div>
  </header>;
}
export function Footer(){return <footer><div className="wrap footer-top"><div><Link className="logo" href="/">forma<span>®</span></Link><p>Thoughtful pieces.<br/>Spaces that feel like you.</p></div><div><span className="eyebrow">EXPLORE</span><Link href="/items">All furniture</Link><Link href="/collections">Collections</Link><Link href="/about">Our story</Link></div><div><span className="eyebrow">YOUR FORMA</span><Link href="/login">Your account</Link><Link href="/items/add">Add a product</Link><Link href="/items/manage">Manage products</Link></div><div className="footer-note">A little less ordinary.<br/><span>A little more you.</span><ArrowUpRight/></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} Forma. All rights reserved.</span><span>Considered design. Everyday living.</span></div></footer>}
