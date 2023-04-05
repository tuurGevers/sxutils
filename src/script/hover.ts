export function hover(node: HTMLElement): {
    destroy(): void;
} {
    const handleHover = (event: MouseEvent) => {
        if (node.contains(event.target as Node)) {
            node.dispatchEvent(new CustomEvent("hover"));
        }
    };

    const handleLeave = (event: MouseEvent) => {
        node.dispatchEvent(new CustomEvent("leave"));
    };

    document.addEventListener("mouseover", handleHover, true);
    document.addEventListener("mouseleave", handleLeave, true);

    return {
        destroy() {
            document.removeEventListener("mouseover", handleHover, true);
            document.removeEventListener("mouseleave", handleLeave, true);
        },
    };
}
