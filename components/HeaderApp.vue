<script setup>
const route = useRoute()
</script>

<template>
	<div class="header__body">
		<div class="header__body-inner container">
			<NuxtLink
				class="header__logo logo"
				to="/"
				title="Домашняя страница"
				aria-label="Home"
			>
				<img
					src="/icons/logo.svg"
					alt=""
					width="29"
					height="18"
					class="logo__image"
					loading="lazy"
				/>
				<span class="logo__title">WeatherCheck</span>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped lang="scss">
.header {
	&__body {
		background-color: var(--color-dark-minor);

		@include mobile {
			background-color: transparent;
		}

		&-inner {
			display: flex;
			align-items: center;
			height: var(--header-height);
		}
	}

	&__logo {
		display: flex;
		align-items: center;
		column-gap: rem(12);
	}
}

.logo {
	&__title {
		color: var(--color-light);
	}
}


</style>
