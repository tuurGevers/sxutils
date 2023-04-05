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

        if (props.align) {
            styling += " text-align:" + props.align + ";"
        }

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
    export let variant: number = 1;
</script>


{#await stylor.createStyle(sx,props.sxClass)}
    <Skeleton/>
{:then _}
    {#if variant === 1}
        <h1 style={styling} class={props.class} id={props.id}>
            <slot/>
        </h1>
    {:else if variant === 2}
        <h2 style={styling} class={props.class} id={props.id}>
            <slot/>
        </h2>
    {:else if variant === 3}
        <h3 style={styling} class={props.class} id={props.id}>
            <slot/>
        </h3>
    {:else if variant === 4}
        <h4 style={styling} class={props.class} id={props.id}>
            <slot/>
        </h4>
    {:else if variant === 5}
        <h5 style={styling} class={props.class} id={props.id}>
            <slot/>
        </h5>
    {:else if variant === 6}
        <h6 style={styling} class={props.class} id={props.id}>
            <slot/>
        </h6>
    {/if}
{/await}
