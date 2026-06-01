"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ClipboardCheck, Star, TrendingUp, CheckCircle, Apple } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function StatsOverview() {
  const [loading, setLoading] = useState(true)
  const [statsData, setStatsData] = useState({
    totalEvaluators: 0,
    acceptanceCount: 0,
    descriptiveCount: 0,
    avgAcceptance: "0.0",
    completionRate: "0%",
    dailyConsumeRate: "0%",
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: evalCount } = await supabase.from('evaluators').select('*', { count: 'exact', head: true })
        const { count: accCount } = await supabase.from('acceptance_tests').select('*', { count: 'exact', head: true })
        const { count: descCount } = await supabase.from('descriptive_tests').select('*', { count: 'exact', head: true })
        
        const { data: acceptanceData } = await supabase.from('acceptance_tests').select('satisfaccion, consumo_diario')

        let avgAcc = 0
        let dailyConsumeCount = 0
        if (acceptanceData && acceptanceData.length > 0) {
          const totalSatisfaccion = acceptanceData.reduce((acc, curr) => acc + curr.satisfaccion, 0)
          
          
          const mappedSatisfaccion = acceptanceData.reduce((acc, curr) => acc + (curr.satisfaccion + 3), 0)
          avgAcc = mappedSatisfaccion / acceptanceData.length

          dailyConsumeCount = acceptanceData.filter(d => 
            d.consumo_diario?.toLowerCase().includes('si') || 
            d.consumo_diario?.toLowerCase().includes('sí')
          ).length
        }

        const completionRate = evalCount ? Math.round(((accCount || 0) / evalCount) * 100) : 0
        const dailyConsumeRate = acceptanceData?.length ? Math.round((dailyConsumeCount / acceptanceData.length) * 100) : 0

        setStatsData({
          totalEvaluators: evalCount || 0,
          acceptanceCount: accCount || 0,
          descriptiveCount: descCount || 0,
          avgAcceptance: avgAcc.toFixed(1),
          completionRate: `${completionRate}%`,
          dailyConsumeRate: `${dailyConsumeRate}%`,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const stats = [
    {
      title: "Total Evaluadores",
      value: loading ? "..." : statsData.totalEvaluators.toString(),
      change: "Participantes registrados",
      icon: Users,
    },
    {
      title: "Pruebas Completadas",
      value: loading ? "..." : (statsData.acceptanceCount + statsData.descriptiveCount).toString(),
      change: `${statsData.acceptanceCount} aceptabilidad, ${statsData.descriptiveCount} descriptivas`,
      icon: ClipboardCheck,
    },
    {
      title: "Promedio Aceptación",
      value: loading ? "..." : statsData.avgAcceptance,
      change: "Escala 1 a 5",
      icon: Star,
    },
    {
      title: "Tasa de Completado",
      value: loading ? "..." : statsData.completionRate,
      change: "Evaluadores que hicieron el test",
      icon: CheckCircle,
    },
    {
      title: "Intención de Consumo",
      value: loading ? "..." : statsData.dailyConsumeRate,
      change: "Consumirían diariamente",
      icon: TrendingUp,
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-4">Resumen General</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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