'use client'
import { useEffect } from 'react'
export default function Splash({onDone, dark}){ useEffect(()=>{ const t=setTimeout(()=>onDone(),1200); return ()=>clearTimeout(t) },[]); return (<div className='splash'><div className={'logo ' + (true? 'spin':'' )}><img src={dark? '/icons/logo_white.svg':'/icons/logo_green.svg'} alt='logo' /></div></div>)}
