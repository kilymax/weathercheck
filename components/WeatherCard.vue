<script setup lang="ts">
const props = defineProps({
	city: {
		type: String,
		required: true,
	},
})

const { data, pending, error } = await useAsyncData('cityWeather', () =>
	$fetch(`/api/fetchWeatherData?city=${props.city}`)
)

const translate_dict = {
	Clear: 'Ясно',
	Clouds: 'Облачно',
	Rain: 'Дождь',
	Mist: 'Пасмурно',
	Snow: 'Снег',
	Thunderstorm: 'Гроза',
}

const temp =
	data.value?.weather?.temp != undefined
		? Math.round(data.value.weather.temp)
		: '–'
const weather = data.value?.weather?.weather || '–'
const sunset = data.value?.weather?.sunset || '–'
const pressure = Math.round(data.value?.weather?.pressure * 0.75008) || '–'
</script>

<template>
	<div class="weather-card">
		<h1 class="weather-card__title">{{ props.city }}</h1>
		<p class="weather-card__description">
			{{ translate_dict[weather] || weather }}
		</p>
		<div class="weather-card__temperature">
			<span class="weather-card__temperature-degree">{{ temp }}°</span>
			<img
				:src="`/icons/weather-icons/${weather}.svg`"
				width="200"
				height="200"
				:alt="`${weather}`"
				class="weather-card__temperature-image"
				:class="{ sun: weather === 'Clear' }"
			/>
		</div>
		<div class="weather-card__pressure">
			<img
				src="/icons/barometer.svg"
				width="24"
				height="24"
				alt=""
				class="weather-card__pressure-barometer"
				loading="lazy"
			/>
			<span class="weather-card__pressure-info">{{ pressure }} мм рт. ст.</span>
		</div>
		<span class="weather-card__additional">Закат в {{ sunset }}</span>
	</div>
</template>

<style scoped lang="scss">
.weather-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	color: var(--color-light);

	&__title {
		margin-top: rem(30);
		font-weight: 500;

		@include fluid-text(56, 24);
	}

	&__description {
		margin-top: rem(16);
	}

	&__temperature {
		display: flex;
		align-items: center;
		margin-top: rem(16);

		@include mobile {
			flex-direction: column;
		}

		&-degree {
			font-weight: 600;
			color: var(--color-light);
			background: var(--linear-gradient-text);
			background-clip: text;
			line-height: 111%;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;

			@include fluid-text(130, 120);
		}
	}

	&__pressure {
		display: flex;
		margin-top: rem(40);
		column-gap: rem(9.2);

		&-barometer {
			animation: rotate 5s linear infinite;
		}
	}

	&__additional {
		margin-top: rem(32);
		color: var(--color-text);
	}
}

.sun {
	animation: rotate 30s linear infinite;
}

@keyframes rotate {
	to {
		transform: rotate(360deg);
	}
}
</style>
