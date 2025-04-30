export function enter(el: Element) {
  const element = el as HTMLElement;
  element.style.transition = "all 0.3s ease";
  element.style.height = "0";
  requestAnimationFrame(() => {
    element.style.height = element.scrollHeight + "px";
  });
}

export function leave(el: Element) {
  const element = el as HTMLElement;
  element.style.transition = "all 0.3s ease";
  element.style.height = element.scrollHeight + "px";
  requestAnimationFrame(() => {
    element.style.height = "0";
  });
}