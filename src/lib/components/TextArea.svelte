<script lang="ts">
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import {hover} from "../script/hover";
    import Skeleton from "./Skeleton.svelte";
    import {selection} from "./selection";

    let width = 0
    let styling = ""
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};

    $: width && assignStyle()

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


    export let value

    let change
    if (props.util) {
        props.util.change.subscribe((value) => change = value)
    }
    $:if (props.util && props.util.tekst.length > 1 && change) {
        value = props.util.tekst
        props.util.change.set(false)
    }


    const dispatch = createEventDispatcher();

    function handleChange() {
        dispatch("change", {
            value,
        })
    }

    function handleSelect(e) {
        dispatch("selection", {
            area: e.target
        })
    }

    export let type = ""
    export let sx: Record<string, unknown> = {};

</script>

{#await stylor.createStyle(sx,props.sxClass)}
    <Skeleton/>
{:then _}
    <label for={props.id}></label>
    <textarea style={styling} bind:value={value} class={props.class} id={props.id} use:hover use:selection
              on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:input={()=>handleChange()}
              on:selection={(e)=>handleSelect(e) }></textarea>

{/await}


<svelte:window bind:innerWidth={width}/>
