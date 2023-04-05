<script>
    import Box from "../components/Box.svelte";
    import {helloStyling} from "../testcss/home";
    import Navbar from "../components/Navbar.svelte";
    import Button from "../components/Button.svelte";
    import {fade, fly} from 'svelte/transition';
    import LorumIpsum from "../components/LorumIpsum.svelte";
    import Typography from "../components/Typography.svelte";
    import P from "../components/P.svelte";
    import Link from "../components/Link.svelte";
    import Fade from "../components/Fade.svelte";
    import Card from "../components/card/Card.svelte";
    import CardTitle from "../components/card/CardTitle.svelte";
    import CardContent from "../components/card/CardContent.svelte";
    import CardActions from "../components/card/CardActions.svelte";
    import Fly from "../components/Fly.svelte";
    import Image from "../components/Image.svelte";
    import TextField from "../components/TextField.svelte";

    let red = "500px"
    let value = "";
</script>

<Navbar links={["home", "contact", "FAQ"]} color="orange" hover={{backgroundColor:"blue"}} sx={{height:"15vh"}}/>
<Button sx={{width:{sm:"90%", lg:80}, height:{sm:"80vh", md:"40vh", lg:"20vh"}, "background-color":"red", rounding:{sm:1, lg:2}, float:2}}
        hover={{backgroundColor:{sm:"green", lg:"red"}}} sxClass={helloStyling} transition click={()=>alert("test")}>
    test
</Button>

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
<Box sx={{m:"64px"}}>
    <LorumIpsum/>
</Box>
<LorumIpsum/>
<LorumIpsum/>
<LorumIpsum/>
<LorumIpsum/>
<LorumIpsum/>
<LorumIpsum/>
