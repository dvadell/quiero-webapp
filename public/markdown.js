import { htmlEncode, htmlDecode } from './htmlencode.js'

export function localLinks(markdownText) { 
    const headers = /\[\[(.*?)\]\]/g;
    return markdownText.replace(headers, '<a href="/q/$1"\>$1</a>')
 }

 export function externalLinks(markdownText) {
     const externalLink = /[^\]]?\[(.*?)\]/g;
     return markdownText.replace(externalLink, '<a href="http://$1">$1</a>')
 }

 export function toHtml(markdownText) {
     return externalLinks(localLinks(htmlEncode(markdownText)))
 }