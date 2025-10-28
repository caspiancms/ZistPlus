'use client'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'
import { formatGregorianToJalaliString } from '../../components/jalali'
const BANKS = [
  {code:'melli', name:'بانک ملی ایران', logo:'/icons/banks/melli.svg'},
  {code:'mellat', name:'بانک ملت', logo:'/icons/banks/mellat.svg'},
  {code:'saderat', name:'بانک صادرات ایران', logo:'/icons/banks/saderat.svg'},
  {code:'tejarat', name:'بانک تجارت', logo:'/icons/banks/tejarat.svg'},
  {code:'parsian', name:'بانک پارسیان', logo:'/icons/banks/parsian.svg'},
  {code:'pasargad', name:'بانک پاسارگاد', logo:'/icons/banks/pasargad.svg'},
  {code:'saman', name:'بانک سامان', logo:'/icons/banks/saman.svg'},
  {code:'eghtesad_novin', name:'بانک اقتصاد نوین', logo:'/icons/banks/eghtesad_novin.svg'},
  {code:'keshavarzi', name:'بانک کشاورزی', logo:'/icons/banks/keshavarzi.svg'},
  {code:'refah', name:'بانک رفاه کارگران', logo:'/icons/banks/refah.svg'}
]

export default function Finance(){
  const [txs, setTxs] = useState(()=>JSON.parse(localStorage.getItem('zist_txs')||'[]'))
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [bank, setBank] = useState('')

  useEffect(()=>{ localStorage.setItem('zist_txs', JSON.stringify(txs)) },[txs])

  function addTx(){
    const item = { id: Date.now(), title: title||'بدون عنوان', amount: Number(amount)||0, date: date? date+'T00:00':'' , bank, type: amount>0 ? 'income' : 'expense' }
    setTxs(prev=>[item,...prev]); setShowAdd(false); setTitle(''); setAmount(''); setDate(''); setBank('')
  }

  return (
    <div>
      <Header title="مدیریت مالی" />
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:12,marginBottom:12}}>
        <div style={{fontWeight:600}}>تراکنش‌ها</div>
        <button onClick={()=>setShowAdd(true)}>+ افزودن</button>
      </div>

      {showAdd && (
        <div className='card'>
          <input className='input' placeholder='عنوان' value={title} onChange={e=>setTitle(e.target.value)} />
          <input className='input' placeholder='مبلغ' value={amount} onChange={e=>setAmount(e.target.value)} />
          <div style={{display:'flex',gap:8}}>
            <input className='input' type='date' value={date} onChange={e=>setDate(e.target.value)} />
            <select className='input' value={bank} onChange={e=>setBank(e.target.value)}>
              <option value=''>انتخاب بانک</option>
              {BANKS.map(b=> <option key={b.code} value={b.code}>{b.name}</option>)}
            </select>
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>
            <button onClick={()=>setShowAdd(false)}>لغو</button>
            <button onClick={addTx}>ذخیره</button>
          </div>
        </div>
      )}

      {txs.length===0 && <div style={{opacity:0.6}}>هیچ تراکنشی وجود ندارد</div>}
      {txs.map(x=>(
        <div key={x.id} className='card' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div>{x.title}</div>
            <div style={{fontSize:12,opacity:0.6}}>{formatGregorianToJalaliString(x.date)} {x.bank}</div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{color:x.type==='income'? '#34D399':'#fb7185'}}>{(x.amount||0).toLocaleString()}</div>
            <button onClick={()=>setTxs(prev=>prev.filter(t=>t.id!==x.id))} style={{color:'#ef4444'}}>🗑</button>
          </div>
      ))}

      <BottomNav page='finance' />
    </div>
  )
}
