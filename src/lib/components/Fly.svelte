<script>
    import {fly} from 'svelte/transition';
    import {inview} from 'svelte-inview';

    let isInView;

    export let dir, amount, duration = 1000, delay = 0

</script>


<div use:inview={{ unobserveOnEnter: true, rootMargin: '-8%' }}
     on:change={({ detail }) => {isInView = detail.inView}}>
</div>
{#if isInView}
    {#if dir === "x"}
        <div transition:fly={{x:amount, duration: duration, delay: delay}}>
            <slot/>
        </div>
        {:else}
        <div transition:fly={{y:amount, duration: duration, delay: delay}}>
            <slot/>
        </div>
    {/if}
{/if}


