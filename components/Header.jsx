export default function Header({title}){
  return (
    <header className="header">
      <div className="brand">
        <img src="/icons/logo.svg" alt="logo" />
        <div className="title">ZistPlus</div>
      </div>
      <div style={{fontSize:20}}>{title}</div>
    </header>
  )
}
