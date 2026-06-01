"use client"

import { useState, useEffect } from "react"
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


const C = {
  bg: "#f5f0e8",
  surface: "#dce5d4",
  accent: "#a8c0a0",
  deep: "#7d9b76",
}

import { supabase } from "@/lib/supabase"

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

export function AcceptanceTest({ evaluatorId, onComplete }: { evaluatorId: string, onComplete?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    satisfaccion: "",
    consumoDiario: "",
    preferenciaUltraprocesado: "",
    sugerencias: "",
  })

  useEffect(() => {
    const saved = localStorage.getItem("acceptanceTestData")
    if (saved) {
      try {
        setFormData(JSON.parse(saved))
      } catch (e) {
        console.error("Error loading saved data", e)
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) localStorage.setItem("acceptanceTestData", JSON.stringify(formData))
  }, [formData, isLoaded])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHasAttemptedSubmit(true)

    
    if (!formData.satisfaccion || !formData.consumoDiario.trim() || !formData.preferenciaUltraprocesado.trim()) {
      alert("Por favor, complete todos los campos obligatorios (marcados en rojo).")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('acceptance_tests')
        .insert([
          {
            evaluator_id: evaluatorId,
            satisfaccion: parseInt(formData.satisfaccion),
            consumo_diario: formData.consumoDiario || null,
            preferencia_ultraprocesado: formData.preferenciaUltraprocesado || null,
            sugerencias: formData.sugerencias || null,
          }
        ])

      if (error) throw error

      alert("¡Gracias por completar la prueba de aceptabilidad!")
      localStorage.removeItem("acceptanceTestData")
      setFormData({
        satisfaccion: "",
        consumoDiario: "",
        preferenciaUltraprocesado: "",
        sugerencias: "",
      })
      setHasAttemptedSubmit(false)
      onComplete?.()
    } catch (error) {
      console.error("Error al guardar:", error)
      alert("Hubo un error al guardar los datos. Por favor, intente de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
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

          
          <section className="pt-0 pb-8 md:pb-10">
            <h3
              className="flex items-center justify-center gap-6 text-lg font-semibold mb-10 before:content-[''] before:flex-1 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:to-[#1f2a3d] after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-l after:from-transparent after:to-[#1f2a3d]"
              style={{ color: "#1f2a3d" }}
            >
              Guía de Evaluación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-gray-200 gap-y-8 md:gap-y-0">
              {[
                { n: 1, key: "Limpia", text: "Beba agua para limpiar su paladar antes de comenzar." },
                { n: 2, key: "Prueba", text: "Deguste la muestra de galletita proporcionada." },
                { n: 3, key: "Evalúa", text: "Marque el enunciado que mejor represente su satisfacción." },
              ].map((s, i, arr) => (
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
                  {i < arr.length - 1 && (
                    <div className="md:hidden mt-6 w-12 h-px" style={{ backgroundColor: "#d4cfc2" }} />
                  )}
                </div>
              ))}
            </div>
          </section>


          
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-primary/30">
              I. Escala Hedónica de Aceptación
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Seleccione solo una opción basada en su percepción sensorial inmediata.
            </p>

            <RadioGroup
              value={formData.satisfaccion}
              onValueChange={(value) => setFormData({ ...formData, satisfaccion: value })}
              className="space-y-3"
            >
              {satisfactionLevels.map((level) => (
                <div
                  key={level.value}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${formData.satisfaccion === level.value
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

          
          <section>
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-primary/30">
              II. Observaciones y Sugerencias
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="consumo-diario" className={hasAttemptedSubmit && !formData.consumoDiario.trim() ? "text-red-500" : ""}>
                  ¿Diariamente consumiría el producto? *
                </Label>
                <Textarea
                  id="consumo-diario"
                  value={formData.consumoDiario}
                  onChange={(e) => setFormData({ ...formData, consumoDiario: e.target.value })}
                  placeholder="Escriba su respuesta..."
                  className={`bg-card min-h-[60px] ${hasAttemptedSubmit && !formData.consumoDiario.trim() ? "border-red-500 ring-1 ring-red-500" : ""}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferencia" className={hasAttemptedSubmit && !formData.preferenciaUltraprocesado.trim() ? "text-red-500" : ""}>
                  ¿Elegiría consumir este producto antes de un ultra procesado? *
                </Label>
                <Textarea
                  id="preferencia"
                  value={formData.preferenciaUltraprocesado}
                  onChange={(e) => setFormData({ ...formData, preferenciaUltraprocesado: e.target.value })}
                  placeholder="Escriba su respuesta..."
                  className={`bg-card min-h-[60px] ${hasAttemptedSubmit && !formData.preferenciaUltraprocesado.trim() ? "border-red-500 ring-1 ring-red-500" : ""}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sugerencias">
                  Sugerencias (Opcional)
                </Label>
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

          <Button type="submit" className="w-full py-6 text-lg font-semibold" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Prueba de Aceptabilidad"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          ¡Muchas gracias por su colaboración en esta investigación alimentaria!
        </p>
      </CardContent>
    </Card>
  )
}