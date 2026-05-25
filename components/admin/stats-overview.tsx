"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ClipboardCheck, Star, TrendingUp, Clock, CheckCircle } from "lucide-react"

const stats = [
  {
    title: "Total Evaluadores",
    value: "47",
    change: "+12 esta semana",
    icon: Users,
  },
  {
    title: "Pruebas Completadas",
    value: "89",
    change: "47 aceptabilidad, 42 descriptivas",
    icon: ClipboardCheck,
  },
  {
    title: "Promedio Aceptación",
    value: "4.2",
    change: "de 5 puntos",
    icon: Star,
  },
  {
    title: "Tasa de Completado",
    value: "94%",
    change: "+3% vs. semana anterior",
    icon: CheckCircle,
  },
  {
    title: "Tiempo Promedio",
    value: "4:32",
    change: "minutos por evaluación",
    icon: Clock,
  },
  {
    title: "Intención de Compra",
    value: "78%",
    change: "comprarían el producto",
    icon: TrendingUp,
  },
]

export function StatsOverview() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">Resumen General</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}