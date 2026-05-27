"use client"

import { useState } from "react"
import { StatsOverview } from "@/components/admin/stats-overview"
import { AcceptanceCharts } from "@/components/admin/acceptance-charts"
import { DescriptiveCharts } from "@/components/admin/descriptive-charts"
import { CommentsSection } from "@/components/admin/comments-section"
import { RecentEvaluations } from "@/components/admin/recent-evaluations"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  MessageSquare, 
  TrendingUp,
  Download,
  RefreshCw,
  ArrowLeft,
  PieChart,
  Leaf,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

type AdminTab = "overview" | "acceptance" | "descriptive" | "comments"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const tabs = [
    { 
      id: "overview" as const, 
      label: "Resumen General", 
      icon: TrendingUp,
      description: "Vista general de métricas"
    },
    { 
      id: "acceptance" as const, 
      label: "Aceptabilidad", 
      icon: PieChart,
      description: "Análisis hedónico"
    },
    { 
      id: "descriptive" as const, 
      label: "Descriptivo", 
      icon: BarChart3,
      description: "Perfil sensorial"
    },
    { 
      id: "comments" as const, 
      label: "Comentarios", 
      icon: MessageSquare,
      description: "Feedback de evaluadores"
    },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleExport = () => {
    alert("Exportando datos a CSV...")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 bg-card border-r border-border flex flex-col fixed h-full">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">Panel Admin</h1>
              <p className="text-xs text-muted-foreground">Evaluación Sensorial</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">
            Navegación
          </p>
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full group relative flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300 ease-out
                  ${isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]" 
                    : "hover:bg-secondary text-foreground hover:scale-[1.01]"
                  }
                `}
              >
                {/* Active indicator bar */}
                <div className={`
                  absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full
                  transition-all duration-300
                  ${isActive ? "h-8 bg-primary-foreground" : "h-0 bg-primary"}
                `} />
                
                {/* Icon container */}
                <div className={`
                  w-9 h-9 rounded-lg flex items-center justify-center
                  transition-all duration-300
                  ${isActive 
                    ? "bg-primary-foreground/20" 
                    : "bg-secondary group-hover:bg-primary/10"
                  }
                `}>
                  <Icon className={`w-4 h-4 transition-transform duration-300 ${isActive ? "" : "group-hover:scale-110"}`} />
                </div>
                
                {/* Text */}
                <div className="flex-1 text-left">
                  <p className={`text-sm font-medium ${isActive ? "" : "group-hover:text-primary"}`}>
                    {tab.label}
                  </p>
                  <p className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {tab.description}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight className={`
                  w-4 h-4 transition-all duration-300
                  ${isActive 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0"
                  }
                `} />
              </button>
            )
          })}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
            Acciones
          </p>
          <button
            onClick={handleRefresh}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm
              bg-accent/50 hover:bg-accent text-foreground
              transition-all duration-200 hover:shadow-md group"
          >
            <RefreshCw className={`w-4 h-4 transition-transform group-hover:rotate-180 duration-500 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Actualizar datos</span>
          </button>
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm
              bg-accent/50 hover:bg-accent text-foreground
              transition-all duration-200 hover:shadow-md group"
          >
            <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5 duration-200" />
            <span>Exportar CSV</span>
          </button>
        </div>

        {/* Back button */}
        <div className="p-4 border-t border-border">
          <Link href="/" className="block">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl
              bg-secondary hover:bg-primary hover:text-primary-foreground
              text-foreground font-medium text-sm
              transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
              <span>Volver al formulario</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Top bar */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-10 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {tabs.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-muted-foreground">
                {tabs.find(t => t.id === activeTab)?.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Última actualización</p>
                <p className="text-xs text-muted-foreground">
                  {new Date().toLocaleString("es-AR", { 
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <StatsOverview />
              <div className="grid lg:grid-cols-2 gap-8">
                <AcceptanceCharts compact />
                <DescriptiveCharts compact />
              </div>
              <RecentEvaluations />
            </div>
          )}
          {activeTab === "acceptance" && <AcceptanceCharts />}
          {activeTab === "descriptive" && <DescriptiveCharts />}
          {activeTab === "comments" && <CommentsSection />}
        </div>

        {/* Footer */}
        <footer className="border-t border-border py-6 px-8 mt-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>Panel Administrativo - Evaluación Sensorial de Galletitas Vegetales</p>
            <p>Facultad de Ciencias de la Salud y Bienestar</p>
          </div>
        </footer>
      </main>
    </div>
  )
}
