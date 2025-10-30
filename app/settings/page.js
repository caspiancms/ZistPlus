'use client'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'
import { useState, useEffect } from 'react'
export default function Settings(){
  const [dark,setDark]=useState(()=>localStorage.getItem('zist_dark')==='true')
  useEffect(()=>{ localStorage.setItem('zist_dark', dark); if(dark) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark') },[dark])
  return (
    <div className='container'>
      <Header title='تنظیمات' />
      <div style={{marginTop:12}} className='card'>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>حالت تاریک</div>
          <input type='checkbox' checked={dark} onChange={e=>setDark(e.target.checked)} />
        </div>
      </div>
      <BottomNav page='settings' />
    </div>
  )
}
