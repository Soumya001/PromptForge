import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import {
  Flame,
  LayoutTemplate,
  BarChart3,
  Settings,
  Github,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Star,
} from 'lucide-react'

const navItems = [
  { icon: Flame, label: 'Forge', path: '/forge' },
  { icon: LayoutTemplate, label: 'Templates', path: '/templates' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const sidebarWidth = collapsed ? 'w-16' : 'w-[260px]'

  return (
    <div className="flex h-screen bg-[#08070B]">
      {/* Sidebar */}
      <aside
        className={`${sidebarWidth} flex-shrink-0 bg-[#0F0E14] border-r border-[#252430] flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-[#252430]">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="PromptForge" className="w-8 h-8" />
            {!collapsed && (
              <img src="/logo-wordmark.svg" alt="PromptForge AI" className="h-5" />
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 h-10 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2A2933] text-[#F0EEF5] border-l-[3px] border-[#8B5CF6]'
                    : 'text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5] border-l-[3px] border-transparent'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[#8B5CF6]' : ''}`}
                />
                {!collapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-[#252430] space-y-1">
          <a
            href="https://github.com/promptforge-ai/promptforge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 h-10 px-3 rounded-lg text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5] transition-all duration-200"
          >
            <Github className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">GitHub</span>}
          </a>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 h-10 px-3 rounded-lg text-[#6D6A80] hover:bg-[#1E1D26] hover:text-[#9C99AD] transition-all duration-200"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span className="text-xs">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-14 flex-shrink-0 bg-[#08070B]/80 backdrop-blur-[12px] border-b border-[#252430] flex items-center justify-between px-6">
          {/* Breadcrumb / Page Title */}
          <div className="text-[#F0EEF5] font-display font-semibold text-sm capitalize">
            {location.pathname.replace('/', '') || 'Dashboard'}
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-2 w-[280px] h-7 bg-[#16151D] border border-[#252430] rounded-lg px-3 focus-within:border-[#3A3852] transition-colors">
              <Search className="w-4 h-4 text-[#6D6A80] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-[#F0EEF5] text-xs w-full placeholder:text-[#6D6A80]"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/promptforge-ai/promptforge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#16151D] border border-[#3A3852] rounded-lg text-[#9C99AD] hover:text-[#F0EEF5] hover:border-[#8B5CF6] transition-all duration-200 text-xs"
            >
              <Star className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Star</span>
            </a>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9C99AD] hover:bg-[#1E1D26] hover:text-[#F0EEF5] transition-all duration-200">
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-[1280px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
