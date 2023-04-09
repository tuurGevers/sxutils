<script>
    import {afterUpdate} from "svelte";
    import {Styler} from "../../script/utils";
    import Skeleton from "../Skeleton.svelte";
    import Typography from "../Typography.svelte";

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
    <Typography extra={styling} variant={1} class={props.class} id={props.id} hover={props.hover}>
        <slot/>
    </Typography>
{/await}


<svelte:window bind:innerWidth={width}/>
