'use client'
import Link from 'next/link'
export default function BottomNav({page}){
  return (
    <footer className="bottomNav container">
      <Link href='/'><div style={{color: page==='home'?'var(--brand)':'#6b7280'}}>🏠</div></Link>
      <Link href='/tasks'><div style={{color: page==='tasks'?'var(--brand)':'#6b7280'}}>✅</div></Link>
      <div className="fab">+</div>
      <Link href='/finance'><div style={{color: page==='finance'?'var(--brand)':'#6b7280'}}>💰</div></Link>
      <Link href='/stats'><div style={{color: page==='stats'?'var(--brand)':'#6b7280'}}>📊</div></Link>
    </footer>
  )
}
