"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProductHero } from "@/components/product-hero"
import { AcceptanceTest } from "@/components/acceptance-test"
import { DescriptiveTest } from "@/components/descriptive-test"
import { Button } from "@/components/ui/button"
import { ClipboardList, FileText, Cookie, LogIn } from "lucide-react"

type TabType = "info" | "acceptance" | "descriptive"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("info")
  const [evaluatorId, setEvaluatorId] = useState<string | null>(null)
  const [acceptanceCompleted, setAcceptanceCompleted] = useState(false)
  const router = useRouter()

  const tabs = [
    { id: "info" as const, label: "Información", icon: Cookie },
    { id: "acceptance" as const, label: "Prueba de Aceptabilidad", icon: ClipboardList },
    { id: "descriptive" as const, label: "Prueba Descriptiva", icon: FileText },
  ]

  const handleTabClick = (tabId: TabType) => {
    if (tabId === "info" && evaluatorId) {
      alert("La información ya fue guardada. Por favor, continúe con las pruebas.")
      return
    }
    if (tabId === "acceptance") {
      if (!evaluatorId) {
        alert("Por favor, complete la Información del Evaluador antes de avanzar.")
        return
      }
      if (acceptanceCompleted) {
        alert("La prueba de aceptabilidad ya fue completada. Por favor, continúe con la prueba descriptiva.")
        return
      }
    }
    if (tabId === "descriptive") {
      if (!evaluatorId) {
        alert("Por favor, complete la Información del Evaluador primero.")
        return
      }
      if (!acceptanceCompleted) {
        alert("Por favor, complete la Prueba de Aceptabilidad antes de avanzar.")
        return
      }
    }
    setActiveTab(tabId)
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 shadow-md relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg md:text-xl font-semibold text-center pr-10 md:pr-0">
            Evaluación Sensorial - Galletitas Vegetales Sustentables
          </h1>
          <p className="text-sm text-center opacity-90 mt-1 pr-10 md:pr-0">
            Universidad de la Cuenca del Plata
          </p>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push("/login")}            
            className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground flex items-center gap-2 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden md:inline">Login Admin</span>
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 justify-center">
            {tabs.map((tab) => {
              const Icon = tab.icon
              let isLocked = false
              if (tab.id === "info" && evaluatorId !== null) isLocked = true
              if (tab.id === "acceptance" && (evaluatorId === null || acceptanceCompleted)) isLocked = true
              if (tab.id === "descriptive" && !acceptanceCompleted) isLocked = true
              
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => handleTabClick(tab.id)}
                  disabled={isLocked && activeTab !== tab.id}
                  className={`flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id ? "" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          {activeTab === "info" && (
            <div className="flex justify-center">
              <ProductHero onComplete={(id) => {
                setEvaluatorId(id);
                setActiveTab("acceptance");
              }} />
            </div>
          )}
          {activeTab === "acceptance" && (
            <div className="max-w-3xl mx-auto">
              <AcceptanceTest 
                evaluatorId={evaluatorId!} 
                onComplete={() => {
                  setAcceptanceCompleted(true);
                  setActiveTab("descriptive");
                }}
              />
            </div>
          )}
          {activeTab === "descriptive" && (
            <div className="max-w-3xl mx-auto">
              <DescriptiveTest evaluatorId={evaluatorId!} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary/10 border-t border-border py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-end">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              Version 1.00
            </p>
          </div>
          <div className="text-center flex-1">
            <p className="text-sm text-muted-foreground">
              Evaluación Sensorial de Galletitas de Avena, Lentejas, Vegetales y Chocolate
            </p>
            <p className="text-xs text-muted-foreground mt-1">
               Univ. de la Cuenca del Plata · Lic. en Nutrición - ISI
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}