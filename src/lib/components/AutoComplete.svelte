<script lang="ts">
    import Box from "./Box.svelte";
    import TextField from "./TextField.svelte";
    import Button from "./Button.svelte";
    import {clickOutside} from "../script/clickOutside"
    import {createEventDispatcher} from "svelte";

    export let completions: string[];
    export let sx: Record<string, unknown> = {width: "90%", m: "4 auto"};
    export let hover: Record<string, unknown> = {};
    export let id: string = "autocompletion";
    export let def: string = "autocomplete"
    export let buttonSX: Record<string, unknown> = {bgc: "#fff", p: 2, fontSize: 2, rounding: 1}
    export let buttonHover: Record<string, unknown> = {}
    export let button = true
    let close = false
    export let helper = true

    let filtered = completions

    let item: string = def;

    function handleChange(e) {
        close = false
        filtered = filtered.filter((item: string) => item.includes(e.detail.value))
        dispatch('change', {
            value: filtered
        })
        item = e.detail.value
    }


    const dispatch = createEventDispatcher()

    function sendComplete() {
        dispatch('completed', {
            value: item
        })

    }

</script>


<Box sx={sx} hover={hover} id={id}>
    <TextField on:change={(e)=>handleChange(e)} on:enter={()=>sendComplete()}
               sx={{width:"80%",rounding: 1, p:2}} value={item} on:backspace={()=>filtered=completions}/>
    {#if filtered !== completions && filtered.length > 0 && helper && !close}
        <Box sx={{width:"80%",flex:"col", border:"2px solid #000", p:2, height:"10vh", overflowY:"auto"}}
        >
            <div use:clickOutside on:click_outside={()=>close = true}>
                {#each filtered as completion,i}
                    <Box click={()=>{item = completion; filtered = []}} sx={{fontSize:3, textAlign:"center"}}
                         hover={{bgc:"#eee" }}>{completion}</Box>
                {/each}
            </div>
        </Box>
    {/if}
    {#if button}
    <Button sx={buttonSX} hover={buttonHover} click={()=>sendComplete()}>submit</Button>
        {/if}
</Box>
