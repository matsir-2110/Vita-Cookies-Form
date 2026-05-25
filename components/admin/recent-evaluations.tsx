"use client"

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

interface Evaluation {
  id: number
  evaluator: string
  age: string
  type: "acceptance" | "descriptive"
  rating: number
  date: string
  time: string
  completed: boolean
}

const recentEvaluations: Evaluation[] = [
  {
    id: 1,
    evaluator: "María G.",
    age: "26-35",
    type: "acceptance",
    rating: 5,
    date: "2024-01-15",
    time: "14:32",
    completed: true,
  },
  {
    id: 2,
    evaluator: "Carlos P.",
    age: "36-45",
    type: "descriptive",
    rating: 4,
    date: "2024-01-15",
    time: "13:45",
    completed: true,
  },
  {
    id: 3,
    evaluator: "Ana R.",
    age: "18-25",
    type: "acceptance",
    rating: 4,
    date: "2024-01-15",
    time: "12:20",
    completed: true,
  },
  {
    id: 4,
    evaluator: "Juan M.",
    age: "26-35",
    type: "descriptive",
    rating: 5,
    date: "2024-01-15",
    time: "11:15",
    completed: true,
  },
  {
    id: 5,
    evaluator: "Laura S.",
    age: "46-55",
    type: "acceptance",
    rating: 3,
    date: "2024-01-14",
    time: "16:50",
    completed: true,
  },
  {
    id: 6,
    evaluator: "Pedro L.",
    age: "18-25",
    type: "acceptance",
    rating: 4,
    date: "2024-01-14",
    time: "15:30",
    completed: true,
  },
  {
    id: 7,
    evaluator: "Sofía V.",
    age: "26-35",
    type: "descriptive",
    rating: 4,
    date: "2024-01-14",
    time: "14:10",
    completed: true,
  },
  {
    id: 8,
    evaluator: "Diego F.",
    age: "36-45",
    type: "acceptance",
    rating: 5,
    date: "2024-01-14",
    time: "12:45",
    completed: true,
  },
]

export function RecentEvaluations() {
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-muted-foreground">Evaluador</TableHead>
                <TableHead className="text-muted-foreground">Edad</TableHead>
                <TableHead className="text-muted-foreground">Tipo</TableHead>
                <TableHead className="text-muted-foreground">Calificación</TableHead>
                <TableHead className="text-muted-foreground">Fecha</TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEvaluations.map((evaluation) => (
                <TableRow key={evaluation.id} className="border-border">
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
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {evaluation.date} {evaluation.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                      Completado
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
