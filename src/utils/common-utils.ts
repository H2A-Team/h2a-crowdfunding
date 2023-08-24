export function formatNumberStrWithCommas(number: string): string {
    return number.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function addCharacterBeforeString(string: string, character: string): string {
    return character.concat(string);
}

export function addCharacterAfterString(string: string, character: string): string {
    return string.concat(character);
}
