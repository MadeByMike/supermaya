---
title: JAMstack plus
date: "2019-10-30"
description: "The growing complexity of JAMstack sites is now often comparable to the set-up and maintenance costs of platforms like WordPress. We need a better approach."
tags:
  - demo-content
  - sample-post
  - blog
comments: false
claps: false
bookmarks: false
---

Traditionally adding features that have persistent data and user generated content on JAMstack sites is difficult. Many solutions involve complicated build processes and multiple third-party services.

This doesn't sit well with me since owning my own data and tinkering with the platform has always a big motivation for building a personal site.

Even good platforms and services don't always match what I'm trying to build and since I can't modify these services I'm forced to pre-process or post-process data.

This is where JamStack sites can get complicated fast. Small compromises and clever work-arounds stack-up. Eventually some static sites can feel more stifling than the CMS monoliths and server configurations that caused many of us to move to static in the first place.

I know I'm not the only one that has noticed this trend or remarked that the growing complexity of JAMstack sites is now often comparable to the set-up and matainance costs of platforms like WordPress. But usually without anywhere close to the equivalent editoral and administration experience.

Despite these gripes, I still really love the simplicity of static sites, together with the fact they are 100% configurable and self-managed. That's the feeling I want and not the feeling I've been getting from JAMstack recently.

I want a static site but I also want the ability to add features like comments, or likes or to take ownership of data I' normally share through social media.

For a long time I've wanted to be able to set-up a tailored back-end or CMS experience with the equivlent easy and flexibly I experienced when I first used Jekyll.

The idea is to extend the things I like about JAMstack into an easily deployable back-end platform that can be paired with a static front-end. I call this idea **JAMstack Plus** and the things I's expect from a platform include:

- Ability to self host
- Largely config driven set-up
- Headless APIs
- Unopinionated about content types or data
- Completely configurable if required

For me [Keystone 5](https://keystonejs.com/) ticked many of these boxes. With an `index.js` file and a few lines of code I can define a content structure, configure options for data storage, get an API and set-up an admin interface that exactly matches my content.

I set-out to build on this and created the [Keystone JAMstack plus starter kit](https://github.com/MadeByMike/keystone-jamstack-plus) platform. This is an example project that includes a bunch of services you might want to incorporate on a static. It's configured with access-control and aims to provide sensible defaults that protect user data. Feel free to build on this platform or take the idea of JAMstack plus and build your own.
