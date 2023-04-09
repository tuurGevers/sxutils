<script>
    import Box from "../lib/components/Box.svelte";
    import Navbar from "../lib/components/Navbar.svelte";
    import Button from "../lib/components/Button.svelte";
    import {fade, fly} from 'svelte/transition';
    import LorumIpsum from "../lib/components/LorumIpsum.svelte";
    import Typography from "../lib/components/Typography.svelte";
    import P from "../lib/components/P.svelte";
    import Link from "../lib/components/Link.svelte";
    import Fade from "../lib/components/Fade.svelte";
    import Card from "../lib/components/card/Card.svelte";
    import CardTitle from "../lib/components/card/CardTitle.svelte";
    import CardContent from "../lib/components/card/CardContent.svelte";
    import CardActions from "../lib/components/card/CardActions.svelte";
    import Fly from "../lib/components/Fly.svelte";
    import Image from "../lib/components/Image.svelte";
    import TextField from "../lib/components/TextField.svelte";
    import Select from "../lib/components/Select.svelte";

    let red = "500px"
    let value = "";
</script>

<Navbar links={["home", "contact", "FAQ"]} color="orange" hover={{backgroundColor:"blue"}} sx={{height:"15vh"}}/>
<Box sx={{flex:"row"}}>

    <Box sx={{width:"20%"}}>s</Box>
    <Box sx={{width:"50%"}}>s</Box>
</Box>
<Box sx={{flex:"row"}}>

    <Button sx={{width:{sm:"90%", lg:80}, height:{sm:"80vh", md:"40vh", lg:"20vh"}, "background-color":"red", rounding:{sm:1, lg:2}, float:2}}
            hover={{backgroundColor:{sm:"green", lg:"red"}}} transition click={()=>alert("test")}>
        test
    </Button>
    <Button sx={{width:{sm:"90%", lg:80}, height:{sm:"80vh", md:"40vh", lg:"20vh"}, "background-color":"red", rounding:{sm:1, lg:2}, float:2}}
            hover={{backgroundColor:{sm:"green", lg:"red"}}} transition click={()=>alert("test")}>
        test
    </Button>
</Box>
<Box sx={{p:"8 12"}} animate={{mode:fly, props:{x:200, duration:2000, delay:3000}}}
     hover={{backgroundColor:{sm:"green", lg:"red"}}}>
    <LorumIpsum/>
</Box>

<button on:click={()=> red = "800px"}>z</button>


<Box sx={{"background-color":"black", color:{sm:"white", lg:"red"}, flex:{sm:"col", lg:"row" }, alignItems:"center", width:red}}
     click={()=>alert("test")}>
    <Typography variant={1} sx={{"font-size":"4em"}}>dit is een titel in een box</Typography>

</Box>


<P sx={{color:{sm:"yellow", md:"orange", lg:"red"}}}>
    dit is een box waar tekst in staat
    <Link to="https://www.google.com" sx={{color:"blue"}}>link naar google</Link>
</P>

<Fade duration={2000}>
    <Card float={3} sx={{width:"80%",backgroundColor: "green" }} hover={{backgroundColor: "red"}}>
        <CardTitle>test</CardTitle>
        <CardContent sx={{flex:"col", "align-items":"center"}}>
            <P>dit is een text</P>
            <P>dit is ook een tekst</P>
        </CardContent>
        <CardActions align="right">
            <Button>button 1</Button>
            <Button>button 2</Button>
        </CardActions>
    </Card>
</Fade>
<Fly dir="y" amount="3000" duration={2000}>
    <Image src="favicon.png" alt="foto" sx={{width:{lg:"50%", sm:"100%"}, height:"auto", maxHeight:"400px"}}/>
</Fly>

<TextField on:change={(e)=>value = e.detail.value} sx={{rounding: 4, float:2}} value="placeholder"/>
{value}
<Box sx={{flex:"row"}}>
    <Box sx={{m:"64px"}}>
        <LorumIpsum/>
    </Box>

    <label>
        <Select items={["nl", "es", "en"]} selected="es" on:change={(e)=>alert(e.detail.value)}/>
    </label>
</Box>

<LorumIpsum/>
<LorumIpsum/>
<LorumIpsum/>
<LorumIpsum/>
<LorumIpsum/>
<LorumIpsum/>
