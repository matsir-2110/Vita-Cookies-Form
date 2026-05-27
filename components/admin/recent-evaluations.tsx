"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ClipboardList, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Evaluation {
  id: string
  evaluator: string
  age: string | number
  type: "acceptance" | "descriptive"
  rating: number
  date: string
  time: string
  completed: boolean
  timestamp: number
}

export function RecentEvaluations() {
  const [loading, setLoading] = useState(true)
  const [evaluations, setEvaluations] = useState<Evaluation[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: acceptance } = await supabase.from('acceptance_tests').select('*, evaluators(edad)')
        const { data: descriptive } = await supabase.from('descriptive_tests').select('*, evaluators(edad)')

        const combined: Evaluation[] = []

        if (acceptance) {
          acceptance.forEach(a => {
            const dateObj = new Date(a.created_at)
            // Map satisfaccion (-2..2) to rating (1..5)
            const rating = a.satisfaccion + 3
            combined.push({
              id: a.id.toString(),
              evaluator: `Ev. #${a.evaluator_id.substring(0, 5)}`,
              age: Array.isArray(a.evaluators) ? a.evaluators[0]?.edad : a.evaluators?.edad || "?",
              type: "acceptance",
              rating: rating,
              date: dateObj.toLocaleDateString(),
              time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              completed: true,
              timestamp: dateObj.getTime(),
            })
          })
        }

        if (descriptive) {
          descriptive.forEach(d => {
            const dateObj = new Date(d.created_at)
            // Rating for descriptive could be average of color, aroma, sabor, textura
            const rating = Math.round((d.color + d.aroma + d.sabor + d.textura) / 4)
            combined.push({
              id: d.id.toString(),
              evaluator: `Ev. #${d.evaluator_id.substring(0, 5)}`,
              age: Array.isArray(d.evaluators) ? d.evaluators[0]?.edad : d.evaluators?.edad || "?",
              type: "descriptive",
              rating: rating,
              date: dateObj.toLocaleDateString(),
              time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              completed: true,
              timestamp: dateObj.getTime(),
            })
          })
        }

        combined.sort((a, b) => b.timestamp - a.timestamp)
        setEvaluations(combined)
      } catch (error) {
        console.error("Error fetching recent evaluations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ClipboardList className="w-5 h-5" />
          Evaluaciones Recientes
        </CardTitle>
        <CardDescription>
          Últimas evaluaciones completadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center text-muted-foreground">Cargando evaluaciones...</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-muted-foreground">Evaluador</TableHead>
                  <TableHead className="text-muted-foreground">Edad</TableHead>
                  <TableHead className="text-muted-foreground">Tipo</TableHead>
                  <TableHead className="text-muted-foreground">Calificación (Ref)</TableHead>
                  <TableHead className="text-muted-foreground">Fecha y Hora</TableHead>
                  <TableHead className="text-muted-foreground">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      No hay evaluaciones recientes
                    </TableCell>
                  </TableRow>
                ) : (
                  evaluations.map((evaluation) => (
                    <TableRow key={`${evaluation.type}-${evaluation.id}`} className="border-border">
                      <TableCell className="font-medium text-foreground">
                        {evaluation.evaluator}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {evaluation.age}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            evaluation.type === "acceptance" 
                              ? "border-primary text-primary" 
                              : "border-accent text-accent-foreground"
                          }
                        >
                          {evaluation.type === "acceptance" ? "Aceptabilidad" : "Descriptiva"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span
                              key={star}
                              className={`text-sm ${star <= evaluation.rating ? "text-primary" : "text-muted"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {evaluation.date} {evaluation.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">
                          Completado
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
