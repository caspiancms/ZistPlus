'use client'
import { useEffect } from 'react'
export default function Splash({ onDone }){ useEffect(()=>{ const t=setTimeout(()=>onDone(),1400); return ()=>clearTimeout(t) },[]); return (<div className='splash'><div className='logo spin'><img src='/icons/logo.svg' alt='logo' /></div><div className='splash-title'>ZistPlus</div></div>)}
