"use client"

import { useState } from "react"
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

interface Comment {
  id: number
  evaluator: string
  age: string
  date: string
  type: "acceptance" | "descriptive"
  rating: number
  comment: string
  sentiment: "positive" | "negative" | "neutral"
}

const comments: Comment[] = [
  {
    id: 1,
    evaluator: "María G.",
    age: "26-35",
    date: "2024-01-15",
    type: "acceptance",
    rating: 5,
    comment: "Excelente sabor y textura. Me encantó que sea una opción saludable sin perder el gusto dulce. Definitivamente lo compraría.",
    sentiment: "positive",
  },
  {
    id: 2,
    evaluator: "Carlos P.",
    age: "36-45",
    date: "2024-01-15",
    type: "acceptance",
    rating: 4,
    comment: "Muy buena galletita. El sabor a chocolate está bien equilibrado con los ingredientes naturales. Quizás podría ser un poco más crocante.",
    sentiment: "positive",
  },
  {
    id: 3,
    evaluator: "Ana R.",
    age: "18-25",
    date: "2024-01-14",
    type: "descriptive",
    rating: 3,
    comment: "El color es agradable pero el aroma podría ser más intenso. La textura es buena.",
    sentiment: "neutral",
  },
  {
    id: 4,
    evaluator: "Juan M.",
    age: "26-35",
    date: "2024-01-14",
    type: "acceptance",
    rating: 5,
    comment: "Como vegetariano, me alegra encontrar opciones como esta. El sabor es increíble y la textura perfecta.",
    sentiment: "positive",
  },
  {
    id: 5,
    evaluator: "Laura S.",
    age: "46-55",
    date: "2024-01-13",
    type: "acceptance",
    rating: 2,
    comment: "No me convenció del todo el sabor. Esperaba algo más dulce. La textura estaba bien.",
    sentiment: "negative",
  },
  {
    id: 6,
    evaluator: "Pedro L.",
    age: "18-25",
    date: "2024-01-13",
    type: "descriptive",
    rating: 4,
    comment: "Buen balance de sabores. El chocolate se siente presente sin opacar los otros ingredientes.",
    sentiment: "positive",
  },
  {
    id: 7,
    evaluator: "Sofía V.",
    age: "26-35",
    date: "2024-01-12",
    type: "acceptance",
    rating: 4,
    comment: "Me gustó mucho que tenga ingredientes naturales. El sabor es agradable y la presentación muy buena.",
    sentiment: "positive",
  },
  {
    id: 8,
    evaluator: "Diego F.",
    age: "36-45",
    date: "2024-01-12",
    type: "descriptive",
    rating: 3,
    comment: "El color dorado es atractivo. El aroma es moderado y el sabor está bien, aunque esperaba más intensidad.",
    sentiment: "neutral",
  },
  {
    id: 9,
    evaluator: "Valentina C.",
    age: "18-25",
    date: "2024-01-11",
    type: "acceptance",
    rating: 5,
    comment: "Increíble opción saludable. Me encanta que sea apto para vegetarianos y sin conservantes.",
    sentiment: "positive",
  },
  {
    id: 10,
    evaluator: "Martín H.",
    age: "26-35",
    date: "2024-01-11",
    type: "acceptance",
    rating: 4,
    comment: "Muy rica. Ideal para una merienda saludable. El chocolate le da un toque especial.",
    sentiment: "positive",
  },
]

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
      return <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Positivo</Badge>
    case "negative":
      return <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">Negativo</Badge>
    default:
      return <Badge className="bg-muted text-muted-foreground hover:bg-muted/80">Neutral</Badge>
  }
}

export function CommentsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterSentiment, setFilterSentiment] = useState<string>("all")

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Comentarios y Observaciones</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-primary/10 border-primary/20">
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
        <Card className="bg-muted border-border">
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
        <Card className="bg-destructive/10 border-destructive/20">
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
            {filteredComments.map((comment) => (
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
                <div className="flex items-start gap-2">
                  {getSentimentIcon(comment.sentiment)}
                  <p className="text-foreground flex-1">{comment.comment}</p>
                </div>
                <div className="mt-2 flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">Calificación:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${star <= comment.rating ? "text-primary" : "text-muted"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
