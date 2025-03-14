<script setup lang="ts">
const props = defineProps({
	city: {
		type: String,
		required: true,
	},
	dataWeather: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<div class="city-card">
		<span class="city-card__name">{{ city }}</span>
		<span class="city-card__temperature"
			>{{ Math.floor(dataWeather?.temp) }}°</span
		>
		<img
			class="city-card__image"
			:src="`/icons/weather-icons/${dataWeather?.weather}.svg`"
			alt="weather-icon"
			loading="lazy"
		/>
	</div>
</template>

<style lang="scss" scoped>
.city-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: var(--color-cards);
	border-radius: rem(6);
	height: rem(190);
	width: 100%;

	@include mobile {
		min-width: rem(158);
	}
	&__name {
		font-weight: 400;
		font-size: rem(14);
		color: #ffffff;
		margin-top: rem(23);
	}

	&__temperature {
		font-weight: 500;
		font-size: rem(40);
		color: #ffffff;
		margin-top: rem(12);
		line-height: 1;
	}

	&__image {
		height: rem(104);
		width: rem(120);
		margin-top: rem(-2);
	}
}
</style>
