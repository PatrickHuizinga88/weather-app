<template>
    <p class="last-update mb-3">Last update: {{ current.last_updated }}</p> <!-- TODO: Add refresh button -->
    <div class="weather-info">
        <div class="top-info my-3">
            <img :src="condition.icon" height="65" width="65"/>
            <div class="d-flex align-items-center">
                <h2 class="mb-0">Today</h2>
                <p>{{ location.localtime }}</p>
            </div>
        </div>
        <h1 class="mb-3">{{ current.temp_c }}&#176;</h1>
        <h3 class="fs-4">{{ location.name }}, {{ location.country }}</h3>
        <div class="center-info">
            <p class="text mb-0">{{ condition.text }}</p>
            <span>&#9679;</span>
            <p class="sub-text">Feels like: <b>{{ current.feelslike_c }}&#176;</b></p>
        </div>

        <div class="weather-details card">
            <div class="col">
                <div class="detail-item">
                    <fa icon="wind" size="lg"/>
                    <div class="detail-text">
                        <p class="mb-0">Wind</p>
                        <h3>{{ current.wind_dir }} {{ current.wind_kph }} <span class="small-text">km/h</span></h3>
                    </div>
                </div>
                <div class="detail-item">
                    <fa icon="cloud-rain" size="lg"/>
                    <div class="detail-text">
                        <p class="mb-0">Precipitation</p>
                        <h3>{{ current.precip_mm }}<span class="small-text"> mm</span></h3>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="detail-item">
                    <fa icon="tint" size="lg"/>
                    <div class="detail-text">
                        <p class="mb-0">Humidity</p>
                        <h3>{{ current.humidity }}<span class="small-text">%</span></h3>
                    </div>
                </div>

                <div class="detail-item">
                    <fa icon="sun" size="lg"/>
                    <div class="detail-text">
                        <p class="mb-0">UV-index</p>
                        <h3>{{ current.uv }}<span class="small-text"> of 10</span></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        location: Object,
        current: Object,
        condition: Object,
    },
    data () {
        return {
            newUpdate: ''
        }
    },
    methods: {
        fetchData() {
            this.$parent.fetchData()
            this.getCurrentTime()
        },
        getCurrentTime() {
            const now = new Date()
            this.newUpdate = now
        }
    }
}
</script>

<style lang="scss">

.last-update {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    margin: 30px 0;
    opacity: 0.6;
    z-index: 2;

    svg {
        margin-left: 10px;
        cursor: pointer;
    }
}

.weather-info {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    height: calc(100vh - 70px); /*Height minus Header*/
    width: 80%;
    min-height: 640px;

    h1 {
        font-size: 6rem;
        font-weight: normal;
        line-height: 1.1;
    }

    h2 {
        font-size: 2.2rem;
        font-weight: normal;
    }

    p {
        font-size: 1.2rem;
        opacity: 0.6;
    }

    .top-info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        text-align: left;
        margin-bottom: 20px;

        img {
            margin-right: 10px;
        }
    }

    .center-info {
        display: flex;
        justify-content: center;

        p {
            margin: 0 20px;
        }

        span {
            opacity: 0.6;
        }
    }

    .weather-details {
    display: flex;
    flex-direction: row;
    justify-content: center;

        .col {
            display: flex;
            flex-direction: column;
        }

        .detail-item {
            display: flex;
            flex-direction: row;
            align-content: center;
            justify-content: flex-start;
            margin: 15px 25px;
            // width: 160px;
            width: auto;

            svg {
                width: 21px;
            }
        }

        .detail-text {
            display: flex;
            flex-direction: column;
            margin-left: 15px;
            text-align: left;

            h3 {
                margin: 0;
            }

            .small-text {
                font-size: 1.2rem;
            }
        }

        .sub-text {
            font-size: 1.2rem;
        }
    }

    .card {
        text-align: center;
        padding: 10px 30px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 25px;
        box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(5px);
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        width: auto;
        margin: 35px auto 0 auto;
    }
}

@media only screen and (max-width: 600px) {
    .weather-info {
        width: 90%;

        .weather-details {

            .detail-item {
                margin: 15px 10px !important;

                .detail-text {

                    p, h3, .small-text {
                        font-size: 1rem !important;
                    }
                }
            }
        }

        .card {
        width: 100% !important;
        padding: 8px 0px !important;
        margin: 35px 0;
        }
    }
}

</style>