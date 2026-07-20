import type { NavigateFunction } from "react-router";

let navigateFn: NavigateFunction | null = null;

export function setGlobalNavigate(fn: NavigateFunction) {
    navigateFn = fn;
}

export function globalNavigate(to: string) {
    if (navigateFn) navigateFn(to, { replace: true });
    else window.location.href = to;
}
