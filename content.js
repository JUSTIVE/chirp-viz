const getTweetLink = (article) => {
  const link = article.querySelector("a[href*='/status/']");
  if (!link) return null;

  return link.href;
};

const addLink = (article, link) => {
  const iconsvg = `<svg width="18.75" height="18.75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.75101 10C1.75101 5.58 5.33501 2 9.75601 2H14.122C18.612 2 22.251 5.64 22.251 10.13C22.251 13.09 20.644 15.81 18.055 17.24L10.001 21.7V18.01H9.93401C5.44401 18.11 1.75101 14.5 1.75101 10ZM9.75601 4C6.43901 4 3.75101 6.69 3.75101 10C3.75101 13.37 6.52101 16.08 9.88901 16.01L10.24 16H12.001V18.3L17.088 15.49C19.039 14.41 20.251 12.36 20.251 10.13C20.251 6.74 17.507 4 14.122 4H9.75601Z" fill="currentColor"/>
  <path d="M8 8.57143C8 7.15114 9.00725 6 10.25 6V7.71429C9.836 7.71429 9.5 8.09829 9.5 8.57143V9.42857H11V12H8V8.57143Z" fill="currentColor"/>
  <path d="M13 8.57143C13 7.15114 14.0073 6 15.25 6V7.71429C14.836 7.71429 14.5 8.09829 14.5 8.57143V9.42857H16V12H13V8.57143Z" fill="currentColor"/>
  </svg>

`;

  const container = document.createElement("div");
  container.classList.add("chirpviz-icon-container");
  container.innerHTML = iconsvg;

  const anchor = document.createElement("a");
  anchor.classList.add("chirpviz-anchor");
  anchor.style = "display:inline-flex; align-items:center; gap:4px;";
  anchor.href = `${link}/quotes`;
  anchor.appendChild(container);
  anchor.appendChild(document.createTextNode(" "));
  anchor.target = "_blank";

  //inject
  const retweetBtn =
    article.querySelector("button[data-testid='retweet']") ??
    article.querySelector("button[data-testid='unretweet']");
  const likeBtn =
    article.querySelector("button[data-testid='like']") ??
    article.querySelector("button[data-testid='unlike']");

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
      console.log(link);
      if (typeof link === "string") addLink(tweet, link.replaceAll("/photo/1", ""));
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
