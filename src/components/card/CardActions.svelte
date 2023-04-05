<script>
    import {afterUpdate} from "svelte";
    import {Styler} from "../../script/utils";
    import Skeleton from "../Skeleton.svelte";
    import Box from "../Box.svelte";

    let width = 0
    let styling = ""
    $: width && assignStyle()
    const stylor = new Styler()
    let alignment = ""
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
    <Box sx={{flex:"row", "flex-wrap":"wrap", "justify-content":alignment}} extra={styling} class={props.class} id={props.id} hover={props.hover} sxClass>
        <slot/>
    </Box>
{/await}


<svelte:window bind:innerWidth={width}/>
