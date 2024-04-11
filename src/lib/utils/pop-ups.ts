import type {PopupSettings} from "@skeletonlabs/skeleton";

export function getInformativePopUpSettings(target: string) {
    const popupHover: PopupSettings = {
        event: 'click',
        target: `${target}`,
        placement: 'top'
    };
    return popupHover;
}