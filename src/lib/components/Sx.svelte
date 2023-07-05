<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import {hover} from "../script/hover";
    import Skeleton from "./Skeleton.svelte";
    import {Variants} from "./Variants";

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};
    let component;
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

    function handleHover() {
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

    let divWidth = 0;


    export let sx: Record<string, unknown> = {};
    export let id: string = "span";
</script>


{#await stylor.createStyle(sx, props.sxClass)}
    <Skeleton rows={5}/>
{:then _}
        <span bind:this={component} style={styling} on:click={props.click}
              on:keypress={(e)=>e.key==="Enter"?props.click:""} class={props.class} id={id} use:hover
              on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:scroll={props.scroll}
              on:scroll={props.scroll}>
            <slot/>
        </span>

{/await}


<svelte:window bind:innerWidth={width}/>
