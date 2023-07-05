<script lang="ts">
    import Box from "./Box.svelte";
    import {Variants} from "./Variants";
    import {Button} from "./index";
    import Link from "./Link.svelte";
    import {Styler} from "../script/utils";
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import Fly from "./Fly.svelte";

    let visible = false
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

    function animateIn(node) {
        node.classList.add('expand');
    }

    const dispatch = createEventDispatcher();
    $: if(visible){
        dispatch("open")
    }else{
        dispatch("close")
    }

    export let links = [];
    export let to = links;
</script>

<style>
    .hamburger-lines {
        display: block;
        height: 26px;
        width: 32px;
        position: fixed;
        top: 17px;
        left: 20px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .hamburger-lines .line {
        display: block;
        height: 4px;
        width: 100%;
        border-radius: 10px;
        background: #0e2431;
    }

    .hamburger-lines .line1 {
        transform-origin: 0% 0%;
        transition: transform 0.4s ease-in-out;
    }

    .hamburger-lines .line2 {
        transition: transform 0.2s ease-in-out;
    }

    .line3 {
        transform-origin: 0% 100%;
        transition: transform 0.4s ease-in-out;
    }

    .checkbox {
        position: fixed;
        display: block;
        height: 32px;
        width: 32px;
        top: 20px;
        left: 20px;
        z-index: 5;
        opacity: 0;
        cursor: pointer;
    }

    input[type="checkbox"]:checked{
        position: absolute;
    }
    input[type="checkbox"]:checked ~ .hamburger-lines .line1 {
        transform: rotate(45deg);
    }

    input[type="checkbox"]:checked ~ .hamburger-lines .line2 {
        transform: scaleY(0);
    }

    input[type="checkbox"]:checked ~ .hamburger-lines .line3 {
        transform: rotate(-45deg);
    }

    @keyframes expand {
        0% {
            padding: 0
        }
        100% {
            padding: 0 24px 8px 24px
        }
    }

    .expand {
    }

    .expand:hover {
        animation: expand 0.4s forwards;
        border-bottom:2px solid #fff
    }

</style>

<Box variant={Variants.NAV} sx={{display:'block', mb:8, zIndex:"900"}}>
    {#if !visible}
        <label for=""></label><input bind:value={visible} class="checkbox" type="checkbox" name="" id=""/>
        <div class="hamburger-lines">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
        </div>
    {:else}
        <Fly dir="x" amount="3000" duration={200} instant>
            <Box variant={Variants.Header}
                 sx={{flex:"col", width:"100%",height:"100vh",top:"0", "justify-content":"space-around", "align-items":"center", "background-color":props.color,position:"fixed", zIndex:"999",}}
                 hover={props.hover} extra={styling}>
                <label for=""></label>
                <input bind:checked={visible} class="checkbox" type=checkbox>
                <div class="hamburger-lines">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>
                {#each links as link,i}
                    <Fly dir="y" amount="400" duration={1000} instant>
                        <div class="expand" use:animateIn>
                            <Link click={()=>visible=false} sx={{"font-size":"1.5em", p:"0 3 1 3"}}
                                  to={to[i]}>{link}</Link>
                        </div>
                    </Fly>
                {/each}
            </Box>
        </Fly>
    {/if}
</Box>
