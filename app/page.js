'use client'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import Splash from '../components/Splash'
import { formatGregorianToJalaliString } from '../components/jalali'

export default function Page(){
  const [splashDone, setSplashDone] = useState(()=>localStorage.getItem('zist_splash_done')==='1')
  const [tasks, setTasks] = useState(()=>JSON.parse(localStorage.getItem('zist_tasks')||'[]'))
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  useEffect(()=>{ localStorage.setItem('zist_tasks', JSON.stringify(tasks)) },[tasks])

  function addTask(){ const datetime = date ? (time ? `${date}T${time}` : `${date}T00:00`) : ''; const item = { id: Date.now(), title: title||'بدون عنوان', datetime, done:false }; setTasks(prev=>[item, ...prev]); setShowAdd(false); setTitle(''); setDate(''); setTime('') }

  if(!splashDone) return <Splash onDone={()=>{ setSplashDone(true); localStorage.setItem('zist_splash_done','1') }} />

  return (
    <div>
      <Header title="تسک‌ها" />
      <div style={{marginTop:12, marginBottom:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontWeight:600}}>تسک‌ها</div>
        <button onClick={()=>setShowAdd(true)}>+ افزودن</button>
      </div>
      {showAdd && (
        <div className='card'>
          <input className='input' placeholder='عنوان تسک' value={title} onChange={e=>setTitle(e.target.value)} />
          <div style={{display:'flex',gap:8}}>
            <input className='input' type='date' value={date} onChange={e=>setDate(e.target.value)} />
            <input className='input' type='time' value={time} onChange={e=>setTime(e.target.value)} />
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
            <button onClick={()=>setShowAdd(false)}>لغو</button>
            <button onClick={addTask}>ذخیره</button>
          </div>
        </div>
      )}
      {tasks.length===0 && <div style={{opacity:0.6}}>هیچ تسکی وجود ندارد</div>}
      {tasks.map(t=>(
        <div key={t.id} className='card' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:10,alignItems:'center'}}>
            <input type='checkbox' checked={t.done} readOnly />
            <div>
              <div style={{textDecoration: t.done? 'line-through':'none'}}>{t.title}</div>
              <div style={{fontSize:12,opacity:0.6}}>{formatGregorianToJalaliString(t.datetime)}</div>
            </div>
          </div>
          <div><button onClick={()=>setTasks(prev=>prev.filter(x=>x.id!==t.id))} style={{color:'#ef4444'}}>🗑</button></div>
        </div>
      ))}
      <BottomNav page='tasks' />
    </div>
  )
}
