"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { supabase } from "@/lib/supabase"

const attributes = [
  {
    id: "color",
    title: "I. Intensidad Cromática (Color)",
    description:
      "Se evalúa el grado de oscurecimiento. El color café es producto de la formación de melanoidinas durante la reacción entre los azúcares reductores de la fruta y los grupos amino de las proteínas.",
    scale: ["Pálido", "", "Dorado medio", "", "Marrón intenso"],
  },
  {
    id: "aroma",
    title: "II. Perfil Aromático (Olor)",
    description:
      "Valoración de la liberación de compuestos volátiles potenciados por el tratamiento térmico. Incluye notas de vainillina, aldehídos de la canela, aromas de la legumbre (lentejas).",
    scale: ["Muy débil", "", "Moderado", "", "Muy intenso"],
  },
  {
    id: "sabor",
    title: "III. Sinergia de Sabores (Sabor)",
    description:
      "Evaluación del equilibrio entre el dulzor aportado por las hexosas de la manzana (fructosa y glucosa) y las notas características de las proteínas de la legumbre.",
    scale: ["Desequilibrado", "", "Equilibrado", "", "Muy agradable"],
  },
  {
    id: "textura",
    title: "IV. Propiedades Reológicas (Textura)",
    description:
      "Nivel de crujencia y firmeza. Este atributo depende de la gelatinización del almidón durante el horneado y su posterior retrogradación (reordenamiento de amilosa) tras el enfriamiento.",
    scale: ["Muy blanda", "", "Firme", "", "Muy crujiente"],
  },
]

export function DescriptiveTest() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    juezNumero: "",
    color: "",
    aroma: "",
    sabor: "",
    textura: "",
    comentarios: "",
  })

  const handleAttributeChange = (attributeId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [attributeId]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.color || !formData.aroma || !formData.sabor || !formData.textura) {
      alert("Por favor, califique todos los atributos antes de enviar.")
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('descriptive_tests')
        .insert([
          {
            juez_numero: formData.juezNumero || null,
            color: parseInt(formData.color),
            aroma: parseInt(formData.aroma),
            sabor: parseInt(formData.sabor),
            textura: parseInt(formData.textura),
            comentarios: formData.comentarios || null,
          }
        ])

      if (error) throw error

      alert("¡Gracias por completar la prueba descriptiva!")
      setFormData({
        juezNumero: "",
        color: "",
        aroma: "",
        sabor: "",
        textura: "",
        comentarios: "",
      })
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
        <div className="relative px-8 md:px-12 pt-10 md:pt-12 pb-2 md:pb-2">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12">
            {/* Izquierda: eyebrow + título */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[11px] uppercase tracking-[0.3em] font-medium"
                  style={{ color: "#2f3d2a" }}
                >
                  Sección · Perfil de Atributos
                </span>
              </div>
              <CardTitle
                className="text-4xl md:text-5xl leading-[1.05] tracking-tight font-semibold"
                style={{ color: "#1f2a3d" }}
              >
                Prueba Descriptiva
              </CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Instrucciones para el evaluador */}
          <section className="pt-0 pb-8 md:pb-10">
            <h3
              className="flex items-center justify-center gap-6 text-lg font-semibold mb-10 before:content-[''] before:flex-1 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:to-[#1f2a3d] after:content-[''] after:flex-1 after:h-[1px] after:bg-gradient-to-l after:from-transparent after:to-[#1f2a3d]"
              style={{ color: "#1f2a3d" }}
            >
              Instrucciones
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-gray-200">
              {[
                { n: 1, key: "Observar", text: "Analice cada atributo sensorial de la muestra con atención y sin apuro." },
                { n: 2, key: "Percibir", text: "Identifique la intensidad percibida de color, aroma, sabor y textura." },
                { n: 3, key: "Calificar", text: "Marque en la escala de 1 a 5 el valor que mejor represente su percepción." },
              ].map((s) => (
                <div key={s.n} className="flex flex-col items-center text-center px-4 md:px-8">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold mb-4"
                    style={{ backgroundColor: "#dce5d4", color: "#1f2a3d" }}
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

          {/* Atributos */}
          <div className="space-y-8">
            {attributes.map((attribute) => (
              <section key={attribute.id} className="space-y-4">
                <div>
                  <h4 className="text-base font-semibold text-foreground">{attribute.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{attribute.description}</p>
                </div>

                {/* Escala visual */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground px-1">
                    {attribute.scale.map((label, idx) => (
                      <span key={idx} className="w-12 text-center">
                        {label}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center bg-muted/30 rounded-full p-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleAttributeChange(attribute.id, value.toString())}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-base font-semibold transition-all ${
                          formData[attribute.id as keyof typeof formData] === value.toString()
                            ? "bg-primary text-primary-foreground scale-110 shadow-lg"
                            : "bg-card text-foreground hover:bg-primary/20 border-2 border-border"
                        }`}
                        aria-label={`Valor ${value} para ${attribute.title}`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs font-medium px-1">
                    <span className="text-muted-foreground">(1) Menor intensidad</span>
                    <span className="text-muted-foreground">(5) Mayor intensidad</span>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Comentarios */}
          <section>
            <h3 className="text-base font-semibold text-foreground mb-2">
              Comentarios opcionales y sugerencias técnicas
            </h3>
            <p className="text-xs text-muted-foreground mb-2">
              Ejemplo: percepción de granulosidad, retrogusto, persistencia del aroma
            </p>
            <Textarea
              value={formData.comentarios}
              onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
              placeholder="Escriba sus comentarios técnicos..."
              className="bg-card min-h-[100px]"
            />  
          </section>

          <Button type="submit" className="w-full py-6 text-lg font-semibold" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Prueba Descriptiva"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}