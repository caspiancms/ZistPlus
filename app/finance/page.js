'use client'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'
import BankSelect from '../../components/BankSelect'
import PersianDateTimePicker from '../../components/PersianDateTimePicker'
import { useState, useEffect } from 'react'

const BANKS = [
  {code:'melli', name:'بانک ملی ایران', logo:'/banks/melli.svg'},
  {code:'mellat', name:'بانک ملت', logo:'/banks/mellat.svg'},
  {code:'saderat', name:'بانک صادرات', logo:'/banks/saderat.svg'},
  {code:'tejarat', name:'بانک تجارت', logo:'/banks/tejarat.svg'},
  {code:'parsian', name:'بانک پارسیان', logo:'/banks/parsian.svg'},
  {code:'pasargad', name:'بانک پاسارگاد', logo:'/banks/pasargad.svg'},
  {code:'saman', name:'بانک سامان', logo:'/banks/saman.svg'},
  {code:'eghtesad_novin', name:'بانک اقتصاد نوین', logo:'/banks/eghtesad_novin.svg'},
  {code:'keshavarzi', name:'بانک کشاورزی', logo:'/banks/keshavarzi.svg'},
  {code:'refah', name:'بانک رفاه', logo:'/banks/refah.svg'}
]

export default function Finance(){
  const [txs, setTxs] = useState(()=>JSON.parse(localStorage.getItem('zist_txs')||'[]'))
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [bank, setBank] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState('expense')

  useEffect(()=>{ localStorage.setItem('zist_txs', JSON.stringify(txs)) },[txs])

  function addTx(){
    const item = { id: Date.now(), title: title||'بدون عنوان', amount: Number(amount)||0, date: date||'', bank, type };
    setTxs(prev=>[item,...prev]);
    setShowAdd(false); setTitle(''); setAmount(''); setBank(''); setDate('')
  }

  const income = txs.filter(t=>t.type==='income').reduce((s,x)=>s+(x.amount||0),0)
  const expense = txs.filter(t=>t.type==='expense').reduce((s,x)=>s+(x.amount||0),0)

  return (
    <div className='container'>
      <Header title='مالی' />
      <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h3>تراکنش‌ها</h3>
        <button onClick={()=>setShowAdd(true)}>+ افزودن</button>
      </div>

      {showAdd && (
        <div className='card'>
          <input className='input' placeholder='عنوان' value={title} onChange={e=>setTitle(e.target.value)} />
          <input className='input' placeholder='مبلغ' value={amount} onChange={e=>setAmount(e.target.value)} />
          <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
            <label><input type='radio' name='type' value='income' checked={type==='income'} onChange={e=>setType(e.target.value)} /> درآمد</label>
            <label><input type='radio' name='type' value='expense' checked={type==='expense'} onChange={e=>setType(e.target.value)} /> هزینه</label>
          </div>
          <PersianDateTimePicker value={date} onChange={v=>setDate(v)} />
          <BankSelect banks={BANKS} value={bank} onChange={v=>setBank(v)} />
          <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
            <button onClick={()=>setShowAdd(false)}>لغو</button>
            <button onClick={addTx}>ذخیره</button>
          </div>
        </div>
      )}

      <div style={{display:'flex',gap:8,marginTop:12}}>
        <div style={{flex:1}} className='card'><div style={{fontSize:12,opacity:0.6}}>درآمد</div><div style={{fontWeight:700,fontSize:18}}>{income.toLocaleString()}</div></div>
        <div style={{flex:1}} className='card'><div style={{fontSize:12,opacity:0.6}}>هزینه</div><div style={{fontWeight:700,fontSize:18}}>{expense.toLocaleString()}</div></div>
      </div>

      {txs.map(x=>(
        <div key={x.id} className='card' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontWeight:600}}>{x.title}</div>
            <div style={{fontSize:12,opacity:0.6}}>{x.date} - {x.bank}</div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center'}}>
            <div style={{color:x.type==='income'? '#34D399':'#fb7185'}}>{(x.amount||0).toLocaleString()}</div>
            <button onClick={()=>setTxs(prev=>prev.filter(t=>t.id!==x.id))} style={{color:'#ef4444'}}>حذف</button>
          </div>
        </div>
      ))}

      <BottomNav page='finance' />
    </div>
  )
}
