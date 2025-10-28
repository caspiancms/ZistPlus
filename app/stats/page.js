'use client'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'

export default function Stats(){
  const txs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('zist_txs')||'[]') : []
  const tasks = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('zist_tasks')||'[]') : []
  const totalIncome = txs.filter(x=>x.type==='income').reduce((s,x)=>s+(x.amount||0),0)
  const totalExpense = txs.filter(x=>x.type==='expense').reduce((s,x)=>s+(x.amount||0),0)
  const pieData = [{name:'درآمد', value: totalIncome},{name:'هزینه', value: totalExpense}]
  const tasksDone = tasks.filter(t=>t.done).length
  const tasksTotal = tasks.length
  return (
    <div>
      <Header title='آمار' />
      <div style={{display:'flex',gap:8,marginTop:12}}>
        <div style={{flex:1,padding:10,background:'#fff',borderRadius:8}}>
          <div style={{fontSize:12,opacity:0.6}}>تسک‌های انجام‌شده</div>
          <div style={{fontWeight:700,fontSize:18}}>{tasksDone}/{tasksTotal}</div>
        </div>
        <div style={{flex:1,padding:10,background:'#fff',borderRadius:8}}>
          <div style={{fontSize:12,opacity:0.6}}>درآمد / هزینه</div>
          <PieChart width={200} height={140}>
            <Pie data={pieData} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={50}>
              <Cell fill='#178A34' />
              <Cell fill='#FF7F50' />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      <BottomNav page='stats' />
    </div>
  )
}
