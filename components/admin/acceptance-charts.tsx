"use client"

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

interface AcceptanceChartsProps {
  compact?: boolean
}

const hedonicData = [
  { name: "Me disgusta mucho", value: 2, fill: "#C75050" },
  { name: "Me disgusta", value: 4, fill: "#D4896B" },
  { name: "Ni me gusta ni me disgusta", value: 8, fill: "#D4CFC2" },
  { name: "Me gusta", value: 18, fill: "#8BA88B" },
  { name: "Me gusta mucho", value: 15, fill: "#6B8E6B" },
]

const purchaseIntentData = [
  { name: "Definitivamente sí", value: 20, fill: "#6B8E6B" },
  { name: "Probablemente sí", value: 17, fill: "#8BA88B" },
  { name: "No estoy seguro", value: 6, fill: "#D4CFC2" },
  { name: "Probablemente no", value: 3, fill: "#D4896B" },
  { name: "Definitivamente no", value: 1, fill: "#C75050" },
]

const timelineData = [
  { date: "Semana 1", evaluaciones: 8, promedio: 3.8 },
  { date: "Semana 2", evaluaciones: 12, promedio: 4.0 },
  { date: "Semana 3", evaluaciones: 15, promedio: 4.1 },
  { date: "Semana 4", evaluaciones: 12, promedio: 4.3 },
]

const ageGroupData = [
  { grupo: "18-25", cantidad: 15 },
  { grupo: "26-35", cantidad: 18 },
  { grupo: "36-45", cantidad: 8 },
  { grupo: "46-55", cantidad: 4 },
  { grupo: "56+", cantidad: 2 },
]

const COLORS = ["#6B8E6B", "#8BA88B", "#A5C4A5", "#D4896B", "#C75050"]

export function AcceptanceCharts({ compact = false }: AcceptanceChartsProps) {
  if (compact) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Aceptabilidad General</CardTitle>
          <CardDescription>Distribución de respuestas en escala hedónica</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hedonicData} layout="vertical">
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
              <BarChart data={hedonicData}>
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

        {/* Intención de Compra */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Intención de Compra</CardTitle>
            <CardDescription>Probabilidad de compra del producto</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={purchaseIntentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {purchaseIntentData.map((entry, index) => (
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
            <CardDescription>Evaluaciones y promedio por semana</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis dataKey="date" stroke="#5A7A5A" />
                <YAxis yAxisId="left" stroke="#6B8E6B" />
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
              <BarChart data={ageGroupData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis dataKey="grupo" stroke="#5A7A5A" />
                <YAxis stroke="#5A7A5A" />
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
