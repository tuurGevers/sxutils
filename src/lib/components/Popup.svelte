<script>
    import Fly from "$lib/components/Fly.svelte";
    import Box from "$lib/components/Box.svelte";
    import {onMount} from "svelte";

    export let sx = {}
    export let click = {}
    export let duration = 1000
    let progress = 100;

    export let message = "notification"
    onMount(() => {
        const interval = setInterval(() => {
            progress -= (100 / duration) * 10; // Adjust the increment/decrement value as needed
            if (progress <= 0) {
                clearInterval(interval);
            }
        }, 10); // Adjust the interval duration as needed
    });
</script>

{#if progress > 0}
        <Box sx={Object.assign({}, sx, {right:progress>80?`${(80-progress)*32}px`:2})}
             sxClass={[{flex:"col",p:2, color:"#fff",rounding:2, flexAlign:"center", bgc:"#7c2222", position:"fixed", top:20, zIndex:"900", width:"35vh"}]}
             click={click}>
            {message}
            <Box sx={{width:`${progress}%`,height:1,bgc:"#fff"}}></Box>
        </Box>
{/if}
