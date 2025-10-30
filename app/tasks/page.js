'use client'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'
import PersianDateTimePicker from '../../components/PersianDateTimePicker'
import { useState, useEffect } from 'react'

export default function Tasks(){
  const [tasks, setTasks] = useState(()=>JSON.parse(localStorage.getItem('zist_tasks')||'[]'))
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState('')
  useEffect(()=>{ localStorage.setItem('zist_tasks', JSON.stringify(tasks)) },[tasks])
  function addTask(){ const item = { id: Date.now(), title: title||'بدون عنوان', datetime: datetime||'', done:false }; setTasks(prev=>[item,...prev]); setShowAdd(false); setTitle(''); setDatetime('') }
  return (
    <div className='container'>
      <Header title='تسک‌ها' />
      <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3>تمام تسک‌ها</h3>
        <button onClick={()=>setShowAdd(true)}>+ افزودن</button>
      </div>
      {showAdd && (
        <div className='card'>
          <input className='input' placeholder='عنوان' value={title} onChange={e=>setTitle(e.target.value)} />
          <PersianDateTimePicker value={datetime} onChange={v=>setDatetime(v)} />
          <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
            <button onClick={()=>setShowAdd(false)}>لغو</button>
            <button onClick={addTask}>ذخیره</button>
          </div>
        </div>
      )}
      {tasks.map(t=>(
        <div key={t.id} className='card' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontWeight:600}}>{t.title}</div>
            <div style={{fontSize:12,opacity:0.6}}>{t.datetime}</div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <input type='checkbox' checked={t.done} onChange={()=>setTasks(prev=>prev.map(x=>x.id===t.id?{...x,done:!x.done}:x))} />
            <button onClick={()=>setTasks(prev=>prev.filter(x=>x.id!==t.id))} style={{color:'#ef4444'}}>حذف</button>
          </div>
        </div>
      ))}
      <BottomNav page='tasks' />
    </div>
  )
}
