'use client'
import Header from '../../components/Header'
import BottomNav from '../../components/BottomNav'

export default function Settings(){
  return (
    <div>
      <Header title='تنظیمات' />
      <div style={{padding:12}}>
        <div style={{marginBottom:8}}><strong>تنظیمات</strong></div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <div>حالت تاریک</div>
          <input type='checkbox' onChange={(e)=>{ if(e.target.checked) localStorage.setItem('zist_theme','dark'); else localStorage.setItem('zist_theme','light'); window.location.reload() }} />
        </div>
      </div>
      <BottomNav page='settings' />
    </div>
  )
}
