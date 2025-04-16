const checkMouseOnComponent = (e: MouseEvent, ref1: HTMLElement, ref2: HTMLElement) => {
    const containerRect = ref1.getBoundingClientRect();
    const dateListRect = ref2.getBoundingClientRect();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const isMouseInContainer =
        mouseX >= containerRect.left &&
        mouseX <= containerRect.right &&
        mouseY >= containerRect.top &&
        mouseY <= containerRect.bottom + 4;

    const isMouseInTarget =
        mouseX >= dateListRect.left &&
        mouseX <= dateListRect.right &&
        mouseY >= dateListRect.top &&
        mouseY <= dateListRect.bottom;

    return {
        isMouseInContainer: isMouseInContainer,
        isMouseInTarget: isMouseInTarget,
    };
};

export { checkMouseOnComponent };
