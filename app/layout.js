import '../styles/globals.css'

export const metadata = {
  title: 'ZistPlus',
  description: 'مدیریت زندگی هوشمند'
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  )
}
