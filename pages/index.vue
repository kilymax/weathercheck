<script setup lang="ts">
  import { useFavorites } from "~/composables/useFavorites.client"

  const favorites = useFavorites()
  const weatherData = ref<{ city: string; weather: any }[]>([])

  const cityExample = ref("")

  const clickOnCity = (event: MouseEvent | TouchEvent) => {
    const target = event.target as HTMLElement
    if (!target) return
    cityExample.value = ""
    setTimeout(() => {
      cityExample.value = target.textContent ?? ""
    }, 0)
  }

  watch(
    favorites.favorites,
    async () => {
      weatherData.value = await favorites.fetchWeatherForFavorites()
    },
    { immediate: true, deep: true }
  )
</script>

<template>
  <div class="search">
    <div class="search__inner container">
      <div class="search-wrapper">
        <SearchInput v-model:cityExample="cityExample" />
      </div>
      <div v-if="!weatherData.length">
        <div class="example-wrapper">
          <div class="example">
            <img class="example__image" src="/icons/arrow-up.svg" alt="стрелка для примера" />
            <span class="example__text">
              Начните вводить город,
              <br />
              например,
              <span @pointerdown="clickOnCity" class="example__city">Ижевск</span>
            </span>
          </div>
        </div>
        <div class="bookmark-wrapper">
          <div class="bookmark">
            <span class="bookmark__text">
              Используйте значок «закладки»,
              <br />
              чтобы закрепить город на главной
            </span>
            <img src="/icons/bookmark.svg" alt="иконка" class="bookmark__image" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="weatherData.length" class="favorite-cards">
        <NuxtLink  v-for="(item, index) in weatherData" :to="{path: 'city', query: {city: item.city}}" query: item.city>
          <PreviewCard   :key="index" :city="item.city" :dataWeather="item.weather" :aria-label="`Перейти на страницу города ${item.city}`" />
        </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .search {
    &__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .search-wrapper {
    margin-top: fluid(80, 20);
    position: relative;
  }
  .example-wrapper {
    margin-top: rem(26);
  }
  .example {
    width: rem(215);
    position: relative;
    display: flex;
    justify-content: end;

    &__image {
      position: absolute;
      width: rem(38);
      height: rem(32);
      top: 0;
      left: 0;
    }

    &__text {
      display: block;
      text-align: center;
      padding-top: rem(17);
      width: rem(170);
    }

    &__city {
      color: var(--color-light);
      border-bottom: 1px dashed var(--color-light);
      cursor: pointer;
      transition: 0.3s ease-in-out;
      display: inline-block;
      @include hover {
        transform: scale(1.05);
      }
    }
  }
  .bookmark-wrapper {
    margin-top: rem(88);
  }
  .bookmark {
    @include flex-center;
    flex-direction: column;
    gap: rem(20);
  }
  @include mobile {
    .search-wrapper {
      margin-top: rem(20);
    }
    .bookmark-wrapper {
      margin-top: rem(95);
    }
  }
  .favorite-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: rem(35);
    width: 100%;
    max-width: rem(915);
    margin-left:  auto;
    margin-right:  auto;
    padding: 0 rem(20);
    margin-top: rem(55);

    @include mobile {
      grid-template-columns: repeat(2, 1fr);
      gap: rem(19);
      max-width: calc(100dvw - 60px);
      margin-left: rem(20);
      margin-right: rem(20);
      margin-top: rem(33);
      padding: 0;

    }
  }
</style>
