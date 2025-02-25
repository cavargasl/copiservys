"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin } from "lucide-react"
import { env } from "@/config/env.mjs"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    tipoConsulta: "",
    mensaje: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prevState) => ({ ...prevState, tipoConsulta: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const mensajeWhatsApp = `Nombre: ${formData.nombre}\nEmail: ${formData.email}\nTipo de consulta: ${formData.tipoConsulta}\nMensaje: ${formData.mensaje}`
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${encodeURIComponent(mensajeWhatsApp)}`
    window.open(urlWhatsApp, '_blank')

    setFormData({ nombre: "", email: "", tipoConsulta: "", mensaje: "" })

    toast({
      title: "Mensaje enviado",
      description: "Gracias por su mensaje. Nos pondremos en contacto pronto.",
    })
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Contáctenos</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Envíenos un mensaje</CardTitle>
            <CardDescription>
              Complete el formulario y nos pondremos en contacto con usted lo antes posible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="tipoConsulta">Tipo de consulta</Label>
                <Select onValueChange={handleSelectChange} value={formData.tipoConsulta} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de consulta" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ventas">Ventas</SelectItem>
                    <SelectItem value="alquiler">Alquiler</SelectItem>
                    <SelectItem value="servicio_tecnico">Servicio Técnico</SelectItem>
                    <SelectItem value="suministros">Suministros</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar mensaje
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Información de contacto</CardTitle>
            <CardDescription>
              También puede contactarnos directamente a través de los siguientes medios:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <span>{'+'+env.NEXT_PUBLIC_WHATSAPP_NUMBER.slice(0, 2) + ' ' + env.NEXT_PUBLIC_WHATSAPP_NUMBER.slice(2)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>haroldrosales07@hotmail.es</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>Kra 92 # 72-41 sur, Bogotá, Colombia</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

