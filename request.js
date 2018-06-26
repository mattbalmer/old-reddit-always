/************************ REDIRECT CODE ***********************/
chrome.webRequest.onBeforeRequest.addListener(details => detectRedirect(details), {
  urls : ["<all_urls>"],
  types: ["main_frame","sub_frame"]
}, ["blocking"]);

const ignoreFilter = "(sa-no-redirect=)"
   + "|(redirect=true)"
   + "|(redirect.html)"
   + "|(.com/api)"
   + "|(http://)";

function detectRedirect(details) {
  const url = details.url;
  if (url == null) {
    return;
  }

  // Don't try to redirect pages that are in the filter
  if (url.match(ignoreFilter) != null) {
    return;
  }

  return {
    redirectUrl: fixUrl(url)
  };
}

function fixUrl(domain) {
  return domain.replace(/https:\/\/www\.reddit\.com/g, 'https://old.reddit.com');
}
