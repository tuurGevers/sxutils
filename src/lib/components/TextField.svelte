<script lang="ts">
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import {hover} from "../script/hover";
    import Skeleton from "./Skeleton.svelte";

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};
    let preview = true;


    const dispatch = createEventDispatcher();
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


    function handleChange() {
        dispatch("change", {
            value
        })
    }


    export let value, type;
    export let sx: Record<string, unknown> = {};
</script>

{#await stylor.createStyle(sx,props.sxClass)}
    <Skeleton/>
{:then _}
    <label>
        {#if type === "password" ||  type === "pass" }
            <input type="password" style={styling} bind:value={value} class={props.class} id={props.id} use:hover
                   on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:input={()=>handleChange()} on:click={()=>{
                   if (preview){value=""; preview=false}
               }}/>
        {:else}
            {#if type === "email"}
                <input type="email" style={styling} bind:value={value} class={props.class} id={props.id} use:hover
                       on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:input={()=>handleChange()}
                       on:click={()=>{
                   if (preview){value=""; preview=false}
               }}/>
                {:else}
                <input type="text" style={styling} bind:value={value} class={props.class} id={props.id} use:hover
                       on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:input={()=>handleChange()}
                       on:click={()=>{
                   if (preview){value=""; preview=false}
               }}/>
            {/if}
        {/if}
    </label>
{/await}


<svelte:window bind:innerWidth={width}/>
