<template>
  <Header @setLocation="getLocation" ref="header"/>

  <main>
    <WeatherInfo
      v-if="location && current && condition"
      :location="location"
      :current="current"
      :condition="condition"
    />
    <button class="add-location btn btn-link d-flex aling-items-center position-absolute start-50 top-50 translate-middle text-decoration-none" @click="$refs.header.showSearchbar = true" v-if="!location">
      <i class="bi bi-plus me-2"></i>
      Add your location
    </button>
  </main>

  <Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import WeatherInfo from '@/components/WeatherInfo.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
      Header,
      WeatherInfo,
      Footer
  },
  data () {
    return {
      location: null,
      current: null,
      condition: null,
      showResults: false
    }
  },
  computed: {
    URLParams() {
      const params = new URLSearchParams()
      params.append('key', 'ce4eb1b20d3f42a4b64152404212209')
      params.append('q', this.location.name)
      return params
    }
  },
  methods: {
    fetchData() {
      fetch(`https://api.weatherapi.com/v1/current.json?${this.URLParams}`)
      .then(response => response.json())
      .then(data => {
        this.current = data.current
        this.condition = data.current.condition
        this.isDay = data.current.is_day
      })
    },

    getLocation(location) {
      this.location = location
    },

    checkDaytime() {
      let isDay = null

      if (this.current !== null) {
        this.current.is_day === 1 ? isDay = true : isDay = false
      } else {
        const hours = new Date().getHours()
        isDay = hours > 6 && hours < 20
      }

      this.setBackground(isDay)
    },

    // Set background based on time in current/searched location
    setBackground(isDay) {
      if(isDay) {
        document.body.classList.replace('bg-night', 'bg-day')
      } else {
        document.body.classList.replace('bg-day', 'bg-night')
      }
    },

  },
  watch: {
    location() {
      this.fetchData()
    },
    current() {
      this.checkDaytime()
    }
  },
  mounted() {
    this.checkDaytime()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import './assets/scss/style.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
