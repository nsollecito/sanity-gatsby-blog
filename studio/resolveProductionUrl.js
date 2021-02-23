// ./resolveProductionUrl.js
export default function resolveProductionUrl(document) {
    return `https://corpsite-preview.datadoghq.com/preview/?type=${document.type}&slug=${document.slug.current}`
}
