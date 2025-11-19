import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface ImageCropDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageSrc: string
  onCropComplete: (croppedImage: File) => void
}

export function ImageCropDialog({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
}: ImageCropDialogProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop)
  }, [])

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom)
  }, [])

  const onCropAreaChange = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    [],
  )

  const createCroppedImage = useCallback(
    async (imageSrc: string, pixelCrop: Area): Promise<File> => {
      const image = new Image()
      image.src = imageSrc

      return new Promise((resolve, reject) => {
        image.onload = () => {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            reject(new Error('Failed to get canvas context'))
            return
          }

          // 正方形にする
          const size = Math.min(pixelCrop.width, pixelCrop.height)
          canvas.width = size
          canvas.height = size

          ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            size,
            size,
            0,
            0,
            size,
            size,
          )

          canvas.toBlob(
            (blob) => {
              if (blob) {
                // BlobをFileに変換してファイル名を付ける（拡張子検証のため）
                const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' })
                resolve(file)
              } else {
                reject(new Error('Failed to create blob'))
              }
            },
            'image/jpeg',
            0.95,
          )
        }
        image.onerror = () => {
          reject(new Error('Failed to load image'))
        }
      })
    },
    [],
  )

  const handleSave = useCallback(async () => {
    if (!croppedAreaPixels) return

    try {
      const croppedImage = await createCroppedImage(imageSrc, croppedAreaPixels)
      onCropComplete(croppedImage)
      onOpenChange(false)
    } catch (error) {
      console.error('Error cropping image:', error)
    }
  }, [croppedAreaPixels, imageSrc, onCropComplete, onOpenChange, createCroppedImage])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>画像をトリミング</DialogTitle>
        </DialogHeader>
        <div className="relative h-96 w-full">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropAreaChange}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">ズーム</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleSave}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
