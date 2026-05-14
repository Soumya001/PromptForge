import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Forge from './pages/Forge'
import Templates from './pages/Templates'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Layout from './components/Layout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/forge" element={<Forge />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
