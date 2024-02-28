<script setup>
import { months, weekdays } from "../utils/dateUtils.ts";

const props = defineProps({
  weatherInfo: Object,
});
</script>

<template>
  <ul class="daily-weather">
    <li v-for="day of weatherInfo" class="daily__card">
      <p class="daily__time">
        {{ weekdays[new Date(day.dt * 1000).getDay()] }},
        {{ new Date(day.dt * 1000).getDate() }}
      </p>
      <div class="temperature">
        <img
          class="daily__weather-icon"
          :src="
            'https://openweathermap.org/img/wn/' +
            day.weather[0].icon +
            '@2x.png'
          "
          alt="weather-icon"
        />
        <span class="daily__degree"
          >{{ day.temp.min }}°C - {{ day.temp.max }}°C</span
        >
      </div>
    </li>
  </ul>
</template>

<style scoped>
.daily-weather {
  display: flex;
  row-gap: 8px;
  column-gap: 10px;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 5px 8px;
  border-radius: 4px;
}
.daily__card {
  display: flex;
  column-gap: 10px;
  align-items: center;
  justify-content: space-between;
}
.daily__weather-icon {
  width: 40px;
}
.temperature {
  display: flex;
  align-items: center;
  column-gap: 8px;
}
@media screen and (max-width: 510px) {
  .daily-weather {
    row-gap: 20px;
  }
  .daily__card {
    flex-direction: column;
  }
}
</style>
