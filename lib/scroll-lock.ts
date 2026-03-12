/**
 * Ref-counted body scroll lock shared between Header drawer and WinnerModal.
 * Multiple consumers can lock/unlock independently without clobbering each other.
 */
let lockCount = 0;
let savedScrollY = 0;

export function lockScroll() {
  lockCount++;
  if (lockCount === 1) {
    savedScrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
  }
}

export function unlockScroll() {
  if (lockCount <= 0) return;
  lockCount--;
  if (lockCount === 0) {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    window.scrollTo({ top: savedScrollY, left: 0, behavior: "instant" });
  }
}
