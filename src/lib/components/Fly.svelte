<script>
    import {fly} from 'svelte/transition';
    import {inview} from 'svelte-inview';
    import Box from "$lib/components/Box.svelte";

    let isInView;


    export let dir, amount, duration = 1000, delay = 0, sx={}
    export let instant = false
</script>

<style>
    div {
        z-index: 999;
    }
</style>
{#if !instant}
    <div transition:fly={{x:amount, duration: duration, delay: delay}} use:inview={{ unobserveOnEnter: true, rootMargin: '10px' }}
         on:inview_change={({ detail }) => {isInView = detail.inView}}>
        <slot/>
    </div>
{/if}
{#if isInView || instant}
    {#if dir === "x"}
        <div transition:fly={{x:amount, duration: duration, delay: delay}}>
            <Box sx={sx}>
                <slot/>
            </Box>
        </div>
    {:else}
        <div transition:fly={{y:amount, duration: duration, delay: delay}}>
            <slot/>
        </div>
    {/if}
{/if}


