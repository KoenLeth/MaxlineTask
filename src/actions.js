export function loadCity(data) {

    return {
        type: 'loadCity',
        data

    };
}

export function openBar() {
    return {
        type: 'openBar',
    };
}

export function hideBar() {
    return {
        type: 'hideBar',
    };
}
