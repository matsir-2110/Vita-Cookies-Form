"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { supabase } from "@/lib/supabase"

interface AcceptanceChartsProps {
  compact?: boolean
}

const COLORS = ["#6B8E6B", "#8BA88B", "#A5C4A5", "#D4896B", "#C75050"]
const PIE_COLORS = ["#6B8E6B", "#D4896B"]

export function AcceptanceCharts({ compact = false }: AcceptanceChartsProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    hedonicData: [] as any[],
    snacksData: [] as any[],
    timelineData: [] as any[],
    ageGroupData: [] as any[],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: evaluators } = await supabase.from('evaluators').select('id, edad, consume_snacks, created_at')
        const { data: acceptance } = await supabase.from('acceptance_tests').select('satisfaccion, created_at')

        // 1. Hedonic Data (-2 to 2)
        const hedonicCounts = {
          "2": 0, "1": 0, "0": 0, "-1": 0, "-2": 0
        }
        acceptance?.forEach(a => {
          if (hedonicCounts[a.satisfaccion.toString()] !== undefined) {
            hedonicCounts[a.satisfaccion.toString()]++
          }
        })

        const hedonicData = [
          { name: "Me disgusta mucho", value: hedonicCounts["-2"], fill: "#C75050" },
          { name: "Me disgusta", value: hedonicCounts["-1"], fill: "#D4896B" },
          { name: "Ni me gusta ni me disgusta", value: hedonicCounts["0"], fill: "#D4CFC2" },
          { name: "Me gusta", value: hedonicCounts["1"], fill: "#8BA88B" },
          { name: "Me gusta mucho", value: hedonicCounts["2"], fill: "#6B8E6B" },
        ]

        // 2. Consume Snacks (replacing Purchase Intent since it's free text)
        let snacksYes = 0
        let snacksNo = 0
        evaluators?.forEach(e => {
          if (e.consume_snacks?.toLowerCase() === 'si' || e.consume_snacks?.toLowerCase() === 'sí') snacksYes++
          else if (e.consume_snacks?.toLowerCase() === 'no') snacksNo++
        })
        const snacksData = [
          { name: "Sí consume snacks saludables", value: snacksYes, fill: PIE_COLORS[0] },
          { name: "No consume", value: snacksNo, fill: PIE_COLORS[1] },
        ]

        // 3. Timeline Data (by date)
        const dateMap: Record<string, { totalScore: number; count: number }> = {}
        acceptance?.forEach(a => {
          if (a.created_at) {
            const dateObj = new Date(a.created_at)
            const dateStr = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`
            if (!dateMap[dateStr]) dateMap[dateStr] = { totalScore: 0, count: 0 }
            // Map score -2..2 to 1..5
            dateMap[dateStr].totalScore += (a.satisfaccion + 3)
            dateMap[dateStr].count++
          }
        })
        const timelineData = Object.keys(dateMap).map(date => ({
          date,
          evaluaciones: dateMap[date].count,
          promedio: Number((dateMap[date].totalScore / dateMap[date].count).toFixed(1)),
        }))

        // 4. Age Group Data
        const ageGroups = {
          "18-25": 0, "26-35": 0, "36-45": 0, "46-55": 0, "56+": 0
        }
        evaluators?.forEach(e => {
          const age = e.edad
          if (age >= 18 && age <= 25) ageGroups["18-25"]++
          else if (age >= 26 && age <= 35) ageGroups["26-35"]++
          else if (age >= 36 && age <= 45) ageGroups["36-45"]++
          else if (age >= 46 && age <= 55) ageGroups["46-55"]++
          else if (age >= 56) ageGroups["56+"]++
        })
        const ageGroupData = Object.keys(ageGroups).map(k => ({
          grupo: k,
          cantidad: ageGroups[k as keyof typeof ageGroups]
        }))

        setData({ hedonicData, snacksData, timelineData, ageGroupData })
      } catch (error) {
        console.error("Error fetching acceptance charts data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Cargando gráficos...</div>
  }

  if (compact) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Aceptabilidad General</CardTitle>
          <CardDescription>Distribución de respuestas en escala hedónica</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data.hedonicData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
              <XAxis type="number" stroke="#5A7A5A" />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={60} 
                stroke="#5A7A5A"
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => value.split(" ").slice(-1)[0]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#FEFCF7", 
                  border: "1px solid #D4CFC2",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Análisis de Prueba de Aceptabilidad</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Escala Hedónica */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Escala Hedónica</CardTitle>
            <CardDescription>Distribución de respuestas de aceptación general</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.hedonicData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis 
                  dataKey="name" 
                  stroke="#5A7A5A" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" ").slice(-1)[0]}
                />
                <YAxis stroke="#5A7A5A" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FEFCF7", 
                    border: "1px solid #D4CFC2",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Consumo Snacks */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Hábitos de Consumo</CardTitle>
            <CardDescription>Evaluadores que consumen snacks saludables</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.snacksData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.snacksData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FEFCF7", 
                    border: "1px solid #D4CFC2",
                    borderRadius: "8px"
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: "12px" }}
                  formatter={(value) => <span style={{ color: "#2D4A2D" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Evolución Temporal */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Evolución Temporal</CardTitle>
            <CardDescription>Evaluaciones y promedio por día</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis dataKey="date" stroke="#5A7A5A" />
                <YAxis yAxisId="left" stroke="#6B8E6B" allowDecimals={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#D4896B" domain={[0, 5]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FEFCF7", 
                    border: "1px solid #D4CFC2",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="evaluaciones" 
                  stroke="#6B8E6B" 
                  strokeWidth={2}
                  dot={{ fill: "#6B8E6B" }}
                  name="Evaluaciones"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="promedio" 
                  stroke="#D4896B" 
                  strokeWidth={2}
                  dot={{ fill: "#D4896B" }}
                  name="Promedio"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribución por Edad */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Distribución por Edad</CardTitle>
            <CardDescription>Cantidad de evaluadores por grupo etario</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis dataKey="grupo" stroke="#5A7A5A" />
                <YAxis stroke="#5A7A5A" allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FEFCF7", 
                    border: "1px solid #D4CFC2",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="cantidad" fill="#6B8E6B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
