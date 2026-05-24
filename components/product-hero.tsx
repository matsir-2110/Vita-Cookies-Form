"use client"

import { useState } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User, Calendar, Users, Apple, Sparkles, Activity, Heart, Leaf } from "lucide-react"

import { supabase } from "@/lib/supabase"

const features = [
  {
    title: "Desarrollo Innovador",
    description: "Galletas vegetales diseñadas para integrar sinérgicamente manzana, zanahoria, avena y lentejas.",
    icon: Sparkles
  },
  {
    title: "Complementación Proteica",
    description: "Diseño técnico que busca elevar el valor biológico mediante la unión de legumbres y cereales.",
    icon: Activity
  },
  {
    title: "Aceptación Sensorial",
    description: "Enriquecidas con chips de chocolate, canela y vainilla para un perfil altamente atractivo.",
    icon: Heart
  },
  {
    title: "Snack Nutricional",
    description: "Una alternativa de alta densidad nutricional frente a los productos industriales tradicionales.",
    icon: Leaf
  }
]

interface ProductHeroProps {
  onComplete?: (evaluatorId: string) => void;
}

export function ProductHero({ onComplete }: ProductHeroProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false)
  const [evaluatorData, setEvaluatorData] = useState({
    edad: "",
    genero: "",
    consumeSnacks: "",
  })

  const handleSubmit = async () => {
    setHasAttemptedSubmit(true)
    if (!evaluatorData.edad || !evaluatorData.genero || !evaluatorData.consumeSnacks) {
      alert("Por favor, complete todos los campos marcados en rojo.")
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = await supabase
        .from('evaluators')
        .insert([
          {
            edad: parseInt(evaluatorData.edad),
            genero: evaluatorData.genero,
            consume_snacks: evaluatorData.consumeSnacks,
          }
        ])
        .select()
        .single()

      if (error) throw error

      if (onComplete && data) {
        onComplete(data.id)
      }
    } catch (error: any) {
      console.error("Error al guardar evaluador:", error)
      alert(`Hubo un error al guardar: ${error?.message || "Desconocido"}`)
    } finally {
      setIsSubmitting(false)
    }
  }

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
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-stretch justify-center mb-16">
          
          {/* Text Box */}
          <div className="w-full md:w-[450px] md:flex-none relative bg-gradient-to-br from-card via-card to-primary/10 p-8 rounded-3xl border border-primary/20 shadow-xl overflow-hidden group/card">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover/card:scale-150 duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -ml-16 -mb-16 transition-transform group-hover/card:scale-150 duration-700" />

            <div className="relative z-10 flex flex-col justify-center space-y-8 h-full">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-2">
                ¿En qué consiste?
                <div className="h-1 w-20 bg-primary mt-4 rounded-full" />
              </h2>
              
              <div className="grid gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div 
                      key={index} 
                      className="group flex gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all duration-300 border border-transparent hover:border-primary/10"
                    >
                      <div className="mt-1 flex-shrink-0 bg-primary/10 text-primary p-3 rounded-xl h-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground leading-none mb-2 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Image Box */}
          <div className="w-full md:w-[450px] md:flex-none relative min-h-[500px] md:min-h-0 flex items-center justify-center">
            <Image
              src="/infografia.jpg"
              alt="Infografía de Galletitas de Lentejas, Manzana, Zanahoria y Chips"
              fill
              className="object-contain rounded-2xl drop-shadow-sm mix-blend-multiply"
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
              <div className={`group relative bg-background/70 backdrop-blur-sm border rounded-2xl p-5 transition-all ${hasAttemptedSubmit && !evaluatorData.edad ? "border-red-500 shadow-sm shadow-red-500/20" : "border-primary/15 hover:border-primary/40 hover:shadow-md"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className={`w-4 h-4 ${hasAttemptedSubmit && !evaluatorData.edad ? "text-red-500" : "text-primary"}`} />
                  <Label htmlFor="edad" className={`text-sm font-semibold tracking-wide uppercase ${hasAttemptedSubmit && !evaluatorData.edad ? "text-red-500" : "text-foreground/80"}`}>
                    Edad
                  </Label>
                </div>
                <Input
                  id="edad"
                  type="number"
                  value={evaluatorData.edad}
                  onChange={(e) => setEvaluatorData({ ...evaluatorData, edad: e.target.value })}
                  placeholder="Ej: 25"
                  className={`bg-transparent border-0 border-b rounded-none px-0 text-2xl font-semibold focus-visible:ring-0 placeholder:text-muted-foreground/40 h-12 ${hasAttemptedSubmit && !evaluatorData.edad ? "border-red-500 focus-visible:border-red-500" : "border-primary/20 focus-visible:border-primary"}`}
                />
              </div>

              {/* Género */}
              <div className={`group relative bg-background/70 backdrop-blur-sm border rounded-2xl p-5 transition-all ${hasAttemptedSubmit && !evaluatorData.genero ? "border-red-500 shadow-sm shadow-red-500/20" : "border-primary/15 hover:border-primary/40 hover:shadow-md"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Users className={`w-4 h-4 ${hasAttemptedSubmit && !evaluatorData.genero ? "text-red-500" : "text-primary"}`} />
                  <Label className={`text-sm font-semibold tracking-wide uppercase ${hasAttemptedSubmit && !evaluatorData.genero ? "text-red-500" : "text-foreground/80"}`}>
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
                        className={`flex items-center justify-center h-11 rounded-xl border cursor-pointer text-sm font-medium transition-all ${active
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : hasAttemptedSubmit && !evaluatorData.genero
                            ? "bg-background border-red-200 hover:border-red-400 text-foreground"
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
              <div className={`group relative bg-background/70 backdrop-blur-sm border rounded-2xl p-5 transition-all ${hasAttemptedSubmit && !evaluatorData.consumeSnacks ? "border-red-500 shadow-sm shadow-red-500/20" : "border-primary/15 hover:border-primary/40 hover:shadow-md"}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Apple className={`w-4 h-4 ${hasAttemptedSubmit && !evaluatorData.consumeSnacks ? "text-red-500" : "text-primary"}`} />
                  <Label className={`text-sm font-semibold tracking-wide uppercase leading-tight ${hasAttemptedSubmit && !evaluatorData.consumeSnacks ? "text-red-500" : "text-foreground/80"}`}>
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
                        className={`flex items-center justify-center h-11 rounded-xl border cursor-pointer text-sm font-medium transition-all ${active
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : hasAttemptedSubmit && !evaluatorData.consumeSnacks
                            ? "bg-background border-red-200 hover:border-red-400 text-foreground"
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
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <p className="text-lg font-medium">
              {isSubmitting ? "Guardando..." : "Guardar Datos y Continuar"}
            </p>
          </button>
        </div>
      </div>
    </section>
  )
}
