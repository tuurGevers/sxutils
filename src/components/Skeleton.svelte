<script lang="ts">
    export let rows
</script>

<style>
    p {
        background-color: #c1c1c1;
        color:#c1c1c1;
        margin: 0;
        padding: 0;
        animation: skeleton-pulse 1s ease-in-out infinite;
        height:16px;
    }

    @keyframes skeleton-pulse {
        0% {
            opacity: 0.4;
        }
        50% {
            opacity: 0.8;
        }
        100% {
            opacity: 0.4;
        }
    }
</style>

{#each {length:rows} as row}
    <p>p</p>
{/each}
