<template>
    <div class="d-flex align-items-center justify-content-center text-center opacity-50">
        Last updated: {{ timeUpdated }}
        <button class="refresh-button btn btn-link d-flex p-2 me-n2" @click="updateData"> <!-- TODO: Add refresh button animation -->
            <i class="bi bi-arrow-clockwise fs-5 lh-1" ref="refreshIcon"></i>
        </button>
    </div>
    <div class="weather-wrapper d-flex flex-column align-items-center justify-content-center h-75">
        <div class="d-flex align-items-center mb-2">
            <img :src="current.condition.icon" class="me-2"/>
            <div>
                <h2 class="mb-0">Today</h2>

            </div>

        </div>
        <span class="temp lh-1 mb-3">{{ current.temp_c }}&#176;</span>
        <h1 class="fs-5">{{ location.name }}, {{ location.country }}</h1>
        <div class="d-flex gap-3 opacity-50">
            <p class="text mb-0">{{ current.condition.text }}</p>
            <span>&#9679;</span>
            <p class="sub-text">Feels like: <b>{{ current.feelslike_c }}&#176;</b></p>
        </div>

        <div class="card rounded-5 mt-4">
            <div class="card-body px-3 px-md-4 px-lg-5">
                <div class="row">
                    <div class="col-6 mb-2" v-for="(weatherDetail, index) in weatherDetails" :key="index">
                        <div class="d-inline-flex align-items-center">
                            <i class="bi fs-4 me-3" :class="`bi-${weatherDetail.icon}`"></i>
                            <div>
                                {{ weatherDetail.title }}<br/>
                                <span class="fs-3 me-1">{{ weatherDetail.data }}</span>
                                <small>{{ weatherDetail.suffix }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['updatedData'],
    props: {
        location: Object,
        current: Object
    },
    data () {
        return {
            timeUpdated: null,
        }
    },
    computed: {
        weatherDetails() {
            return [
                {title: 'Wind', icon: 'wind', data: this.current.wind_dir + this.current.wind_kph , suffix: 'km/h'},
                {title: 'Humidity', icon: 'droplet-fill', data: this.current.humidity , suffix: '%'},
                {title: 'Precipitation', icon: 'cloud-rain-fill', data:  this.current.precip_mm , suffix: 'mm'},
                {title: 'UV-index', icon: 'brightness-high-fill', data: this.current.uv , suffix: 'of 10'}
            ]
        }
    },
    methods: {
        updateData() {
            this.$emit('updatedData')
            this.setCurrentTime()
        },

        setCurrentTime() {
            const now = new Date()

            this.timeUpdated = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2)
        },

        checkTime(i) {
            return (i < 10) ? "0" + i : i;
        }
    },
    mounted() {
        this.setCurrentTime()
    }
}
</script>

<style lang="scss">
.card {
    width: 90%;
    max-width: 450px;
    background-color: rgba(255, 255, 255, 0.1) !important;
    box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    border-top: 1px solid rgba(255, 255, 255, 0.5) !important;
    border-left: 1px solid rgba(255, 255, 255, 0.5) !important;

    .row > .col-6:nth-of-type(3), .col-6:nth-of-type(4) {
        margin-bottom: 0 !important;
    }
}

span.temp {
    font-size: 5.5rem;
}

</style>