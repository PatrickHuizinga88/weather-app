<template>
    <div class="header">
        <h1>Weather App</h1>
        <form v-on:submit.prevent="getQuery(searchQuery)">
            <input type="search" placeholder="Search location..." v-model="searchQuery" disabled/>
            <button type="submit"><fa icon="search" size="lg"/></button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        getQuery: Function
    },
    data () {
        return {
            searchQuery: ''
        }
    }
}
</script>

<style lang="scss">

.header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 0 30px;
    height: 70px;
    z-index: 2;

    h1 {
        line-height: 70px;
        cursor: default;
    }

    form {
        line-height: 70px;

        input {
            border: 0;
            border-bottom: 2px solid #fff;
            background-color: rgba(0, 0, 0, 0);
            height: 30px;
            font-size: 1.1rem;

            &::placeholder {
                color: #fff;
                opacity: 0.75;
            }
        }

        button {
            background-color: rgba(0, 0, 0, 0);
            border: 0;
            cursor: pointer;
            height: 34px;
            width: 60px;
        }
    }
}

@media only screen and (max-width: 600px) {
    h1 {
        font-size: 1.6rem;
    }

    input {
            border: 0;
            border-bottom: 2px solid #fff;
            background-color: rgba(0, 0, 0, 0);
            height: 30px;
            font-size: 1.1rem;
            width: 160px;

            &::placeholder {
                color: #fff
            }
        }

        button {
            display: none;
        }
}

</style>