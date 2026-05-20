"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const satisfactionLevels = [
  { label: "Me gusta mucho", value: "2" },
  { label: "Me gusta", value: "1" },
  { label: "No me gusta ni me disgusta", value: "0" },
  { label: "No me gusta", value: "-1" },
  { label: "Me disgusta mucho", value: "-2" },
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
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-primary/10 rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl text-center text-foreground">
          PRUEBA DE ACEPTABILIDAD
        </CardTitle>
        <p className="text-sm text-center text-muted-foreground">
          Facultad de Ciencias de la Salud y Bienestar – Licenciatura en Nutrición
        </p>
        <p className="text-sm text-center text-muted-foreground">
          Desarrollo de Galletitas Vegetales Sustentables
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Sección II: Instrucciones */}
          <section className="bg-primary/10 border-2 border-primary/20 p-6 rounded-[2rem] shadow-md">
            <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px]">II</span>
              Instrucciones para la Cata
            </h3>
            <ol className="list-decimal list-inside space-y-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
              <li className="pl-1">
                <span className="font-semibold text-foreground/90 underline decoration-primary/30 underline-offset-2">Limpia:</span> 
                {" "}Beba un sorbo de agua para limpiar su paladar antes de comenzar.
              </li>
              <li className="pl-1">
                <span className="font-semibold text-foreground/90 underline decoration-primary/30 underline-offset-2">Prueba:</span> 
                {" "}Pruebe la muestra de galletita proporcionada.
              </li>
              <li className="pl-1">
                <span className="font-semibold text-foreground/90 underline decoration-primary/30 underline-offset-2">Evalúa:</span> 
                {" "}Evalúe su impresión general y marque el enunciado que mejor represente su satisfacción.
              </li>
            </ol>
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
