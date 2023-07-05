<script>
    import Box from "./Box.svelte";
    import { createEventDispatcher, getContext } from "svelte";
    import {  value as valueStore } from "$lib/script/Store.js";

    const selection = getContext('selection');
    export let value;
    export let selected = false;
    export let sx;
    const dispatch = createEventDispatcher();

    function handleClick() {
        selection.setSelectedOption(value);
        $valueStore = false
    }
   export  let display;
    export let id = "a";
    $:{

    }
</script>

{#if display === true && $valueStore === true}
    <Box selected={selected} sx={sx} sxClass={[{ width: "100%", p: 1 }]} hover={{ bgc: "#B0E0E6" }} click={() => handleClick()}>
        <slot></slot>
    </Box>
{:else}
    {#if selected}
        <Box selected={selected} sxClass={[{ width: "100%", p: 1 }]} hover={{ bgc: "#B0E0E6" }} sx={sx} click={() => {dispatch("open",{value:id}); $valueStore=true}}>
            <slot></slot>
        </Box>
    {/if}
{/if}
