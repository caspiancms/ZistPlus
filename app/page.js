'use client'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import Splash from '../components/Splash'
import { useState, useEffect } from 'react'
import { formatGregorianToJalaliString } from '../components/jalali'

export default function Page(){
  const [splashDone, setSplashDone] = useState(()=>localStorage.getItem('zist_splash_done')==='1')
  const [tasks, setTasks] = useState(()=>JSON.parse(localStorage.getItem('zist_tasks')||'[]'))
  useEffect(()=>{ localStorage.setItem('zist_tasks', JSON.stringify(tasks)) },[tasks])
  if(!splashDone) return <Splash onDone={()=>{ setSplashDone(true); localStorage.setItem('zist_splash_done','1') }} />
  return (
    <div className='container'>
      <Header title='داشبورد' />
      <div style={{marginTop:12}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><h3>تسک‌های امروز</h3><a href='/tasks'>مشاهده همه</a></div>
        {tasks.slice(0,3).map(t=> (
          <div key={t.id} className='card' style={{display:'flex',justifyContent:'space-between'}}>
            <div>
              <div style={{fontWeight:600}}>{t.title}</div>
              <div style={{fontSize:12,opacity:0.6}}>{formatGregorianToJalaliString(t.datetime)}</div>
            </div>
            <div><input type='checkbox' checked={t.done} readOnly /></div>
          </div>
        ))}
      </div>
      <BottomNav page='tasks' />
    </div>
  )
}
