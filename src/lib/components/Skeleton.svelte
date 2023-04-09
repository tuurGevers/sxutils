<script lang="ts">
    export let rows
    export let width:string ="40%";
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
    div{
        width: var(--width);
        margin: 8px;
        float: left;
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

<div style={`--width:${width}`}>
    {#each {length:rows} as row}
        <p >p</p>
    {/each}
</div>

