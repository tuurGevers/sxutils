<script lang="ts">
    import {afterUpdate, onMount} from "svelte";
    import {Styler} from "../script/utils";
    import {hover} from "../script/hover";
    import Skeleton from "./Skeleton.svelte";
    import {Variants} from "./Variants";

    let width = 0;
    let styling = "";
    let permaStyle = "";
    let hoverStyle = "";
    let props = {...$$restProps};
    let component;
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

    let divWidth = 0;



    export let sx: Record<string, unknown> = {};
    export let variant: Variants = Variants.DIV
    export let id: string = Variants[variant].toLocaleLowerCase();
</script>


{#await stylor.createStyle(sx, props.sxClass)}
    <Skeleton rows={5}/>
{:then _}
    {#if variant === Variants.DIV}
        <div bind:this={component} style={styling} on:click={(e)=>e.stopPropagation()} on:keypress={(e)=>e.key==="Enter"?e.stopPropagation():""} class={props.class} id={id} use:hover
             on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:scroll={props.scroll} on:scroll={props.scroll}>
            <slot/>
        </div>
    {/if}
    {#if variant === Variants.ARTICLE}
        <article bind:this={component} style={styling} on:click={(e)=>e.stopPropagation()} on:keypress={(e)=>e.key==="Enter"?e.stopPropagation():""} class={props.class} id={id} use:hover
                 on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:scroll={props.scroll}>
            <slot/>
        </article>
    {/if}
    {#if variant === Variants.ASIDE}
        <aside bind:this={component} style={styling} on:click={(e)=>e.stopPropagation()} on:keypress={(e)=>e.key==="Enter"?e.stopPropagation():""} class={props.class} id={id} use:hover
               on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:scroll={props.scroll}>
            <slot/>
        </aside>
    {/if}
    {#if variant === Variants.FOOTER}
        <footer bind:this={component} style={styling} on:click={(e)=>e.stopPropagation()} on:keypress={(e)=>e.key==="Enter"?e.stopPropagation():""} on:keypress={(e)=>e.key==="Enter"?e.stopPropagation():""} class={props.class} id={id} use:hover
                on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:scroll={props.scroll}>
            <slot/>
        </footer>
    {/if}
    {#if variant === Variants.HEADER}
        <header bind:this={component} style={styling} on:click={(e)=>e.stopPropagation()} on:keypress={(e)=>e.key==="Enter"?e.stopPropagation():""} class={props.class} id={id} use:hover
                on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:scroll={props.scroll}>
            <slot/>
        </header>
    {/if}
    {#if variant === Variants.MAIN}
        <main bind:this={component} style={styling} on:click={(e)=>e.stopPropagation()} on:keypress={(e)=>e.key==="Enter"?e.stopPropagation():""} class={props.class} id={id} use:hover
              on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:scroll={props.scroll}>
            <slot/>
        </main>
    {/if}
    {#if variant === Variants.NAV}
        <nav bind:this={component} style={styling} on:click={(e)=>e.stopPropagation()} on:keypress={(e)=>e.key==="Enter"?e.stopPropagation():""} class={props.class} id={id} use:hover
             on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:scroll={props.scroll}>
            <slot/>
        </nav>
    {/if}
    {#if variant === Variants.SECTION}
        <section bind:this={component} style={styling} on:click={(e)=>e.stopPropagation()} on:keypress={(e)=>e.key==="Enter"?e.stopPropagation():""} class={props.class} id={id} use:hover
                 on:hover={(e)=>handleHover(e)} on:leave={()=>handleLeave()} on:scroll={props.scroll}>
            <slot/>
        </section>
    {/if}
{/await}


<svelte:window bind:innerWidth={width}/>
