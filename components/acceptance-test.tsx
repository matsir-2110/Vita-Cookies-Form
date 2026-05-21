"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Droplet, Cookie, Sparkles } from "lucide-react"

const satisfactionLevels = [
  { label: "Me gusta mucho", value: "2" },
  { label: "Me gusta", value: "1" },
  { label: "No me gusta ni me disgusta", value: "0" },
  { label: "No me gusta", value: "-1" },
  { label: "Me disgusta mucho", value: "-2" },
]

// Sage & Cream
const C = {
  bg: "#f5f0e8",
  surface: "#dce5d4",
  accent: "#a8c0a0",
  deep: "#7d9b76",
}

const steps = [
  {
    icon: Droplet,
    key: "Limpia",
    text: "Beba un sorbo de agua para limpiar su paladar antes de comenzar.",
  },
  {
    icon: Cookie,
    key: "Prueba",
    text: "Pruebe la muestra de galletita proporcionada.",
  },
  {
    icon: Sparkles,
    key: "Evalúa",
    text: "Evalúe su impresión general y marque el enunciado que mejor represente su satisfacción.",
  },
]

export function AcceptanceTest() {
  const [formData, setFormData] = useState({
    edad: "",
    genero: "",
    consumeSnacks: "",
    satisfaccion: "",
    consumoDiario: "",
    preferenciaUltraprocesado: "",
    sugerencias: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos de Prueba de Aceptabilidad:", formData)
    alert("¡Gracias por completar la prueba de aceptabilidad!")
  }

  return (
    <Card
      className="border-0 shadow-xl overflow-hidden"
      style={{ backgroundColor: "#fbfaf6" }}
    >
      <CardHeader
        className="relative p-0 overflow-hidden"
        style={{ backgroundColor: "#fbfaf6" }}
      >
        <div className="relative px-8 md:px-12 pt-10 md:pt-12 pb-4 md:pb-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
            {/* Izquierda: eyebrow + título */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[11px] uppercase tracking-[0.3em] font-medium"
                  style={{ color: "#2f3d2a" }}
                >
                  Sección · Estudio Sensorial
                </span>
              </div>
              <CardTitle
                className="text-4xl md:text-5xl leading-[1.05] tracking-tight font-semibold"
                style={{ color: "#1f2a3d" }}
              >
                Prueba de Aceptabilidad
              </CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>



      <CardContent className="p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Sección II: Guía de Evaluación */}
          <section className="pt-0 pb-8 md:pb-10">
            <h3
              className="flex items-center justify-center gap-6 text-lg font-semibold mb-10 before:content-[''] before:flex-1 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:to-[#1f2a3d] after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-l after:from-transparent after:to-[#1f2a3d]"
              style={{ color: "#1f2a3d" }}
            >
              Guía de Evaluación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-gray-200">
              {[
                { n: 1, key: "Limpia", text: "Beba agua para limpiar su paladar antes de comenzar." },
                { n: 2, key: "Prueba", text: "Deguste la muestra de galletita proporcionada." },
                { n: 3, key: "Evalúa", text: "Marque el enunciado que mejor represente su satisfacción." },
              ].map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center px-4 md:px-8">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold mb-4"
                    style={{ backgroundColor: C.surface, color: "#1f2a3d" }}
                  >
                    {s.n}
                  </span>
                  <h4
                    className="text-base font-semibold mb-3"
                    style={{ color: "#1f2a3d" }}
                  >
                    {s.key}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#5a6b7d" }}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </section>


          {/* Sección III: Escala Hedónica */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-primary/30">
              III. Escala Hedónica de Aceptación
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Seleccione solo una option basada en su percepción sensorial inmediata.
            </p>

            <RadioGroup
              value={formData.satisfaccion}
              onValueChange={(value) => setFormData({ ...formData, satisfaccion: value })}
              className="space-y-3"
            >
              {satisfactionLevels.map((level) => (
                <div
                  key={level.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    formData.satisfaccion === level.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value={level.value} id={`satisfaction-${level.value}`} />
                  <Label htmlFor={`satisfaction-${level.value}`} className="flex-1 cursor-pointer font-medium">
                    {level.label}
                  </Label>
                  <span className="text-sm text-muted-foreground font-mono">({level.value})</span>
                </div>
              ))}
            </RadioGroup>
          </section>

          {/* Sección IV: Observaciones */}
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-primary/30">
              IV. Observaciones y Sugerencias
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="consumo-diario">¿Diariamente consumiría el producto?</Label>
                <Textarea
                  id="consumo-diario"
                  value={formData.consumoDiario}
                  onChange={(e) => setFormData({ ...formData, consumoDiario: e.target.value })}
                  placeholder="Escriba su respuesta..."
                  className="bg-card min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferencia">¿Elegiría consumir este producto antes de un ultra procesado?</Label>
                <Textarea
                  id="preferencia"
                  value={formData.preferenciaUltraprocesado}
                  onChange={(e) => setFormData({ ...formData, preferenciaUltraprocesado: e.target.value })}
                  placeholder="Escriba su respuesta..."
                  className="bg-card min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sugerencias">Sugerencias</Label>
                <Textarea
                  id="sugerencias"
                  value={formData.sugerencias}
                  onChange={(e) => setFormData({ ...formData, sugerencias: e.target.value })}
                  placeholder="Escriba sus sugerencias..."
                  className="bg-card min-h-[80px]"
                />
              </div>
            </div>
          </section>

          <Button type="submit" className="w-full py-6 text-lg font-semibold">
            Enviar Prueba de Aceptabilidad
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¡Muchas gracias por su colaboración en esta investigación alimentaria!
        </p>
      </CardContent>
    </Card>
  )
}