'use client'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'
import DonutChart from '../../components/DonutChart'
export default function Stats(){
  const txs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('zist_txs')||'[]') : []
  const totalIncome = txs.filter(x=>x.type==='income').reduce((s,x)=>s+(x.amount||0),0)
  const totalExpense = txs.filter(x=>x.type==='expense').reduce((s,x)=>s+(x.amount||0),0)
  return (
    <div className='container'>
      <Header title='آمار' />
      <div style={{display:'flex',gap:12,marginTop:12}}>
        <div style={{flex:1}} className='card'><div style={{fontSize:12,opacity:0.6}}>درآمد</div><div style={{fontWeight:700,fontSize:18}}>{totalIncome.toLocaleString()}</div></div>
        <div style={{flex:1}} className='card'><div style={{fontSize:12,opacity:0.6}}>هزینه</div><div style={{fontWeight:700,fontSize:18}}>{totalExpense.toLocaleString()}</div></div>
      </div>
      <div style={{marginTop:12,display:'flex',justifyContent:'center'}} className='card'><DonutChart income={totalIncome} expense={totalExpense} /></div>
      <BottomNav page='stats' />
    </div>
  )
}
