"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StatsOverview } from "./stats-overview"
import { AcceptanceCharts } from "./acceptance-charts"
import { DescriptiveCharts } from "./descriptive-charts"
import { CommentsSection } from "./comments-section"
import { RecentEvaluations } from "./recent-evaluations"
import { LogOut, Cookie, LayoutDashboard, ClipboardCheck, FileText, MessageSquare, ClipboardList } from "lucide-react"

type Tab = "dashboard" | "aceptabilidad" | "descriptiva" | "comentarios" | "evaluaciones"

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard",     label: "Dashboard",      icon: LayoutDashboard },
  { id: "aceptabilidad", label: "Aceptabilidad",  icon: ClipboardCheck  },
  { id: "descriptiva",   label: "Descriptiva",    icon: FileText        },
  { id: "comentarios",   label: "Comentarios",    icon: MessageSquare   },
  { id: "evaluaciones",  label: "Evaluaciones",   icon: ClipboardList   },
]

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")
  const router = useRouter()

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f0e8" }}>

      {/* Header */}
      <header style={{ backgroundColor: "#2f3d2a" }} className="sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-white" />
            <span className="font-semibold text-white text-sm tracking-wide">
              Vita Cookies · Panel de Administración
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition"
            style={{ color: "#fca5a5", backgroundColor: "rgba(255,255,255,0.1)" }}
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Tab navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors"
                  style={{
                    borderBottomColor: isActive ? "#4a6e43" : "transparent",
                    color: isActive ? "#4a6e43" : "#6b7280",
                  }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <StatsOverview />
            <div className="grid md:grid-cols-2 gap-6">
              <AcceptanceCharts compact />
              <DescriptiveCharts compact />
            </div>
            <RecentEvaluations />
          </div>
        )}
        {activeTab === "aceptabilidad" && <AcceptanceCharts />}
        {activeTab === "descriptiva"   && <DescriptiveCharts />}
        {activeTab === "comentarios"   && <CommentsSection />}
        {activeTab === "evaluaciones"  && <RecentEvaluations />}
      </main>
    </div>
  )
}