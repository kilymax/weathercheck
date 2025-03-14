<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
const props = defineProps<{ cityExample: string }>()

const searchRef = ref<HTMLDivElement | null>(null)

const inputRef = ref<HTMLInputElement | null>(null)

const inputData = ref<string>('')

const citiesArray = ref([])

const resultArray = ref<{ match: string; after: string }[]>([])

const resultWrapperRef = ref()

const isActive = ref<boolean>(false)

const closeIfClickOutside = (event: MouseEvent | TouchEvent) => {
	const target = event.target as HTMLElement
	if (
		!target.closest('.search-section') &&
		!target.closest('.result-wrapper') &&
		!target.closest('.example__city')
	) {
		isActive.value = false
	}
}

function detectLanguage(
	input: string
): 'ru' | 'en' | 'mixed language' | 'unknown language' {
	const hasCyrillic = /[а-яё]/i.test(input)
	const hasLatin = /[a-z]/i.test(input)

	if (hasCyrillic) return 'ru'
	if (hasLatin) return 'en'
	return 'unknown language'
}

function filterCitiesByLanguage(
	cities: Array<{ ru: string; en: string }>,
	lang: 'ru' | 'en'
): Array<string> {
	return cities.map((city) => city[lang]).filter(Boolean)
}

function getCitiesByDetectedLanguage(
	cities: Array<{ ru: string; en: string }>,
	input: string
): Array<string> {
	const lang = detectLanguage(input)
	return lang === 'ru' || lang === 'en'
		? filterCitiesByLanguage(cities, lang)
		: []
}
function searchCity(cities: string[], input: string) {
	return cities
		.filter((city) => city.toLowerCase().startsWith(input.toLowerCase()))
		.map((city) => {
			const match = city.slice(0, input.length)
			const after = city.slice(input.length)
			return { match, after }
		})
}
function animateClearResults() {
	resultWrapperRef.value.classList.remove('result-wrapper_visible')
}
const getCityLink = (query: { match: string; after: string }) => {
	const city = query.match + query.after
	return { path: '/city', query: { city } }
}

onMounted(async () => {
	const response = await fetch('/cities.json')
	if (response.ok) {
		citiesArray.value = await response.json()
	} else {
		console.error('Ошибка при загрузке данных')
	}
	document.addEventListener('pointerdown', closeIfClickOutside)
})
onBeforeUnmount(() => {
	document.removeEventListener('pointerdown', closeIfClickOutside)
})

watchDebounced(
	inputData,
	(newVal) => {
		if (newVal.length >= 3) {
			const citiesByLang = getCitiesByDetectedLanguage(
				citiesArray.value,
				newVal
			)
			resultArray.value = searchCity(citiesByLang, newVal)
			resultWrapperRef.value.classList.add('result-wrapper_visible')
		} else {
			animateClearResults()
		}
	},
	{ debounce: 300, maxWait: 1000 }
)

watch(
	() => props.cityExample,
	(newValue, oldValue) => {
		if (!newValue || newValue === oldValue) return
		inputData.value = newValue
		isActive.value = true
		nextTick(() => inputRef.value?.focus())
	},
	{ flush: 'post' }
)
</script>

<template>
	<div ref="searchRef">
		<div class="search-section" @pointerdown="isActive = true">
			<input
				ref="inputRef"
				v-model="inputData"
				class="search"
				type="text"
				placeholder="Укажите город"
				@keydown.enter.prevent
			/>
		</div>
		<div ref="resultWrapperRef" class="result-wrapper">
			<ul v-if="isActive" class="result-list" v-auto-animate>
				<li
					class="result-item"
					v-for="(city, index) in resultArray"
					:key="index"
				>
					<NuxtLink class="result-item__link" :to="getCityLink(city)">
						<span class="result-item__highlight">{{ city.match }}</span>
						<span>{{ city.after }}</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped lang="scss">
.search-section {
	width: fluid(510, 335);
	height: rem(56);
}
.search {
	background-color: var(--color-dark-minor);
	width: 100%;
	height: 100%;
	padding: rem(18) 0 rem(19) rem(20);
	color: var(--color-light);
	border: none;
	border-radius: rem(2);
	outline: none;
}
.result-wrapper {
	background-color: var(--color-dropdown-list);
	position: absolute;
	z-index: 10;
	left: 0;
	right: 0;
	max-height: rem(236);
	overflow-y: auto;
	overflow-x: hidden;
	border-bottom-left-radius: rem(2);
	border-bottom-right-radius: rem(2);
	@include hide;
	transition: 0.3s ease-in-out;
	@include hover {
		background-color: #393f59;
	}

	&_visible {
		@include show;
	}
}
.result-item {
	height: rem(59);

	&__link {
		width: 100%;
		height: 100%;
		padding: rem(20) 0 rem(20) rem(20);
		&:hover {
			color: var(--color-text);
		}
	}

	&__highlight {
		color: var(--color-light);
	}
}
</style>
