'use client'
import { useState } from 'react'
export default function BankSelect({value,onChange,banks}){
  const [local,setLocal]=useState(value||'')
  function onSelect(v){ setLocal(v); onChange && onChange(v) }
  return (
    <div>
      <select className='input' value={local} onChange={e=>onSelect(e.target.value)}>
        <option value=''>انتخاب بانک</option>
        {banks.map(b=> <option key={b.code} value={b.code}>{b.name}</option>)}
      </select>
      {local && (
        <div style={{marginTop:8}} className='bank-row'>
          <img src={banks.find(x=>x.code===local)?.logo} alt={local} />
          <div>{banks.find(x=>x.code===local)?.name}</div>
        </div>
      )}
    </div>
  )
}
