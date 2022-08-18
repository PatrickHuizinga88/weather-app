<template>
    <header>
        <nav class="navbar" :class="{'bg-dark': showSearchbar}">
            <div class="container-fluid p-2 px-lg-4">
                <a class="navbar-brand text-white" v-if="!showSearchbar">
                    <h1>Weather App</h1>
                </a>
                <button @click="showSearchbar = true" class="btn btn-link" v-if="!showSearchbar">
                    <i class="bi bi-geo-alt-fill fs-4"></i>
                </button>

                <form class="d-flex align-items-center w-100" role="search" v-if="showSearchbar">
                    <button class="btn btn-link" @click.prevent="showSearchbar = false"><i class="bi bi-chevron-left"></i></button>
                    <input @input="getLocation" v-model="searchQuery" class="form-control bg-dark border-0" type="search" placeholder="Search location" aria-label="Search" ref="searchbar">
                </form>
            </div>
        </nav>
    </header>

    <SearchResult :locations="locations" :searchQuery="searchQuery" @setLocation="setLocation" v-if="showSearchbar"/>
</template>

<script>
import SearchResult from '@/components/SearchResult'

export default {
    components: {SearchResult},
    data () {
        return {
            showSearchbar: false,
            searchQuery: '',
            locations: [],
        }
    },
    methods: {
        // Fetch all locations based on the search query
        getLocation() {
            fetch(`https://api.weatherapi.com/v1/search.json?${new URLSearchParams({
                key: 'ce4eb1b20d3f42a4b64152404212209',
                q: this.searchQuery
            })}`)
            .then(response => response.json())
            .then(data => {
                this.locations = data
            })
        },
        setLocation(location) {
            this.showSearchbar = false
            this.$emit('setLocation', location)
        }
    },
    watch: {
        showSearchbar(newVal) {
            if (newVal) {
                this.$nextTick(() => {
                    this.$refs.searchbar.focus()
                })
            }
        }
    }
}
</script>

<style lang="scss">
.list-group-item:not(:first-of-type) {
    cursor: pointer;

    &:hover {
        background-color: #111 !important;
    }
}
</style>