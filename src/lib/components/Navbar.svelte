<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import Skeleton from "./Skeleton.svelte";
    import Box from "./Box.svelte";
    import Link from "./Link.svelte";
    import P from "./P.svelte";
    import {fade} from "svelte/transition";

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};

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
    let display = true;


    let prevScrollPos;
    let visibleHeight = 0;



    const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const scrollDiff = Math.abs(prevScrollPos - currentScrollPos);
            if (scrollDiff >= visibleHeight) {
                display = prevScrollPos > currentScrollPos;
                prevScrollPos = currentScrollPos;
            }

    }

    const divRef = node => {
        if (node) {
            visibleHeight = node.getBoundingClientRect().height;
        }
    };

    onMount(() => {
        prevScrollPos = window.pageYOffset;
        window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };

    });

</script>

<style>
    div {
        position: fixed;
        top: 0;
        width: 100%;
        visibility: hidden;
    }
</style>
{#await stylor.createStyle(sx,props.sxClass)}
    <Skeleton/>
{:then _}
        <div rel="{divRef}" transition:fade={{duration:1000}}>
                <Box sx={{flex:{sm:"col", lg:"row",}, width:"100%", "justify-content":"space-around", "align-items":"center", "background-color":props.color, "padding":"1em",position:"relative", visibility: display?"visible":"hidden", zIndex:display?20:0}}
                     hover={props.hover} extra={styling}>
                    {#each links as link}
                        <Link sx={{"font-size":"1.5em"}} to={link}>{link}</Link>
                    {/each}
                </Box>
        </div>
        <P sx={{"min-height":{sm:sx.height.sm || sx.height ,md:sx.height.md || sx.height ,lg:sx.height.lg || sx.height}, visibility:"hidden",
       }}>s</P>

{/await}


<svelte:window bind:innerWidth={width}/>
