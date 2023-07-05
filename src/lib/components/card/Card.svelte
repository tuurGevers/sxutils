<script>
    import {afterUpdate, onMount} from "svelte";
    import {Styler} from "../../script/utils";
    import {hover} from "../../script/hover";
    import Skeleton from "../Skeleton.svelte";
    import Box from "../Box.svelte";

    let width = 0
    let styling = ""
    $: width && assignStyle()
    const stylor = new Styler()
    let props = {...$$restProps};

    function assignStyle() {
        styling = stylor.selectStyle(width)
        if (props.extra) {
            styling += " " + props.extra
        }
    }

    export let sx = {}
    afterUpdate(() => {
        assignStyle()
    })


</script>

{#await stylor.createStyle(sx,props.sxClass)}
    <Skeleton/>
{:then _}
        <Box sx={{flex:"col", float:props.float, "rounding":3, "align-items":"center", margin:"1em"}} extra={styling} class={props.class} click={props.click} id={props.id} hover={props.hover}>
            <slot/>
        </Box>
{/await}


<svelte:window bind:innerWidth={width}/>
