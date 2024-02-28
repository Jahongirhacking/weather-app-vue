<script setup>
import { ref, watchEffect, computed } from "vue";
import formatRegionName from "../utils/formatRegionName.ts";
import { months, weekdays } from "../utils/dateUtils.ts";

const props = defineProps({
  region: { name: String, selected: Boolean },
  weatherInfo: Object,
});

const date = computed(() => {
  return new Date(props.weatherInfo.current.dt * 1000);
});
</script>

<template>
  <header class="current__weather">
    <h1 class="current__name">{{ formatRegionName(region) }}</h1>
    <p class="ccurrent__date">
      {{ weekdays[date.getDay()] }}, {{ date.getDate() }}-{{
        months[date.getMonth()]
      }}
    </p>
    <span class="current__degree">{{ weatherInfo.current.temp }} °C</span>
    <img
      class="current__weather-icon"
      :src="
        'https://openweathermap.org/img/wn/' +
        weatherInfo.current.weather[0].icon +
        '@2x.png'
      "
      alt="weather-icon"
    />
  </header>
</template>

<style scoped>
.current__weather {
  display: grid;
  grid-template-areas:
    "name icon"
    "date icon"
    "degree icon";
  justify-content: space-between;
  row-gap: 6px;
}
.current__degree {
  font-size: 40pt;
  color: rgb(0, 119, 255);
  grid-area: degree;
  font-weight: 700;
}
.current__weather-icon {
  width: 150px;
  grid-area: icon;
}
.region-name {
  font-size: 21pt;
  grid-area: name;
}
.current__date {
  grid-area: date;
}

@media screen and (max-width: 510px) {
  .current__weather {
    grid-template-areas:
      "name"
      "date"
      "degree"
      "icon";
    align-items: center;
    justify-content: center;
  }
}
</style>
