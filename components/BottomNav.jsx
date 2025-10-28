import Link from 'next/link'
export default function BottomNav({page}){
  return (
    <footer className="bottomNav">
      <Link href='/'><div style={{color: page==='tasks'?'var(--brand)':'#6b7280'}}>✅</div></Link>
      <Link href='/finance'><div style={{color: page==='finance'?'var(--brand)':'#6b7280'}}>💰</div></Link>
      <div className="fab">+</div>
      <Link href='/stats'><div style={{color: page==='stats'?'var(--brand)':'#6b7280'}}>📊</div></Link>
      <Link href='/settings'><div style={{color: page==='settings'?'var(--brand)':'#6b7280'}}>⚙️</div></Link>
    </footer>
  )
}
