<script lang="ts">
import {container} from "../script/utils";
let width=0;
let size = "md";

$: if (width) {
    getSize();
}

function getSize(){
    if (width !== undefined) {
        if (width < container.md) {
            size = "sm";
        } else if (width < container.lg) {
            size = "md";
        } else {
            size="lg";
        }
    }
}

</script>

{#if size === 'sm'}
    <slot name="sm"></slot>
{:else if size === 'md'}
    <slot name="md"></slot>
{:else}
    <slot name="lg"></slot>
{/if}

<svelte:window bind:innerWidth={width}/>
