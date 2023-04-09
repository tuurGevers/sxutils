<script>
    import {fade} from 'svelte/transition';
    import {inview} from 'svelte-inview';

    let isInView;

    export let duration = 1000, delay = 0

</script>

<div use:inview={{ unobserveOnEnter: true, rootMargin: '-8%' }}
     on:change={({ detail }) => {isInView = detail.inView}}>
</div>
{#if isInView}
    <div transition:fade={{duration:duration, delay:delay}}>
        <slot/>
    </div>
{/if}

