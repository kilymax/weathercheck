import type { NuxtConfig } from 'nuxt/schema'

declare module '@nuxt/schema' {
	interface NuxtConfig {
		sitemap?: {
			hostname: string
			routes: () => Promise<string[]>
		}
	}
}

export {}
