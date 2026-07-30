export const site = {
  name: "VidSavio",
  domain: "https://vidsavio.com",
  supportEmail: "support@vidsavio.com",
  dmcaEmail: "dmca@vidsavio.com",
  authorLinkedIn: "https://www.linkedin.com/in/muhammad-umer-7b52b4228",
};

// TODO: replace the placeholder hrefs below with the real VidSavio profile
// URLs before launch. They currently point at each platform's home page, which
// is misleading to anyone who clicks them expecting an account.
export const socialLinks = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    color: "#1877F2",
    path: "M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z",
  },
  {
    name: "X",
    href: "https://twitter.com",
    color: "#000000",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.831L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.293 19.492h2.039L6.486 3.239H4.298l13.31 17.406Z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    color: "#E4405F",
    path: "M12 0C8.74 0 8.333.015 7.053.073 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.936 3.351.63 4.14C.333 4.905.131 5.775.073 7.053.014 8.333 0 8.74 0 12s.015 3.667.073 4.947c.059 1.277.26 2.148.557 2.913.306.788.717 1.459 1.384 2.126.667.666 1.337 1.079 2.126 1.384.765.297 1.636.499 2.913.557C8.333 23.986 8.74 24 12 24s3.667-.015 4.947-.073c1.277-.059 2.148-.26 2.913-.557.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.338 1.384-2.126.297-.765.499-1.636.557-2.913.059-1.28.073-1.687.073-4.947s-.015-3.667-.073-4.947c-.059-1.277-.26-2.148-.557-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.648.936 19.86.63c-.765-.297-1.636-.499-2.913-.557C15.667.014 15.26 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324Zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.846-10.405a1.441 1.441 0 1 1-2.882 0 1.441 1.441 0 0 1 2.882 0Z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    color: "#FF0000",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/muhammad-umer-7b52b4228",
    color: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z",
  },
];

export const platforms = [
  {
    key: "youtube",
    name: "YouTube",
    path: "/youtube-video-downloader",
    title: "YouTube Video Downloader for Permitted Videos | VidSavio",
    description:
      "Use VidSavio to save YouTube videos you own, have permission to download, or that are Creative Commons or public domain.",
    headline: "YouTube Video Downloader",
    intro:
      "Paste a YouTube link to review available save options for content you own, have permission to download, or that is Creative Commons or public domain.",
    compliance:
      "YouTube downloads should be limited to videos where YouTube provides an offline option, your own uploads, Creative Commons content, public domain material, or content where you have permission.",
  },
  {
    key: "instagram-reels",
    name: "Instagram Reels",
    path: "/instagram-reels-downloader",
    title: "Instagram Reels Downloader for Permitted Content | VidSavio",
    description:
      "Save public Instagram Reels only when you own the content or have permission from the rights holder.",
    headline: "Instagram Reels Downloader",
    intro:
      "Save public Reels for offline access when you own the clip, manage the account, or have clear permission from the creator.",
    compliance:
      "Instagram content belongs to its creators. VidSavio requires users to confirm they have rights or permission before fetching formats.",
  },
  {
    key: "instagram-video",
    name: "Instagram Video",
    path: "/instagram-video-downloader",
    title: "Instagram Video Downloader for Public Permitted Videos | VidSavio",
    description:
      "Download public Instagram videos responsibly when you own the content or have copyright holder permission.",
    headline: "Instagram Video Downloader",
    intro:
      "Paste a public Instagram video URL and choose a format after confirming you have the right to download it.",
    compliance:
      "Only public Instagram videos are supported. Private content, copyrighted reposts, and content without permission are not allowed.",
  },
  {
    key: "tiktok",
    name: "TikTok",
    path: "/tiktok-video-downloader",
    title: "TikTok Video Downloader for Creator-Permitted Saves | VidSavio",
    description:
      "Save TikTok videos where the creator permits downloads or where you own or have permission to use the content.",
    headline: "TikTok Video Downloader",
    intro:
      "Use VidSavio for TikTok videos where saving is creator-permitted, user-owned, or otherwise authorized.",
    compliance:
      "TikTok creators can enable or restrict saving. Respect creator settings and only download content you are allowed to keep.",
  },
  {
    key: "facebook",
    name: "Facebook",
    path: "/facebook-video-downloader",
    title: "Facebook Video Downloader for Public Permitted Videos | VidSavio",
    description:
      "Download public Facebook videos responsibly when you own the content or have permission from the copyright holder.",
    headline: "Facebook Video Downloader",
    intro:
      "Paste a public Facebook video URL to review available formats for videos you own or are authorized to save.",
    compliance:
      "Facebook private videos and third-party copyrighted content without permission are not supported by VidSavio terms.",
  },
];

export const blogPosts = [
  {
    slug: "how-to-download-youtube-videos-legally",
    title: "How to Download YouTube Videos Legally",
    date: "2026-07-17",
    description:
      "A practical guide to saving YouTube videos only when you own the rights, have permission, or the content is Creative Commons or public domain.",
    platformPath: "/youtube-video-downloader",
    sections: [
      {
        heading: "Start with YouTube's own offline feature",
        body: [
          "Before reaching for any third-party tool, check whether the video already offers an offline option inside YouTube. YouTube Premium allows offline playback in the app, and many creators enable it on their own uploads. When that option exists, it is the cleanest route: the creator is paid, the view is counted, and no terms are stretched.",
          "A downloader is for the cases that feature does not cover — your own uploads, a client's footage you have been sent, or openly licensed material you want to keep locally.",
        ],
      },
      {
        heading: "The four situations where saving is clearly allowed",
        body: [
          "You uploaded the video yourself, or you manage the channel that did. You have written permission from the rights holder, such as an email from a creator agreeing to the use. The video carries a Creative Commons licence that permits reuse. Or the work is in the public domain, which usually means old enough that copyright has lapsed, or released by a government body that publishes without copyright.",
          "If your situation is not one of those four, treat the answer as no. Popularity, free availability, and personal-use intentions do not create a licence.",
        ],
      },
      {
        heading: "Check the licence before you check the formats",
        body: [
          "On YouTube, licence information sits in the video description area under Show more. Standard YouTube Licence means reuse is not granted. Creative Commons Attribution means reuse is permitted with credit, and that specific label is the one worth looking for.",
          "Screenshot or note the licence at the time you save the file. If anyone questions the copy later, the record of what the page said on the day matters more than your memory of it.",
        ],
      },
      {
        heading: "Keep your saved copies inside the permission you were given",
        body: [
          "Permission to download is not automatically permission to republish. A creator who agrees to let you keep an offline copy has not agreed to let you upload it elsewhere, cut it into your own video, or use it in a commercial project.",
          "If your plan goes beyond private viewing, ask for that specific use in writing. It is a short conversation that removes the entire problem.",
        ],
      },
    ],
  },
  {
    slug: "best-video-formats-for-offline-viewing",
    title: "Best Video Formats for Offline Viewing",
    date: "2026-07-17",
    description:
      "Compare MP4, WebM, MP3 extraction, and common resolutions so you can choose the right format for permitted offline use.",
    platformPath: "/",
    sections: [
      {
        heading: "MP4 is the safe default",
        body: [
          "MP4 with H.264 video plays on essentially everything: phones, tablets, smart TVs, game consoles, older laptops, and every mainstream editing tool. If you are saving something you want to still be able to open in five years, or hand to somebody else without asking what device they use, choose MP4.",
          "The trade-off is file size. H.264 is an older codec and needs more bits than newer ones to reach the same picture quality.",
        ],
      },
      {
        heading: "WebM when size matters more than reach",
        body: [
          "WebM with VP9 typically produces a noticeably smaller file than MP4 at matching quality, which is useful when storage or bandwidth is tight. Modern browsers handle it natively.",
          "Support falls away outside the browser, though. Older TVs, some mobile gallery apps, and a number of editing tools will refuse a WebM file. Pick it when you know where the file will be played.",
        ],
      },
      {
        heading: "Choosing a resolution you will actually benefit from",
        body: [
          "4K is worth the storage only on a screen large enough to resolve it, which in practice means a good monitor or a large TV. On a phone, 1080p and 4K look close to identical while 4K takes several times the space.",
          "1080p is the sensible default for laptops and TVs. 720p holds up well on phones and tablets and roughly halves the file against 1080p. 480p and 360p are for slow connections and tight storage, where getting the content at all matters more than sharpness.",
        ],
      },
      {
        heading: "When audio-only makes sense",
        body: [
          "For talks, interviews, podcasts, and music you already have rights to, extracting audio drops the file to a fraction of the video size and is often all you needed. MP3 is the most portable audio format for the same reason MP4 is for video: everything opens it.",
          "Remember that extracting the audio track is still copying the work. The same permission question applies as it would to the full video.",
        ],
      },
    ],
  },
  {
    slug: "creative-commons-videos-how-to-find-and-download",
    title: "Creative Commons Videos: How to Find and Download Them",
    date: "2026-07-17",
    description:
      "Learn how Creative Commons licensing works and what to check before saving videos for offline viewing.",
    platformPath: "/youtube-video-downloader",
    sections: [
      {
        heading: "What a Creative Commons licence actually grants",
        body: [
          "Creative Commons is a set of standard licences a creator can attach to their work to grant permissions in advance, so nobody has to write and ask. The creator keeps their copyright; they are simply saying yes to certain uses ahead of time.",
          "Every CC licence requires attribution. Beyond that, the individual licence terms decide whether you may use the work commercially, and whether you may publish an edited version.",
        ],
      },
      {
        heading: "Reading the licence letters",
        body: [
          "BY means you must credit the creator, and it appears in every licence. NC means non-commercial use only, which rules out anything that makes money, including monetised videos. ND means no derivatives, so you may share the work but not a cut-down or remixed version of it. SA means share-alike: if you build on the work, your result carries the same licence.",
          "So CC BY is the most permissive, and CC BY-NC-ND is the most restrictive — credit required, no commercial use, no edits.",
        ],
      },
      {
        heading: "Where to find genuinely open video",
        body: [
          "YouTube lets you narrow search results to Creative Commons material through the Filters menu, under Features. The Internet Archive holds a large public-domain and openly licensed collection. Wikimedia Commons is reliable because licensing is checked as a condition of upload. Government and public-institution archives frequently publish without copyright restrictions.",
          "Treat a re-upload with suspicion. Someone can label a video CC on their own channel without having the right to do so, and their label does not transfer any permission to you.",
        ],
      },
      {
        heading: "Attribution is a requirement, not a courtesy",
        body: [
          "A complete credit names the title, the creator, the licence, and links to both the source and the licence text. If you changed the work, say so — that is part of the licence, not an optional politeness.",
          "Record the licence details when you download rather than when you publish. Videos get deleted and channels get renamed, and reconstructing a credit months later from a local file is difficult.",
        ],
      },
    ],
  },
];
