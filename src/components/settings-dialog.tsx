"use client"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { Settings, Map, Sun, Moon, Satellite, Monitor, Navigation } from "lucide-react"

interface MapSettings {
  style: string
  showTraffic: boolean
  show3D: boolean
  showLabels: boolean
  markerSize: number
}

interface SettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMapStyleChange?: (style: string) => void
  currentMapStyle?: string
  mapSettings?: MapSettings
  onMapSettingsChange?: (settings: Partial<MapSettings>) => void
}

export function SettingsDialog({
  open,
  onOpenChange,
  onMapStyleChange,
  currentMapStyle = "mapbox://styles/mapbox/streets-v12",
  mapSettings,
  onMapSettingsChange,
}: SettingsDialogProps) {
  const { theme, setTheme } = useTheme()

  const mapStyles = [
    {
      id: "mapbox://styles/mapbox/streets-v12",
      name: "Streets",
      description: "Peta jalan standar dengan detail lengkap",
      icon: Map,
      preview: "bg-blue-100 dark:bg-blue-900",
    },
    {
      id: "mapbox://styles/mapbox/satellite-v9",
      name: "Satellite",
      description: "Citra satelit dengan detail geografis",
      icon: Satellite,
      preview: "bg-green-100 dark:bg-green-900",
    },
    {
      id: "mapbox://styles/mapbox/dark-v11",
      name: "Dark",
      description: "Tema gelap untuk tampilan malam",
      icon: Moon,
      preview: "bg-gray-800 dark:bg-gray-700",
    },
    {
      id: "mapbox://styles/mapbox/light-v11",
      name: "Light",
      description: "Tema terang dengan kontras tinggi",
      icon: Sun,
      preview: "bg-gray-100 dark:bg-gray-200",
    },
    {
      id: "mapbox://styles/mapbox/outdoors-v12",
      name: "Outdoors",
      description: "Peta outdoor dengan kontur topografi",
      icon: Navigation,
      preview: "bg-emerald-100 dark:bg-emerald-900",
    },
  ]

  const handleMapStyleChange = (styleId: string) => {
    if (onMapStyleChange) {
      onMapStyleChange(styleId)
    }
    if (onMapSettingsChange) {
      onMapSettingsChange({ style: styleId })
    }
  }

  const handleMapSettingChange = (key: keyof MapSettings, value: any) => {
    if (onMapSettingsChange) {
      onMapSettingsChange({ [key]: value })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden ">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Pengaturan
          </DialogTitle>
          <DialogDescription>Sesuaikan tampilan dan pengaturan peta</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appearance">Tampilan</TabsTrigger>
            <TabsTrigger value="map">Peta</TabsTrigger>
          </TabsList>

          <div className="mt-6 max-h-[55vh] overflow-y-auto">
            <TabsContent value="appearance" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tema Aplikasi</h3>
                <RadioGroup value={theme} onValueChange={setTheme} className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="light" id="light" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-8 rounded border-2 bg-white flex items-center justify-center">
                        <Sun className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="light" className="text-sm font-medium cursor-pointer">
                          Light Mode
                        </Label>
                        <p className="text-xs text-muted-foreground">Tema terang untuk penggunaan siang hari</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="dark" id="dark" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-8 rounded border-2 bg-gray-900 flex items-center justify-center">
                        <Moon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="dark" className="text-sm font-medium cursor-pointer">
                          Dark Mode
                        </Label>
                        <p className="text-xs text-muted-foreground">Tema gelap untuk mengurangi kelelahan mata</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="system" id="system" />
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-8 rounded border-2 bg-gradient-to-r from-white to-gray-900 flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="system" className="text-sm font-medium cursor-pointer">
                          System
                        </Label>
                        <p className="text-xs text-muted-foreground">Ikuti pengaturan sistem operasi</p>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Pengaturan Tampilan</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Animasi</Label>
                      <p className="text-xs text-muted-foreground">Aktifkan animasi transisi</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Sidebar Compact</Label>
                      <p className="text-xs text-muted-foreground">Gunakan sidebar yang lebih ringkas</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">High Contrast</Label>
                      <p className="text-xs text-muted-foreground">Tingkatkan kontras untuk aksesibilitas</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="map" className="space-y-6 ">
              <div className="space-y-4 ">
                <h3 className="text-lg font-medium">Gaya Peta</h3>
                <RadioGroup value={currentMapStyle} onValueChange={handleMapStyleChange} className="space-y-3">
                  {mapStyles.map((style) => (
                    <div key={style.id} className="flex items-center space-x-3">
                      <RadioGroupItem value={style.id} id={style.id} />
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-8 rounded border-2 ${style.preview} flex items-center justify-center`}>
                          <style.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
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

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Layer Peta</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Traffic Layer</Label>
                      <p className="text-xs text-muted-foreground">Tampilkan kondisi lalu lintas</p>
                    </div>
                    <Switch
                      checked={mapSettings?.showTraffic || false}
                      onCheckedChange={(checked) => handleMapSettingChange("showTraffic", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">3D Buildings</Label>
                      <p className="text-xs text-muted-foreground">Tampilkan bangunan 3D</p>
                    </div>
                    <Switch
                      checked={mapSettings?.show3D || false}
                      onCheckedChange={(checked) => handleMapSettingChange("show3D", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Labels</Label>
                      <p className="text-xs text-muted-foreground">Tampilkan label jalan dan tempat</p>
                    </div>
                    <Switch
                      checked={mapSettings?.showLabels !== false}
                      onCheckedChange={(checked) => handleMapSettingChange("showLabels", checked)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Ukuran Marker</Label>
                      <span className="text-xs text-muted-foreground">{mapSettings?.markerSize || 0.8}x</span>
                    </div>
                    <Slider
                      value={[mapSettings?.markerSize || 0.8]}
                      onValueChange={(value) => handleMapSettingChange("markerSize", value[0])}
                      max={2}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>

          <Separator className="my-6" />

          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button onClick={() => onOpenChange(false)}>Simpan Pengaturan</Button>
          </DialogFooter>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
