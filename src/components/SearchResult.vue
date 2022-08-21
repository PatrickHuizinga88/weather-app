<template>
<ul class="list-group position-relative rounded-0 h-100 bg-dark">
    <li class="list-group-item border-top-0 border-bottom bg-dark text-muted small" v-if="locations.length">Showing {{ locations.length }} results for: '{{ searchQuery }}'</li>
    <li class="list-group-item bg-dark text-muted small" v-if="locations.hasOwnProperty('error') || searchQuery.length < 3">Enter at least 3 charcters to search</li>
    <li class="list-group-item bg-dark text-muted small" v-else-if="!locations.length && searchQuery.length > 3">No results found for: '{{ searchQuery }}'</li>
    <template v-else>
        <li class="list-group-item border-bottom d-flex align-items-center bg-dark text-body py-3" v-for="(location, index) in locations" :key="index" @click="$emit('setLocation', location)">
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
    </template>
</ul>
</template>

<script>
export default {
    emits: ['setLocation'],
    props: {
        locations: {
            type: Object,
            required: true
        },
        searchQuery: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
ul {
    z-index: 50;

    > li.border-bottom {
        border-color: #222 !important;
        transition: .15s;

        &:not(:first-of-type):hover {
            background: #111 !important;
            cursor: pointer !important;
        }
    }
}
</style>