"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const attributes = [
  {
    id: "color",
    title: "1. Intensidad Cromática (Color)",
    description:
      "Se evalúa el grado de oscurecimiento. El color café es producto de la formación de melanoidinas durante la reacción entre los azúcares reductores de la fruta y los grupos amino de las proteínas.",
    scale: ["Pálido", "", "Dorado medio", "", "Marrón intenso"],
  },
  {
    id: "aroma",
    title: "2. Perfil Aromático (Olor)",
    description:
      "Valoración de la liberación de compuestos volátiles potenciados por el tratamiento térmico. Incluye notas de vainillina, aldehídos de la canela, aromas de la legumbre (lentejas).",
    scale: ["Muy débil", "", "Moderado", "", "Muy intenso"],
  },
  {
    id: "sabor",
    title: "3. Sinergia de Sabores (Sabor)",
    description:
      "Evaluación del equilibrio entre el dulzor aportado por las hexosas de la manzana (fructosa y glucosa) y las notas características de las proteínas de la legumbre.",
    scale: ["Desequilibrado", "", "Equilibrado", "", "Muy agradable"],
  },
  {
    id: "textura",
    title: "4. Propiedades Reológicas (Textura)",
    description:
      "Nivel de crujencia y firmeza. Este atributo depende de la gelatinización del almidón durante el horneado y su posterior retrogradación (reordenamiento de amilosa) tras el enfriamiento.",
    scale: ["Muy blanda", "", "Firme", "", "Muy crujiente"],
  },
]

export function DescriptiveTest() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos de Prueba Descriptiva:", formData)
    alert("¡Gracias por completar la prueba descriptiva!")
  }

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="bg-primary/10 rounded-t-lg">
        <CardTitle className="text-xl md:text-2xl text-center text-foreground">
          PRUEBA DESCRIPTIVA
        </CardTitle>
        <p className="text-sm text-center text-muted-foreground">Perfil de Atributos Técnicos</p>
        <p className="text-sm text-center text-muted-foreground">
          Desarrollo de Galletitas Vegetales Sustentables
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información del Juez */}
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="juez-numero">Nro. de Juez</Label>
              <Input
                id="juez-numero"
                type="number"
                value={formData.juezNumero}
                onChange={(e) => setFormData({ ...formData, juezNumero: e.target.value })}
                placeholder="Ej: 1"
                className="bg-card w-24"
              />
            </div>
            <div className="space-y-2">
              <Label>Fecha</Label>
              <Input
                type="date"
                className="bg-card"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Instrucciones */}
          <section className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-base font-semibold text-foreground mb-2">
              Instrucciones para el evaluador
            </h3>
            <p className="text-sm text-muted-foreground">
              A continuación, se le solicita evaluar la intensidad de cuatro atributos específicos. Por
              favor, marque el valor en la escala que mejor describa su percepción, considerando que el
              extremo izquierdo (1) representa la intensidad más baja y el extremo derecho (5) la más
              alta.
            </p>
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

          <Button type="submit" className="w-full py-6 text-lg font-semibold">
            Enviar Prueba Descriptiva
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
