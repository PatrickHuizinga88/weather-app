<template>
<ul class="list-group position-relative rounded-0 h-100 bg-dark">
    <li class="list-group-item bg-dark text-body small" v-if="locations.length">Showing {{locations.length}} results for: '{{ searchQuery }}'</li>
    <li class="list-group-item d-flex align-items-center bg-dark text-body py-3" v-for="(location, index) in locations" :key="index" @click="$emit('setLocation', location)">
        <i class="bi bi-geo-alt-fill me-3"></i>
        <div>
            {{ location.name }}<br>
            <span class="text-muted">
                <template v-if="location.region">
                    {{ location.region }},
                </template> {{ location.country }}
            </span>
        </div>
    </li>
</ul>
</template>

<script>
export default {
    props: {
        locations: {
            type: Array,
            required: true
        },
        searchQuery: {
            type: String,
            required: true
        }
    },
}
</script>

<style lang="scss" scoped>
ul {
    z-index: 50;
}
</style>