<script>
    import {afterUpdate} from "svelte";
    import {Styler} from "../../script/utils";
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
    <Box class={props.class} id={props.id} extra={styling} hover={props.hover}>
        <slot/>
    </Box>
{/await}


<svelte:window bind:innerWidth={width}/>
