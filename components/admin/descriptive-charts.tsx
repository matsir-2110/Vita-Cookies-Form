"use client"

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
  Legend,
} from "recharts"

interface DescriptiveChartsProps {
  compact?: boolean
}

const attributeAverages = [
  { attribute: "Color", promedio: 4.1, fullMark: 5 },
  { attribute: "Aroma", promedio: 3.8, fullMark: 5 },
  { attribute: "Sabor", promedio: 4.3, fullMark: 5 },
  { attribute: "Textura", promedio: 3.9, fullMark: 5 },
]

const colorData = [
  { nivel: "1 - Muy claro", cantidad: 2 },
  { nivel: "2 - Claro", cantidad: 5 },
  { nivel: "3 - Dorado", cantidad: 12 },
  { nivel: "4 - Marrón claro", cantidad: 15 },
  { nivel: "5 - Marrón oscuro", cantidad: 8 },
]

const aromaData = [
  { nivel: "1 - Imperceptible", cantidad: 1 },
  { nivel: "2 - Leve", cantidad: 6 },
  { nivel: "3 - Moderado", cantidad: 14 },
  { nivel: "4 - Intenso", cantidad: 16 },
  { nivel: "5 - Muy intenso", cantidad: 5 },
]

const saborData = [
  { nivel: "1 - Muy suave", cantidad: 1 },
  { nivel: "2 - Suave", cantidad: 4 },
  { nivel: "3 - Balanceado", cantidad: 10 },
  { nivel: "4 - Intenso", cantidad: 18 },
  { nivel: "5 - Muy intenso", cantidad: 9 },
]

const texturaData = [
  { nivel: "1 - Muy blanda", cantidad: 2 },
  { nivel: "2 - Blanda", cantidad: 7 },
  { nivel: "3 - Intermedia", cantidad: 15 },
  { nivel: "4 - Crocante", cantidad: 14 },
  { nivel: "5 - Muy crocante", cantidad: 4 },
]

const comparisonData = [
  { name: "Color", valor: 4.1 },
  { name: "Aroma", valor: 3.8 },
  { name: "Sabor", valor: 4.3 },
  { name: "Textura", valor: 3.9 },
]

export function DescriptiveCharts({ compact = false }: DescriptiveChartsProps) {
  if (compact) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Perfil Sensorial</CardTitle>
          <CardDescription>Promedios de atributos descriptivos</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={attributeAverages}>
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
              <RadarChart data={attributeAverages}>
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
              <BarChart data={comparisonData} layout="vertical">
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
            <CardDescription>De claro a oscuro - Promedio: 4.1</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={colorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis 
                  dataKey="nivel" 
                  stroke="#5A7A5A" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" - ")[0]}
                />
                <YAxis stroke="#5A7A5A" />
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
            <CardDescription>Intensidad del aroma - Promedio: 3.8</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={aromaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis 
                  dataKey="nivel" 
                  stroke="#5A7A5A" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" - ")[0]}
                />
                <YAxis stroke="#5A7A5A" />
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
            <CardDescription>Intensidad del sabor dulce/chocolate - Promedio: 4.3</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={saborData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis 
                  dataKey="nivel" 
                  stroke="#5A7A5A" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" - ")[0]}
                />
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

        {/* Textura */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Textura</CardTitle>
            <CardDescription>De blanda a crocante - Promedio: 3.9</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={texturaData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D4CFC2" />
                <XAxis 
                  dataKey="nivel" 
                  stroke="#5A7A5A" 
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => value.split(" - ")[0]}
                />
                <YAxis stroke="#5A7A5A" />
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
