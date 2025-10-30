'use client'
export default function Header({title}){
  return (
    <header className="header container">
      <div className="brand">
        <div className="logo"><img src="/icons/logo_green.svg" alt="logo" /></div>
        <div className="title">ZistPlus</div>
      </div>
      <div style={{fontSize:18}}>{title}</div>
    </header>
  )
}
