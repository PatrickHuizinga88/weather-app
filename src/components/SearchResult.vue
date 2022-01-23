<template>
    <div class="list">
        <p>Showing {{searchResults.length}} results for: '{{searchQuery}}'</p>
        <div class="item" v-for="searchResult in searchResults" v-bind:key="searchResult.id" @click="getLocation(searchResult)">
            <fa icon="map-marker-alt" />
            <p>{{searchResult.name}}, {{searchResult.country}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        searchResults: Array,
        getLocation: Function,
        searchQuery: String
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
        width: calc(100% - 60px); /*Width minus padding*/
        height: calc(100vh - 70px); /*Height minus header*/
        overflow: scroll;
        overflow-x: hidden;
        list-style-type: none;
        padding: 0 30px;
        background: rgb(0, 0, 0);
        z-index: 3;

        &::-webkit-scrollbar { display: none }

        p {
            opacity: 0.8;
            margin: 20px 0;
        }

        .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            // padding: 25px 0;
            font-size: 1.1rem;
            line-height: 1.3;
            border-bottom: 1px solid gray;
            cursor: pointer;

            svg {
                margin-right: 20px;
            }
        }
    }

</style>