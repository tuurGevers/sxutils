export function selection(node:HTMLElement) {
    const handleSelection = (event) => {
        node.dispatchEvent(new CustomEvent("selection"));
    };


    document.addEventListener("selectionchange", handleSelection, true);

    return {
        destroy() {
            document.removeEventListener("selectionchange", handleSelection, true);

        },
    };
}
