<template>
    <footer class="position-fixed bottom-0 start-0 text-center w-100 opacity-50 py-2">
        <p class="mb-0">Made in Vue by <a href="https://patrickhuizinga88.github.io/" target="_blank">Patrick Huizinga</a></p>
    </footer>
</template>

<style lang="scss">
    footer {
        background: linear-gradient(0, #000 0%, #fff0 100%);
        transition: 0.3s;

        &:hover {
            opacity: 1 !important;
        }
    }
</style>