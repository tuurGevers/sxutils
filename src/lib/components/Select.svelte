<script lang="ts">
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import {hover} from "../script/hover";
    import Skeleton from "./Skeleton.svelte";

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};
    let value;

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

    export let sx: Record<string, unknown> = {};
    export let items: string[];
    const dispatch = createEventDispatcher();

    function sendChange() {
        dispatch("change", {
            value,
        })
    }

    export let selected;
</script>


{#await stylor.createStyle(sx, props.sxClass)}
    <Skeleton rows={5}/>
{:then _}
    <label for={props.id}></label><select bind:value={value} style={styling} class={props.class} id={props.id} use:hover
                                          on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:change={()=>sendChange()}>
        {#each items as item}
            <option value={item} selected={item === selected}>{item}</option>
        {/each}
    </select>
{/await}


<svelte:window bind:innerWidth={width}/>
