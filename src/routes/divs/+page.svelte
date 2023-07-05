<script>
    import {Variants} from "$lib/components/Variants.ts";
    import Box from "../../lib/components/Box.svelte";
    import NavTest from "../../lib/components/SideNav.svelte";
    import InlineNav from "../../lib/components/InlineNav.svelte";
    import SideNav from "../../lib/components/SideNav.svelte";
    import MediaQuery from "../../lib/components/MediaQuery.svelte";
    import CheckBox from "../../lib/components/CheckBox.svelte";
    import * as boxStyles from "../../lib/styles/BoxStyles";
    import * as flexStyles from "../../lib/styles/FlexStyles";
    import Fly from "../../lib/components/Fly.svelte";
    import Image from "../../lib/components/Image.svelte";
    import Button from "../../lib/components/Button.svelte";
    import {Dialog, Typography} from "../../lib/components/index.ts";
    import AutoComplete from "$lib/components/AutoComplete.svelte";
    import Sx from "$lib/components/Sx.svelte";
    import CustomSelect from "$lib/components/CustomSelect.svelte";
    import Option from "$lib/components/Option.svelte";
    import P from "$lib/components/P.svelte";
    let test = false;
    const opacity = `@keyframes myAnimation {
  from { opacity: 0; }
  to { opacity: 1; }
}`
    let open = false
    let d1=false;
    let d2=false;
    let select1 = "value2";
</script>

<SideNav links={["home", "contact", "FAQ"]} to={["#h", "#c", "#f"]} logo="tuur" color="orange" on:open={(e)=>alert("open")} on:close={()=>alert("close")}/>
<MediaQuery>
    <h1 slot="sm">small content</h1>
    <p slot="md">medium content</p>
    <div slot="lg">large content</div>
</MediaQuery>

<CheckBox boxes={["1", "2", "3"]} on:checked={(e)=>console.log(e.detail.value)}/>
<Box sxClass={[boxStyles.basic("#EEE", "#a8ef9d"), flexStyles.col, flexStyles.center, boxStyles.bgImage("./hero.png")]}
sx={{height:80}}>
    <h1>Hello World</h1>
    <h1>Hello World</h1>
</Box>
<Box variant={Variants.DIV} sxClass={[boxStyles.paper()]} sx={{zIndex:"2"}}>
    <Typography variant={1}>Hello World</Typography>
</Box>
<Button click={()=> test = !test}>aa</Button>
{#if test}
<Fly dir="y" amount={"3000"} duration={2000}>
    <Image src="favicon.png" alt="foto" sx={{width:{lg:"50%", sm:"100%"}, height:"auto", maxHeight:"400px"}}/>
</Fly>
    {/if}
<Box variant={Variants.ARTICLE}>
    <h1>Hello World</h1>
</Box>

<Box variant={Variants.ASIDE}>
    <h1>Hello World</h1>
</Box>

<Box variant={Variants.FOOTER}>
    <h1>Hello World</h1>
</Box>

<Box variant={Variants.HEADER}>
    <h1>Hello World</h1>
</Box>

<Box variant={Variants.MAIN} id="h">
    <h1>Hello World</h1>
</Box>

<Box variant={Variants.NAV}>
    <h1>Hello World</h1>
</Box>

<Box variant={Variants.SECTION} id="c">
    <h1>Hello World</h1>
</Box>

<Button click={()=>open=!open}>open dialog</Button>
<Dialog open={open} on:outside={()=>open=false}>
    <Typography variant={1}>hello <Sx sx={{color:"red"}}>dialog</Sx></Typography>
</Dialog>

<CustomSelect on:change={(e)=>{select1 = e .detail.value;d1=false}} >
    <Option value="value1" selected={select1==="value1"} sx={{flex:"row"}} display={d1} id="id" on:open={(e)=>d1=e.detail.value==="id"} >
            <Image src="favicon.png" alt="favicon" sx={{width:"30px", height:"auto"}}/>
            <P>value1</P>
    </Option>
    <Option value="value2" selected={select1==="value2"} sx={{flex:"row"}}  display={d1} id="id" on:open={(e)=>d1=e.detail.value==="id"}>
            <Image src="favicon.png" alt="favicon" sx={{width:"30px", height:"auto"}}/>
            <P>value2</P>
    </Option>
    <Option value="value3" sx={{flex:"row"}} selected={select1==="value3"} display={d1} id="id" on:open={(e)=>d1=e.detail.value==="id"}>
            <Image src="favicon.png" alt="favicon" sx={{width:"30px", height:"auto"}}/>
            <P>value3</P>
    </Option>
</CustomSelect>
<CustomSelect on:change={(a)=>{alert(a.detail.value)}}>
    <Option value="value1" sx={{flex:"row"}}  on:open={(e)=>d2=e.detail.value==="id2"}>
        <Image src="favicon.png" alt="favicon" sx={{width:"30px", height:"auto"}}/>
        <P>value1</P>
    </Option>
    <Option value="value2" selected sx={{flex:"row"}} on:open={(e)=>d2=e.detail.value==="id2"}>
        <Image src="favicon.png" alt="favicon" sx={{width:"30px", height:"auto"}}/>
        <P>value2</P>
    </Option>
    <Option value="value3" sx={{flex:"row"}} on:open={(e)=>d2=e.detail.value==="id2"}>
        <Image src="favicon.png" alt="favicon" sx={{width:"30px", height:"auto"}}/>
        <P>value3</P>
    </Option>
</CustomSelect>
<AutoComplete completions={["abcd", "bcdef", "apple", "cake", "cherry","apple", "cake", "cherry" ]}
              buttonHover={{bgc:"#eaa"}}
              helper={false}
              def="cake"
              on:completed={(e)=>alert(e.detail.value)}
/>
<Box sx={{height:30}}>ss</Box>
<Box id="f">test</Box>
