<script lang="ts">
    import {afterUpdate, createEventDispatcher, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import {hover} from "../script/hover";
    import Skeleton from "./Skeleton.svelte";
    import {P} from "./index";

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};


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


    function handleChange(e) {
        dispatch("change", {
            value,
            target: e.target
        })
    }


    function handleKeyDown(event) {
        if (event.key === "Enter") {
            dispatch("enter", {
                value,
            });
        }
        if (event.key === "Backspace") {
            dispatch("backspace")
        }
    }

    export let error = false;

    export let value, type = "text";
    export let preview = true;
    export let sx: Record<string, unknown> = {};
    export let errorMessage = ""
</script>

{#await stylor.createStyle(sx, props.sxClass)}
    <Skeleton/>
{:then _}
    <div style="display:flex;flex-direction:column;align-items: center">
        <label>
            {#if type === "password" || type === "pass" }
                <input type="password" style={styling} bind:value={value} class={props.class} id={props.id} use:hover
                       on:hover={(e)=>handleHover(e)} on:keydown={(e) => handleKeyDown(e)}
                       on:leave={()=>handleLeave()} on:click={(e)=>{preview? value="": "";e.stopPropagation()}}
                       on:input={(e)=>handleChange(e)}/>
            {:else}
                {#if type === "email"}
                    <input type="email" style={styling} bind:value={value} class={props.class} id={props.id} use:hover
                           on:hover={(e)=>handleHover(e)} on:keydown={(e) => handleKeyDown(e)}
                           on:leave={()=>handleLeave()} on:click={(e)=>{preview? value="": "";e.stopPropagation()}}
                           on:input={(e)=>handleChange(e)}
                    />
                {:else}
                    <input type="text" style={styling} bind:value={value} class={props.class} id={props.id} use:hover
                           on:hover={(e)=>handleHover(e)} on:keydown={(e) => handleKeyDown(e)}
                           on:leave={()=>handleLeave()} on:click={(e)=>{preview? value="": "";e.stopPropagation()}}
                           on:input={(e)=>handleChange(e)}
                    />
                {/if}
            {/if}
        </label>
        {#if error}
            <P sx={{fontSize:2, color:"red"}}>{errorMessage}</P>
        {/if}
    </div>
{/await}


<svelte:window bind:innerWidth={width}/>
