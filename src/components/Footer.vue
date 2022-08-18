<template>
    <footer>
        <p class="mb-0">Made in Vue by <a href="https://patrickhuizinga88.github.io/">Patrick Huizinga</a></p>
    </footer>
</template>

<style lang="scss">
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        opacity: 0.6;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        padding: 7px 0;
        transition: 0.3s;

        &:hover {
            opacity: 1;
            transition: 0.3s;
        }
    }
</style>