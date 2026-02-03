const getTweetLink = (article) => {
  const link = article.querySelector("a[href*='/status/']");
  if (!link) return null;

  return link.href;
};

const addLink = (article, link) => {
  const iconsvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-square-quote-icon lucide-message-square-quote"><path d="M14 14a2 2 0 0 0 2-2V8h-2"/><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M8 14a2 2 0 0 0 2-2V8H8"/></svg>`;

  const container = document.createElement("div");
  container.innerHTML = iconsvg;
  container.style = "display:flex; align-items:center;";

  const anchor = document.createElement("a");
  // anchor.innerText = "Show Quote";
  anchor.classList.add("chirpviz-anchor");
  anchor.href = `${link}/quotes`;
  anchor.appendChild(container);
  anchor.appendChild(document.createTextNode("  인용"));
  anchor.style =
    "color: rgb(113, 118, 123); flex:1; text-decoration:none; font-size:12px; display:flex; align-items:center; gap:4px;";
  anchor.target = "_blank";

  //inject

  const retweetBtn = article.querySelector("button[data-testid='retweet']");
  const likeBtn = article.querySelector("button[data-testid='like']");

  if (!retweetBtn || !likeBtn) return;

  const retweetWrapper = retweetBtn.closest("div");
  const likeWrapper = likeBtn.closest("div");

  // 중복 삽입 방지
  if (retweetWrapper.nextSibling?.classList?.contains("chirpviz-action")) {
    return;
  }

  likeWrapper.parentNode.insertBefore(anchor, likeWrapper);
};

const collectTweets = () => {
  document.querySelectorAll("article[data-testid='tweet']").forEach((tweet) => {
    if (tweet.querySelector(".chirpviz-anchor") === null) {
      const link = getTweetLink(tweet);
      addLink(tweet, link);
    }
  });
};

collectTweets();

const observer = new MutationObserver(() => {
  collectTweets();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
