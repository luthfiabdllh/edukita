"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Map, Palette, Layers, Eye, Sun, Moon, Satellite, Navigation } from "lucide-react"

interface MapSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onStyleChange: (style: string) => void
  currentStyle: string
}

export function MapSettingsDialog({ open, onOpenChange, onStyleChange, currentStyle }: MapSettingsDialogProps) {
  const [showTraffic, setShowTraffic] = useState(false)
  const [show3D, setShow3D] = useState(false)
  const [showLabels, setShowLabels] = useState(true)
  const [markerSize, setMarkerSize] = useState([0.8])

  const mapStyles = [
    {
      id: "mapbox://styles/mapbox/streets-v12",
      name: "Streets",
      description: "Peta jalan standar dengan detail lengkap",
      icon: Map,
      preview: "bg-blue-100",
    },
    {
      id: "mapbox://styles/mapbox/satellite-v9",
      name: "Satellite",
      description: "Citra satelit dengan detail geografis",
      icon: Satellite,
      preview: "bg-green-100",
    },
    {
      id: "mapbox://styles/mapbox/dark-v11",
      name: "Dark",
      description: "Tema gelap untuk tampilan malam",
      icon: Moon,
      preview: "bg-gray-800",
    },
    {
      id: "mapbox://styles/mapbox/light-v11",
      name: "Light",
      description: "Tema terang dengan kontras tinggi",
      icon: Sun,
      preview: "bg-gray-100",
    },
    {
      id: "mapbox://styles/mapbox/outdoors-v12",
      name: "Outdoors",
      description: "Peta outdoor dengan kontur topografi",
      icon: Navigation,
      preview: "bg-emerald-100",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Pengaturan Peta
          </DialogTitle>
          <DialogDescription>Sesuaikan tampilan dan gaya peta sesuai preferensi Anda</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Map Style Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Gaya Peta</Label>
            <RadioGroup value={currentStyle} onValueChange={onStyleChange} className="space-y-3">
              {mapStyles.map((style) => (
                <div key={style.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={style.id} id={style.id} />
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-8 rounded border-2 ${style.preview} flex items-center justify-center`}>
                      <style.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={style.id} className="text-sm font-medium cursor-pointer">
                        {style.name}
                      </Label>
                      <p className="text-xs text-muted-foreground">{style.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Layer Controls */}
          <div>
            <Label className="text-sm font-medium mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Layer Peta
            </Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Traffic Layer</Label>
                  <p className="text-xs text-muted-foreground">Tampilkan kondisi lalu lintas</p>
                </div>
                <Switch checked={showTraffic} onCheckedChange={setShowTraffic} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">3D Buildings</Label>
                  <p className="text-xs text-muted-foreground">Tampilkan bangunan 3D</p>
                </div>
                <Switch checked={show3D} onCheckedChange={setShow3D} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm">Labels</Label>
                  <p className="text-xs text-muted-foreground">Tampilkan label jalan dan tempat</p>
                </div>
                <Switch checked={showLabels} onCheckedChange={setShowLabels} />
              </div>
            </div>
          </div>

          <Separator />

          {/* Marker Settings */}
          <div>
            <Label className="text-sm font-medium mb-3 block flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Pengaturan Marker
            </Label>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm">Ukuran Marker</Label>
                  <span className="text-xs text-muted-foreground">{markerSize[0]}x</span>
                </div>
                <Slider
                  value={markerSize}
                  onValueChange={setMarkerSize}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Batal
            </Button>
            <Button onClick={() => onOpenChange(false)} className="flex-1">
              Terapkan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
