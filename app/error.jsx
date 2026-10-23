'use client';
export default function Error({reset}){return <div className="wrap page"><h1>Something went wrong.</h1><p>Please try again.</p><button className="button" onClick={reset}>Try again</button></div>}
