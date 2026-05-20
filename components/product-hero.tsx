"use client"

import { useState } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const features = [
  {
    title: "Desarrollo Innovador",
    description: "Galletas vegetales diseñadas para integrar sinérgicamente manzana, zanahoria, avena y lentejas."
  },
  {
    title: "Complementación Proteica",
    description: "Diseño técnico que busca elevar el valor biológico mediante la unión de legumbres y cereales."
  },
  {
    title: "Aceptación Sensorial",
    description: "Enriquecidas con chips de chocolate, canela y vainilla para un perfil altamente atractivo."
  },
  {
    title: "Snack Nutricional",
    description: "Una alternativa de alta densidad nutricional frente a los productos industriales tradicionales."
  }
]

export function ProductHero() {
  const [evaluatorData, setEvaluatorData] = useState({
    edad: "",
    genero: "",
    consumeSnacks: "",
  })

  return (
    <section className="relative overflow-hidden py-8 px-4 md:py-12 space-y-16">
      <div className="mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4" style={{ fontFamily: "serif" }}>
            GALLETITAS DE LENTEJAS, MANZANA, ZANAHORIA Y CHIPS
          </h1>
          <div className="inline-block bg-primary/20 text-primary border border-primary/30 px-6 py-2 rounded-full">
            <p className="text-sm md:text-base font-medium">nutritivas, caseras y diferentes</p>
          </div>
        </div>

        {/* Info & Image Section */}
        <div className="flex flex-col md:flex-row gap-12 items-start justify-center mb-16">
          <div className="w-full md:w-[400px] md:flex-none space-y-8 bg-muted/50 p-8 rounded-lg h-fit border border-primary/10">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground text-center mb-6 pb-3 border-b-2 border-primary/20 whitespace-nowrap">
              ¿En qué consiste?
            </h2>
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit">
                    <span className="w-2 h-2 bg-primary rounded-full block" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground leading-none mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[400px] md:flex-none flex flex-col items-center gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4jnqZB8qlq4d59xxZh1YXUERKNBoB3.png"
              alt="Galletitas de Lentejas, Manzana, Zanahoria y Chips - Producto natural y saludable"
              width={400}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Evaluator Info Section (Moved here) */}
        <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 shadow-md">
          <h3 className="text-xl font-bold text-foreground mb-4 pb-2 border-b border-primary/30">
            I. Información del Evaluador
          </h3>
          <p className="text-sm text-muted-foreground mb-8">
            Antes de comenzar con la evaluación, por favor complete sus datos básicos. 
            Esta información es confidencial y se utilizará solo para fines estadísticos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Label htmlFor="edad" className="text-base font-semibold">Edad</Label>
              <Input
                id="edad"
                type="number"
                value={evaluatorData.edad}
                onChange={(e) => setEvaluatorData({ ...evaluatorData, edad: e.target.value })}
                placeholder="Ej: 25"
                className="bg-background border-primary/20 focus:ring-primary/30"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">Género</Label>
              <RadioGroup
                value={evaluatorData.genero}
                onValueChange={(value) => setEvaluatorData({ ...evaluatorData, genero: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="M" id="hero-genero-m" />
                  <Label htmlFor="hero-genero-m" className="cursor-pointer">M</Label>
                </div>
                <div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="F" id="hero-genero-f" />
                  <Label htmlFor="hero-genero-f" className="cursor-pointer">F</Label>
                </div>
                <div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="O" id="hero-genero-o" />
                  <Label htmlFor="hero-genero-o" className="cursor-pointer">Otro</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">¿Consume habitualmente snacks saludables?</Label>
              <RadioGroup
                value={evaluatorData.consumeSnacks}
                onValueChange={(value) => setEvaluatorData({ ...evaluatorData, consumeSnacks: value })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="si" id="hero-snacks-si" />
                  <Label htmlFor="hero-snacks-si" className="cursor-pointer">Sí</Label>
                </div>
                <div className="flex items-center space-x-2 bg-muted/30 p-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="no" id="hero-snacks-no" />
                  <Label htmlFor="hero-snacks-no" className="cursor-pointer">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full">
            <p className="text-lg font-medium">¡Una opción diferente!</p>
          </div>
        </div>
      </div>
    </section>
  )
}
