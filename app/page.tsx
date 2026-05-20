"use client"

import { useState } from "react"
import { ProductHero } from "@/components/product-hero"
import { AcceptanceTest } from "@/components/acceptance-test"
import { DescriptiveTest } from "@/components/descriptive-test"
import { Button } from "@/components/ui/button"
import { ClipboardList, FileText, Cookie } from "lucide-react"

type TabType = "info" | "acceptance" | "descriptive"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("info")

  const tabs = [
    { id: "info" as const, label: "Información", icon: Cookie },
    { id: "acceptance" as const, label: "Prueba de Aceptabilidad", icon: ClipboardList },
    { id: "descriptive" as const, label: "Prueba Descriptiva", icon: FileText },
  ]

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-lg md:text-xl font-semibold text-center">
            Evaluación Sensorial - Galletitas Vegetales Sustentables
          </h1>
          <p className="text-sm text-center opacity-90 mt-1">
            Facultad de Ciencias de la Salud y Bienestar
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === "info" && <ProductHero />}
        {activeTab === "acceptance" && <AcceptanceTest />}
        {activeTab === "descriptive" && <DescriptiveTest />}
      </div>

      {/* Footer */}
      <footer className="bg-primary/10 border-t border-border py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Proyecto de Desarrollo de Galletitas Vegetales Sustentables
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Avena, Lentejas, Vegetales y Chocolate
          </p>
        </div>
      </footer>
    </main>
  )
}
