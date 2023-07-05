<script lang="ts">
    import {createEventDispatcher, setContext} from "svelte";
    import Box from "./Box.svelte";
    import {writable} from "svelte/store";

    let styling = { border: "2px solid black", rounding: 1, p: 1, flex: "col", flexAlign: "center", width: "20%" };
    let props = { ...$$restProps };

    let selectedOption = "";
    let display = false;

    // Create separate writable stores for each instance
    let selectedValue = writable("");
    let value = writable(false);

    setContext("selection", {
        setSelectedOption: (value) => {
            selectedOption = value;
            selectedValue.set(value); // Update the store value
            dispatch("change", { value: value });
        },
        setDisplay: () => {
            display = true;
            value.set(display); // Update the store value
        },
    });

    export let sx: Record<string, unknown> = {};
    const dispatch = createEventDispatcher();
</script>


<Box sx={sx} sxClass={[styling]}>
    <slot></slot>
</Box>

