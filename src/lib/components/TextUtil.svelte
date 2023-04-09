<script>
    import Button from "./Button.svelte";
    import {FormUtil} from "./formUtil";
    import TextArea from "./TextArea.svelte";
    import Box from "./Box.svelte";
    import {afterUpdate, createEventDispatcher} from "svelte";
    import TextField from "./TextField.svelte";
    import P from "./P.svelte";
    import Typography from "./Typography.svelte";
    import Dialog from "./Dialog.svelte";
    import {Styler} from "../script/utils";
    import Skeleton from './Skeleton.svelte';


    export let modes, value

    let tekst, link, selection;
    const formutil = new FormUtil();
    let area
    export let lines;
    const dispatch = createEventDispatcher();
    const update = (mode) => {
        tekst = tekst
        formutil.updateString(mode, tekst, selection, link)
        dispatch("valueChange", {
            value: formutil.tekst
        })
        tekst = formutil.tekst
    }

    function updateSelection(area) {
        selection = {
            start: area.selectionStart,
            end: area.selectionEnd,
        }
    }

    function handleChange(e) {
        tekst = e.detail.value
        dispatch("valueChange", {
            value: tekst
        })
    }

    function handleSelection(e) {
        area = e.detail.area
        updateSelection(e.detail.area)
    }

    const allModes = ["bold", "italic", "underline", "strikethrough", "sup", "sub", "link"]

    function updateLink() {
        openLink = false
        update("link")
    }

    let openLink;

    const buttonSx = {
        rounding: 2,
        minWidth: 12,
        minHeight: 6,
        backgroundColor: "#ffffff",
    }

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
    <Box sx={{flex:"col", flexAlign:"center", m:"5 auto"}} extra={styling} class={props.class} id={props.id} hover={props.hover}>
        <Box>
            {#if typeof modes === "string"}
                {#each allModes as mode}
                    {#if mode === "link"}
                        <Button sx={buttonSx} click={()=>openLink = true}>{mode}</Button>
                    {:else}
                        <Button sx={buttonSx} click={()=>update(mode)}>{mode}</Button>
                    {/if}
                {/each}
            {:else}
                {#each modes as mode}
                    {#if mode === "link"}
                        <Button sx={buttonSx} click={()=>openLink = true}>{mode}</Button>
                    {:else}
                        <Button sx={buttonSx} click={()=>update(mode)}>{mode}</Button>
                    {/if}
                {/each}
            {/if}
        </Box>

        <TextArea util={formutil} on:change={(e)=>handleChange(e)} on:selection={(e)=>handleSelection(e)}
                  sx={{width:"100%",height:`${lines}em`,p:4, fontSize:3, float:1, rounding:2, resize:"none"}}
                  value={value}/>

    </Box>

    <Dialog open={openLink}>
        <Typography variant={2}>voeg hyperlink toe</Typography>
        <label>
            <TextField on:change={(e)=>link = e.detail.value} sx={{rounding: 4,height:3}}/>
        </label>
        <Button sx={buttonSx} hover={{backgroundColor:"#d73030"}} click={()=> updateLink()}>
            <P sx={{color:"white", fontSize: 2, fontWeight: "bold"}}>save</P>
        </Button>

    </Dialog>

{/await}
