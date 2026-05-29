import { Component, signal, OnInit } from '@angular/core'
import { uploadOne } from '@auraimage/sdk/client'
import type { UploadResult } from '@auraimage/sdk/client'
import { checkHealth, getUploadToken } from './api'

const PRESETS = [
  { label: 'Thumbnail 200w WebP', params: 'w=200&h=200&fit=crop&fmt=webp' },
  { label: 'Medium 600w AVIF', params: 'w=600&fmt=avif' },
  { label: 'Full 1200w', params: 'w=1200' }
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  healthy = signal<boolean | null>(null)
  image = signal<UploadResult | null>(null)
  uploading = signal(false)
  error = signal<string | null>(null)

  presets = PRESETS

  async ngOnInit() {
    this.healthy.set(await checkHealth())
  }

  async handleUpload(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file) return

    this.uploading.set(true)
    this.error.set(null)

    try {
      const { token, cdnUrl } = await getUploadToken()
      const result = await uploadOne(file, { token, url: `${cdnUrl}/v1/upload` })
      this.image.set(result)
    } catch (err) {
      this.error.set(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      this.uploading.set(false)
    }
  }
}
