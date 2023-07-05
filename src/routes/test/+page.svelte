<script>
    import P from "$lib/components/P.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import Box from "$lib/components/Box.svelte";
</script>

<Navbar links={["home", "contact", "FAQ"]} color="orange" hover={{backgroundColor:"blue"}} sx={{height:"15vh"}}/>

<P sx={{mt:20, bgc:"#000"}}>test</P>
