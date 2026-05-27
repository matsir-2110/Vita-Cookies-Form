"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MessageSquare, Search, Filter, ThumbsUp, ThumbsDown, Minus } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Comment {
  id: string
  evaluator: string
  age: string | number
  date: string
  type: "acceptance" | "descriptive"
  rating: number
  comment: string
  sentiment: "positive" | "negative" | "neutral"
  timestamp: number
}

const getSentimentIcon = (sentiment: Comment["sentiment"]) => {
  switch (sentiment) {
    case "positive":
      return <ThumbsUp className="w-4 h-4 text-primary" />
    case "negative":
      return <ThumbsDown className="w-4 h-4 text-destructive" />
    default:
      return <Minus className="w-4 h-4 text-muted-foreground" />
  }
}

const getSentimentBadge = (sentiment: Comment["sentiment"]) => {
  switch (sentiment) {
    case "positive":
      return <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-0">Positivo</Badge>
    case "negative":
      return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30 border-0">Negativo</Badge>
    default:
      return <Badge className="bg-muted text-muted-foreground hover:bg-muted/80 border-0">Neutral</Badge>
  }
}

export function CommentsSection() {
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<Comment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterSentiment, setFilterSentiment] = useState<string>("all")

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data: acceptance } = await supabase.from('acceptance_tests').select('id, evaluator_id, satisfaccion, sugerencias, created_at, evaluators(edad)')
        const { data: descriptive } = await supabase.from('descriptive_tests').select('id, evaluator_id, color, aroma, sabor, textura, comentarios, created_at, evaluators(edad)')

        const combined: Comment[] = []

        if (acceptance) {
          acceptance.forEach(a => {
            if (a.sugerencias && a.sugerencias.trim().length > 0) {
              const rating = a.satisfaccion + 3
              combined.push({
                id: `acc-${a.id}`,
                evaluator: `Ev. #${a.evaluator_id.substring(0, 5)}`,
                age: Array.isArray(a.evaluators) ? a.evaluators[0]?.edad : a.evaluators?.edad || "?",
                date: new Date(a.created_at).toLocaleDateString(),
                type: "acceptance",
                rating: rating,
                comment: a.sugerencias,
                sentiment: rating >= 4 ? "positive" : rating <= 2 ? "negative" : "neutral",
                timestamp: new Date(a.created_at).getTime(),
              })
            }
          })
        }

        if (descriptive) {
          descriptive.forEach(d => {
            if (d.comentarios && d.comentarios.trim().length > 0) {
              const rating = Math.round((d.color + d.aroma + d.sabor + d.textura) / 4)
              combined.push({
                id: `desc-${d.id}`,
                evaluator: `Ev. #${d.evaluator_id.substring(0, 5)}`,
                age: Array.isArray(d.evaluators) ? d.evaluators[0]?.edad : d.evaluators?.edad || "?",
                date: new Date(d.created_at).toLocaleDateString(),
                type: "descriptive",
                rating: rating,
                comment: d.comentarios,
                sentiment: rating >= 4 ? "positive" : rating <= 2 ? "negative" : "neutral",
                timestamp: new Date(d.created_at).getTime(),
              })
            }
          })
        }

        combined.sort((a, b) => b.timestamp - a.timestamp)
        setComments(combined)
      } catch (error) {
        console.error("Error fetching comments:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [])

  const filteredComments = comments.filter((comment) => {
    const matchesSearch = comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.evaluator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || comment.type === filterType
    const matchesSentiment = filterSentiment === "all" || comment.sentiment === filterSentiment
    return matchesSearch && matchesType && matchesSentiment
  })

  const sentimentStats = {
    positive: comments.filter(c => c.sentiment === "positive").length,
    neutral: comments.filter(c => c.sentiment === "neutral").length,
    negative: comments.filter(c => c.sentiment === "negative").length,
  }

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Cargando comentarios...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Comentarios y Observaciones</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-primary/10 border-primary/20 shadow-none">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">{sentimentStats.positive}</p>
                <p className="text-sm text-muted-foreground">Positivos</p>
              </div>
              <ThumbsUp className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-muted border-border shadow-none">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{sentimentStats.neutral}</p>
                <p className="text-sm text-muted-foreground">Neutrales</p>
              </div>
              <Minus className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-destructive/10 border-destructive/20 shadow-none">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-destructive">{sentimentStats.negative}</p>
                <p className="text-sm text-muted-foreground">Negativos</p>
              </div>
              <ThumbsDown className="w-8 h-8 text-destructive opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar en comentarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-48 bg-input border-border">
                <SelectValue placeholder="Tipo de prueba" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las pruebas</SelectItem>
                <SelectItem value="acceptance">Aceptabilidad</SelectItem>
                <SelectItem value="descriptive">Descriptiva</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSentiment} onValueChange={setFilterSentiment}>
              <SelectTrigger className="w-full sm:w-48 bg-input border-border">
                <SelectValue placeholder="Sentimiento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="positive">Positivos</SelectItem>
                <SelectItem value="neutral">Neutrales</SelectItem>
                <SelectItem value="negative">Negativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Comentarios ({filteredComments.length})
          </CardTitle>
          <CardDescription>
            Observaciones y feedback de los evaluadores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredComments.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">No hay comentarios para mostrar.</div>
            ) : (
              filteredComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-secondary/30 rounded-lg border border-border"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{comment.evaluator}</span>
                      <Badge variant="outline" className="text-xs">
                        {comment.age} años
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {comment.type === "acceptance" ? "Aceptabilidad" : "Descriptiva"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSentimentBadge(comment.sentiment)}
                      <span className="text-sm text-muted-foreground">{comment.date}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    {getSentimentIcon(comment.sentiment)}
                    <p className="text-foreground flex-1 italic text-sm">"{comment.comment}"</p>
                  </div>
                  <div className="mt-3 flex items-center gap-1 border-t border-border/50 pt-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mr-1">Calificación</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${star <= comment.rating ? "text-primary" : "text-muted"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
