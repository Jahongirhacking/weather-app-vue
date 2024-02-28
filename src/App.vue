<script setup>
import { computed, ref, watch, reactive } from "vue";
import CurrentWeather from "./components/CurrentWeather.vue";
import DailyWeather from "./components/DailyWeather.vue";
import formatRegionName from "./utils/formatRegionName.ts";

const regions = ref([
  { name: "toshkent", selected: false },
  { name: "andijon", selected: false },
  { name: "namangan", selected: false },
  { name: "sirdaryo", selected: false },
  { name: "jizzax", selected: false },
  { name: "qashqadaryo", selected: true },
  { name: "samarqand", selected: false },
  { name: "navoiy", selected: false },
  { name: "buxoro", selected: false },
  { name: "qoraqalpog'iston", selected: false },
  { name: "fargona", selected: false },
]);

const currentRegion = ref("qashqadaryo");
const weatherInfo = ref(null);

const API_URL = computed(() => {
  return `https://api.openweathermap.org/geo/1.0/direct?q=${currentRegion.value}&appid=9dd86907fe501cec50da3d087e4e9dc0`;
});

const fetchData = async () => {
  const data = await fetch(API_URL.value);
  const res = await data.json();
  const { lat, lon } = res[0];
  // Weather data
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=9dd86907fe501cec50da3d087e4e9dc0&units=metric&lang=ru`
  );
  weatherInfo.value = await weatherData.json();
};

fetchData();

watch(currentRegion, fetchData);
</script>

<template>
  <main>
    <section class="weather-part">
      <CurrentWeather
        v-if="weatherInfo"
        :region="regions.find((reg) => reg.name === currentRegion)"
        :weatherInfo="weatherInfo"
      />
      <DailyWeather :weatherInfo="weatherInfo.daily" />
    </section>
    <form class="regions-part">
      <h2>Hududlar</h2>
      <label v-for="region in regions" :key="region.name">
        <input type="radio" :value="region.name" v-model="currentRegion" />
        {{ formatRegionName(region) }}
      </label>
    </form>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  justify-content: center;
}
.weather-part {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  padding: 10px;
  max-width: 500px;
}
form {
  padding: 12px 10px;
  border-radius: 4px;
}
label,
input[type="radio"] {
  cursor: pointer;
}
.regions-part {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.regions-part > label {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

@media screen and (max-width: 510px) {
  main {
    flex-direction: column;
  }
  form {
    text-align: center;
  }
  .regions-part {
    align-items: center;
  }
}
</style>
