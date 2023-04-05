<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import {hover} from "../script/hover";
    import Skeleton from "./Skeleton.svelte";

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};

    const stylor = new Styler();
    const hoverStylor = new Styler();

    $: if (width) {
        assignStyle();
    }

    onMount(async () => {
        if (props.hover) {
            await hoverStylor.createStyle(props.hover);
        }
    });

    afterUpdate(() => {
        assignStyle();
    });

    function assignStyle() {
        styling = stylor.selectStyle(width);

        if (props.extra) {
            styling += " " + props.extra;
        }

        if (props.hover) {
            styling += " " + hoverStyle;
        }

        permaStyle = styling;
    }

    function handleHover(e: MouseEvent) {
        if (props.hover) {
            hoverStyle = hoverStylor.selectStyle(width);
            assignStyle();
        }
    }

    function handleLeave() {
        if (props.hover) {
            hoverStyle = "";
            assignStyle();
        }
    }

    export let sx: Record<string, unknown> = {};
    export let external = false
    export let to = ""
</script>


<style>
    a, a:visited {
        color: inherit;
        text-decoration: none;
    }
</style>

{#await stylor.createStyle(sx,props.sxClass)}
    <Skeleton/>
{:then _}
    {#if external}
        <a style={styling} on:click={props.click} class={props.class} id={props.id} href={to} use:hover
           on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()}>
            <slot/>
        </a>
    {:else}
        <a style={styling} on:click={props.click} class={props.class} id={props.id} href={to}
           use:hover
           on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()}>
            <slot/>
        </a>
    {/if}
{/await}


<svelte:window bind:innerWidth={width}/>
