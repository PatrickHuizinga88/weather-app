<template>
    <div class="list">
        <div class="item" v-for="searchResult in searchResults" v-bind:key="searchResult.id" @click="getLocation(searchResult)">
            <fa icon="map-marker-alt" />
            {{searchResult.name}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        searchResults: Array,
        getLocation: Function
    },
    data () {
        return {
            searchResult: []
        }
    }
}
</script>

<style lang="scss">

    .list {
        position: absolute;
        top: 70px;
        width: calc(100% - 60px);
        height: calc(100vh - 70px);
        overflow: scroll;
        overflow-x: hidden;
        list-style-type: none;
        padding: 0 30px;
        background: rgb(0, 0, 0);
        z-index: 2;

        &::-webkit-scrollbar {display: none}

        .item {
            padding: 25px 0;
            font-size: 1.1rem;
            border-bottom: 1px solid gray;
            cursor: pointer;

            svg {
                margin-right: 15px;
            }
        }
    }

</style>