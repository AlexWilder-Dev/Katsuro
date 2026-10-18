import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ShiftProvider } from './lib/shift'
import { OrderSheetProvider } from './components/OrderSheet'
import { NavBar, Noren } from './components/Header'
import { ActionBar } from './components/ActionBar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { Story } from './pages/Story'
import { Visit } from './pages/Visit'

const titles: Record<string, string> = {
  '/': 'Katsuro · Real Japanese katsu on St John’s Hill, Clapham Junction',
  '/menu': 'Menu · Katsuro',
  '/story': 'Our story · Katsuro',
  '/visit': 'Visit · Katsuro, 189 St John’s Hill',
}

function ScrollAndTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = titles[pathname] ?? titles['/']
  }, [pathname])
  return null
}

export function App() {
  return (
    <ShiftProvider>
      <OrderSheetProvider>
        <ScrollAndTitle />
        <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>
          Skip to content
        </a>
        <Noren />
        <NavBar />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/story" element={<Story />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <ActionBar />
      </OrderSheetProvider>
    </ShiftProvider>
  )
}
