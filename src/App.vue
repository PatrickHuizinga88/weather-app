<template>
  <Header :getQuery="getSearchQuery" ref="header"/>
  <SearchResult v-show="showResults" :searchResults="filteredLocations" :getLocation="getSelectedLocation" :searchQuery="searchQuery"/>
  <WeatherInfo 
    v-if="showWeather"
    :name="location.name"
    :country="location.country"
    :lastUpdate="current.last_updated"
    :icon="condition.icon"
    :text="condition.text"
    :localTime="location.localtime"
    :temp="current.temp_c"
    :feelTemp="current.feelslike_c"
    :windSpeed="current.wind_kph"
    :windDirection="current.wind_dir"
    :humidity="current.humidity"
    :precip="current.precip_mm"
    :uvIndex="current.uv"

  />
  <div class="replacement-text" v-if="!showWeather">
    <p @click="focusOnInput">Search for a location first.</p>
  </div>
  <Footer />
</template>

<script>
import axios from 'axios'
import Header from './components/Header.vue'
import SearchResult from './components/SearchResult.vue'
import WeatherInfo from './components/WeatherInfo.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  metaInfo: {
      title: 'Weather App'
  },
  components: {
      Header,
      SearchResult,
      WeatherInfo,
      Footer
  },
  data () {
    return {
      showWeather: false,
      location: [],
      current: [],
      condition: [],
      isDay: '',
      searchQuery: '',
      filteredLocations: [],
      showResults: false,
      selectedLocation: ''
    }
  },
  methods: {
    fetchData() {
      axios
      .get('https://api.weatherapi.com/v1/current.json', {
        params: this.axiosParams
      })
      .then(response => (this.location = response.data.location,
                         this.current = response.data.current,
                         this.condition = response.data.current.condition,
                         this.isDay = response.data.current.is_day))
    },

    // Fetch all locations based on the search query
    fetchSearchData() {
      axios
      .get('https://api.weatherapi.com/v1/search.json', {
        params: {
          key: 'ce4eb1b20d3f42a4b64152404212209',
          q: this.searchQuery
        }
      })
      .then(response => (this.filteredLocations = response.data))
    },

    // Get the search query from the Header
    getSearchQuery(query) {
      if(query.length > 2) {
        this.searchQuery = query
        this.fetchSearchData()
        this.showResults = true
      } else {
        alert("Please enter more than 2 characters.")
      }
    },

    // Get the selected location and fetch the correct data
    getSelectedLocation(searchResult) {
      this.selectedLocation = searchResult
      this.fetchData()
      this.showWeather = true
      this.showResults = false
      this.$refs.header.emptyInput()
    },

    // Check whether it is day of night in the current location
    checkIfDay() {
      if(this.isDay === 1) {
        document.body.style.background = "rgb(85,174,255)"
        document.body.style.background = "linear-gradient(135deg, rgba(85,174,255,1) 0%, rgba(101,67,255,1) 100%)"
      } else {
        document.body.style.background = "rgb(28, 65, 100)"
        document.body.style.background = "linear-gradient(135deg, rgb(28, 65, 100) 0%, rgb(34, 23, 82) 100%)"
      }
    },

    // Focus on the search input when the weather replacement text is clicked
    focusOnInput() {
      this.$refs.header.focusOnInput()
    }
    
  },
  updated () {
    this.checkIfDay()
  },
  computed: {
    axiosParams() {
      const params = new URLSearchParams();
      params.append('key', 'ce4eb1b20d3f42a4b64152404212209')
      params.append('q', this.selectedLocation.name)
      return params;
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import './assets/styles/style.scss';

#app {
  font-family: 'Poppins', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, p {
  margin: 0;
}

.replacement-text {
  position: relative;
  height: calc(100vh - 70px);
  text-align: center;
  font-size: 1.3rem;
  width: 100%;
  
  p {
    position: absolute;
    top: calc(50% - 35px);
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}

</style>
