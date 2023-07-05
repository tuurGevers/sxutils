<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import Skeleton from "./Skeleton.svelte";
    import Box from "./Box.svelte";
    import Link from "./Link.svelte";
    import {Variants} from "./Variants";
    import Image from "./Image.svelte";
    import P from "./P.svelte";

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};
    let display = true;
    let prevScrollPos;
    let visibleHeight = 0;

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
    export let links = []
    export let to = links;
    export let logo: string = "logo"
</script>

{#await stylor.createStyle(sx, props.sxClass)}
    <Skeleton/>
{:then _}
    <Box variant={Variants.Header}
         sx={{flex:"row",borderBottom:"2px solid #b1b1b1", width:"100%", "justify-content":"space-between", alignItems:"flex-end", "background-color":props.color, p:"10 0 5 0",position:"relative", zIndex:20}}
         hover={props.hover} extra={styling}>
        {#if logo.includes(".")}
            <Image src={logo} sx={{pl:5, width:"auto", height:"10vh"}}/>
        {:else}
                <P sx={{pl:5, "font-size":"1.5em", verticalAlign:"bottom"}}>{logo}</P>
        {/if}
        <Box variant={Variants.section} sx={{flex:"row", flexAlign:"around" ,width:"40%"}}>
            {#each links as link,i}
                <Link sx={{"font-size":"1.5em"}} hover={{borderBottom:`2px solid ${props.color}`}} to={to[i]}>{link}</Link>
            {/each}
        </Box>
    </Box>
{/await}


<svelte:window bind:innerWidth={width}/>
