"use client"

import { useState } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User, Calendar, Users, Apple } from "lucide-react"

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

        {/* Evaluator Info Section — Rediseñado */}
        <div className="relative bg-gradient-to-br from-card via-card to-primary/5 border border-primary/20 rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden">
          {/* Decorative blob */}
          <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

          <div className="relative">
            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="flex-none w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center shadow-sm">
                <User className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary/80">Paso 1</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground leading-tight">
                  Información del Evaluador
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                  Antes de comenzar con la evaluación, complete sus datos básicos.
                  Esta información es confidencial y se utilizará solo con fines estadísticos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Edad */}
              <div className="group relative bg-background/70 backdrop-blur-sm border border-primary/15 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-primary" />
                  <Label htmlFor="edad" className="text-sm font-semibold tracking-wide uppercase text-foreground/80">
                    Edad
                  </Label>
                </div>
                <Input
                  id="edad"
                  type="number"
                  value={evaluatorData.edad}
                  onChange={(e) => setEvaluatorData({ ...evaluatorData, edad: e.target.value })}
                  placeholder="Ej: 25"
                  className="bg-transparent border-0 border-b border-primary/20 rounded-none px-0 text-2xl font-semibold focus-visible:ring-0 focus-visible:border-primary placeholder:text-muted-foreground/40 h-12"
                />
              </div>

              {/* Género */}
              <div className="group relative bg-background/70 backdrop-blur-sm border border-primary/15 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold tracking-wide uppercase text-foreground/80">
                    Género
                  </Label>
                </div>
                <RadioGroup
                  value={evaluatorData.genero}
                  onValueChange={(value) => setEvaluatorData({ ...evaluatorData, genero: value })}
                  className="grid grid-cols-3 gap-2"
                >
                  {[
                    { v: "M", l: "M" },
                    { v: "F", l: "F" },
                    { v: "O", l: "Otro" },
                  ].map(({ v, l }) => {
                    const active = evaluatorData.genero === v
                    return (
                      <Label
                        key={v}
                        htmlFor={`hero-genero-${v.toLowerCase()}`}
                        className={`flex items-center justify-center h-11 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                          active
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background border-primary/15 hover:border-primary/40 hover:bg-primary/5 text-foreground"
                        }`}
                      >
                        <RadioGroupItem value={v} id={`hero-genero-${v.toLowerCase()}`} className="sr-only" />
                        {l}
                      </Label>
                    )
                  })}
                </RadioGroup>
              </div>

              {/* Snacks saludables */}
              <div className="group relative bg-background/70 backdrop-blur-sm border border-primary/15 rounded-2xl p-5 hover:border-primary/40 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <Apple className="w-4 h-4 text-primary" />
                  <Label className="text-sm font-semibold tracking-wide uppercase text-foreground/80 leading-tight">
                    ¿Consume snacks saludables?
                  </Label>
                </div>
                <RadioGroup
                  value={evaluatorData.consumeSnacks}
                  onValueChange={(value) => setEvaluatorData({ ...evaluatorData, consumeSnacks: value })}
                  className="grid grid-cols-2 gap-2"
                >
                  {[
                    { v: "si", l: "Sí" },
                    { v: "no", l: "No" },
                  ].map(({ v, l }) => {
                    const active = evaluatorData.consumeSnacks === v
                    return (
                      <Label
                        key={v}
                        htmlFor={`hero-snacks-${v}`}
                        className={`flex items-center justify-center h-11 rounded-xl border cursor-pointer text-sm font-medium transition-all ${
                          active
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background border-primary/15 hover:border-primary/40 hover:bg-primary/5 text-foreground"
                        }`}
                      >
                        <RadioGroupItem value={v} id={`hero-snacks-${v}`} className="sr-only" />
                        {l}
                      </Label>
                    )
                  })}
                </RadioGroup>
              </div>
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
