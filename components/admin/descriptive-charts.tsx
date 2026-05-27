"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { supabase } from "@/lib/supabase"

interface DescriptiveChartsProps {
  compact?: boolean
}

export function DescriptiveCharts({ compact = false }: DescriptiveChartsProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    attributeAverages: [] as any[],
    comparisonData: [] as any[],
    colorData: [] as any[],
    aromaData: [] as any[],
    saborData: [] as any[],
    texturaData: [] as any[],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: tests } = await supabase.from('descriptive_tests').select('color, aroma, sabor, textura')
        
        if (!tests || tests.length === 0) {
          setLoading(false)
          return
        }

        const counts = {
          color: [0, 0, 0, 0, 0],
          aroma: [0, 0, 0, 0, 0],
          sabor: [0, 0, 0, 0, 0],
          textura: [0, 0, 0, 0, 0],
        }

        let sums = { color: 0, aroma: 0, sabor: 0, textura: 0 }

        tests.forEach(t => {
          if (t.color >= 1 && t.color <= 5) { counts.color[t.color - 1]++; sums.color += t.color }
          if (t.aroma >= 1 && t.aroma <= 5) { counts.aroma[t.aroma - 1]++; sums.aroma += t.aroma }
          if (t.sabor >= 1 && t.sabor <= 5) { counts.sabor[t.sabor - 1]++; sums.sabor += t.sabor }
          if (t.textura >= 1 && t.textura <= 5) { counts.textura[t.textura - 1]++; sums.textura += t.textura }
        })

        const count = tests.length
        const avg = {
          color: Number((sums.color / count).toFixed(1)),
          aroma: Number((sums.aroma / count).toFixed(1)),
          sabor: Number((sums.sabor / count).toFixed(1)),
          textura: Number((sums.textura / count).toFixed(1)),
        }

        const attributeAverages = [
          { attribute: "Color", promedio: avg.color, fullMark: 5 },
          { attribute: "Aroma", promedio: avg.aroma, fullMark: 5 },
          { attribute: "Sabor", promedio: avg.sabor, fullMark: 5 },
          { attribute: "Textura", promedio: avg.textura, fullMark: 5 },
        ]

        const comparisonData = [
          { name: "Color", valor: avg.color },
          { name: "Aroma", valor: avg.aroma },
          { name: "Sabor", valor: avg.sabor },
          { name: "Textura", valor: avg.textura },
        ]

        const colorData = [
          { nivel: "1 - Muy claro", cantidad: counts.color[0] },
          { nivel: "2 - Claro", cantidad: counts.color[1] },
          { nivel: "3 - Dorado", cantidad: counts.color[2] },
          { nivel: "4 - Marrón claro", cantidad: counts.color[3] },
          { nivel: "5 - Marrón oscuro", cantidad: counts.color[4] },
        ]

        const aromaData = [
          { nivel: "1 - Imperceptible", cantidad: counts.aroma[0] },
          { nivel: "2 - Leve", cantidad: counts.aroma[1] },
          { nivel: "3 - Moderado", cantidad: counts.aroma[2] },
          { nivel: "4 - Intenso", cantidad: counts.aroma[3] },
          { nivel: "5 - Muy intenso", cantidad: counts.aroma[4] },
        ]

        const saborData = [
          { nivel: "1 - Muy suave", cantidad: counts.sabor[0] },
          { nivel: "2 - Suave", cantidad: counts.sabor[1] },
          { nivel: "3 - Balanceado", cantidad: counts.sabor[2] },
          { nivel: "4 - Intenso", cantidad: counts.sabor[3] },
          { nivel: "5 - Muy intenso", cantidad: counts.sabor[4] },
        ]

        const texturaData = [
          { nivel: "1 - Muy blanda", cantidad: counts.textura[0] },
          { nivel: "2 - Blanda", cantidad: counts.textura[1] },
          { nivel: "3 - Intermedia", cantidad: counts.textura[2] },
          { nivel: "4 - Crocante", cantidad: counts.textura[3] },
          { nivel: "5 - Muy crocante", cantidad: counts.textura[4] },
        ]

        setData({ attributeAverages, comparisonData, colorData, aromaData, saborData, texturaData })
      } catch (error) {
        console.error("Error fetching descriptive charts data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-muted-foreground">Cargando gráficos descriptivos...</div>
  }

  if (compact) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Perfil Sensorial</CardTitle>
          <CardDescription>Promedios de atributos descriptivos</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={data.attributeAverages}>
              <PolarGrid stroke="#D4CFC2" />
              <PolarAngleAxis dataKey="attribute" stroke="#5A7A5A" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#D4CFC2" />
              <Radar
                name="Promedio"
                dataKey="promedio"
                stroke="#6B8E6B"
                fill="#6B8E6B"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Análisis de Prueba Descriptiva</h2>
      
      {/* Radar Chart - Perfil General */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Perfil Sensorial General</CardTitle>
          <CardDescription>Promedio de cada atributo evaluado (escala 1-5)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={data.attributeAverages}>
                <PolarGrid stroke="#D4CFC2" />
                <PolarAngleAxis dataKey="attribute" stroke="#5A7A5A" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} stroke="#D4CFC2" />
                <Radar
                  name="Promedio"
                  dataKey="promedio"
                  stroke="#6B8E6B"
                  fill="#6B8E6B"
                  fillOpacity={0.5}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FEFCF7", 
                    border: "1px solid #D4CFC2",
                    borderRadius: "8px"
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis type="number" domain={[0, 5]} stroke="#5A7A5A" />
                <YAxis dataKey="name" type="category" stroke="#5A7A5A" width={70} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FEFCF7", 
                    border: "1px solid #D4CFC2",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="valor" fill="#6B8E6B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Attribute Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Color */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Color</CardTitle>
            <CardDescription>De claro a oscuro - Promedio: {data.attributeAverages.find(a => a.attribute === 'Color')?.promedio}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.colorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis 
                  dataKey="nivel" 
                  stroke="#5A7A5A" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" - ")[0]}
                />
                <YAxis stroke="#5A7A5A" allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FEFCF7", 
                    border: "1px solid #D4CFC2",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="cantidad" fill="#D4896B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Aroma */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Aroma</CardTitle>
            <CardDescription>Intensidad del aroma - Promedio: {data.attributeAverages.find(a => a.attribute === 'Aroma')?.promedio}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.aromaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis 
                  dataKey="nivel" 
                  stroke="#5A7A5A" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" - ")[0]}
                />
                <YAxis stroke="#5A7A5A" allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FEFCF7", 
                    border: "1px solid #D4CFC2",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="cantidad" fill="#8BA88B" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sabor */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Sabor</CardTitle>
            <CardDescription>Intensidad del sabor dulce/chocolate - Promedio: {data.attributeAverages.find(a => a.attribute === 'Sabor')?.promedio}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.saborData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis 
                  dataKey="nivel" 
                  stroke="#5A7A5A" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" - ")[0]}
                />
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

        {/* Textura */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Textura</CardTitle>
            <CardDescription>De blanda a crocante - Promedio: {data.attributeAverages.find(a => a.attribute === 'Textura')?.promedio}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data.texturaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis 
                  dataKey="nivel" 
                  stroke="#5A7A5A" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" - ")[0]}
                />
                <YAxis stroke="#5A7A5A" allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#FEFCF7", 
                    border: "1px solid #D4CFC2",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="cantidad" fill="#A5C4A5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
