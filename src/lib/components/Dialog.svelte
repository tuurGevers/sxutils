<script lang="ts">
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import {hover} from "../script/hover";
    import Skeleton from "./Skeleton.svelte";
    import {clickOutside} from "../script/clickOutside"

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};

    const stylor = new Styler();
    const hoverStylor = new Styler();
    const dispatch = createEventDispatcher()
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

    function outside() {
        value.close()
        dispatch("outside")
    }

    export let sx: Record<string, unknown> = {};
    export let open
    let value;
    $:if (value !== undefined) open ? value.showModal() : value.close()


</script>


{#await stylor.createStyle(sx, props.sxClass)}
    <Skeleton/>
{:then _}
    <dialog style={styling} on:click={props.click} on:keypress={(e)=>e.key==="Enter"?props.click:""} bind:this={value}
            class={props.class} id={props.id} use:hover
            on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()}>
        <div use:clickOutside on:click_outside={()=>outside()}>
            <slot/>
        </div>
    </dialog>
{/await}


<svelte:window bind:innerWidth={width}/>
