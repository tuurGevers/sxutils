<script lang="ts">
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import {hover} from "../script/hover";
    import Skeleton from "./Skeleton.svelte";
    import {Box} from "./index";

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};
    let checked = [];

    const stylor = new Styler();
    const hoverStylor = new Styler();
    const dispatch = createEventDispatcher();

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

    $: if (checked.length > 0) {
        const combinedArray = checked.map((bool, index) => {
            if (bool) {
                return boxes[index];
            }
        })
        dispatch("checked", {
            value: combinedArray,
        });
    }

    export let sx: Record<string, unknown> = {};
    export let boxes: string[];
    export let id: string = "checkbox";
</script>


{#await stylor.createStyle(sx, props.sxClass)}
    <Skeleton rows={5}/>
{:then _}
    {#each boxes as box,i}
        <Box sx={{userSelect:"none"}} click={()=>checked[i] = !checked[i]}>
            {box}
            <input type=checkbox style={styling} bind:checked={checked[i]} id={id+i} class={props.class}
                   use:hover
                   on:hover={(e)=>handleHover(e)}
                   on:leave={()=>handleLeave()}
            />
        </Box>

    {/each}
{/await}


<svelte:window bind:innerWidth={width}/>
