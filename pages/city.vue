<script setup lang="ts">
import { useFavorites } from '~/composables/useFavorites.client'

definePageMeta({
	layout: 'default',
	hideHeader: true,
})

const route = useRoute()
const favorites = useFavorites()

const city = computed(() => route.query.city || '')

const isCityFavorite = computed(() => {
	return favorites.isFavorite(city.value as string)
})

const toggleFavorite = () => {
	isCityFavorite.value
		? favorites.removeFavorite(city.value as string)
		: favorites.addFavorite(city.value as string)
}
</script>

<template>
	<div class="city">
		<div class="city__inner container">
			<div class="city__header">
				<NuxtLink to="/" class="city__back-link" aria-label="Вернуться назад">
					<svg-arrow-back />
					<span>Назад</span>
				</NuxtLink>
				<ClientOnly>
					<button class="city__favorite-btn" @click="toggleFavorite">
						<svg-bookmark
							v-if="!isCityFavorite"
							:fontControlled="false"
							class="city__favorite-icon"
							aria-label="Добавить в избранное"
						/>
						<svg-bookmark-active
							v-else
							:fontControlled="false"
							class="city__favorite-icon"
							aria-label="Убрать из избранного"
						/>
					</button>
				</ClientOnly>
			</div>
			<div class="city__body">
				<WeatherCard :city="city.toString()" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.city {
	background: var(--radial-gradient-bg);
	height: 100%;

	&__inner {
		display: flex;
		flex-direction: column;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: rem(27.5) rem(17);
	}

	&__back-link {
		display: flex;
		align-items: center;
		padding: rem(4) rem(7);
		column-gap: rem(19);
		color: var(--color-text);
	}

	&__favorite-btn {
		background-color: transparent;
		border: none;
		padding: rem(2) rem(5);

		@include flex-center;
	}

	&__favorite-icon {
		width: rem(14);
		height: rem(20);
	}

	&__body {
		margin-inline: auto;
	}
}
</style>
