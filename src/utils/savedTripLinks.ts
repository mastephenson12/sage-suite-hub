export function savedTripLinks(text: string): Array<{text: string; href?: string}> {
  return text.split(/(https?:\/\/[^\s]+)/g).flatMap(part => {
    if (!/^https?:\/\//.test(part)) return [{text:part}];
    const urlText=part.replace(/[),.;!]+$/,'');
    try {
      const url=new URL(urlText);
      if (!['http:','https:'].includes(url.protocol) || url.username || url.password) return [{text:part}];
      return [{text:urlText,href:url.href},...(part.length>urlText.length?[{text:part.slice(urlText.length)}]:[])];
    } catch { return [{text:part}]; }
  });
}
