---
title: User generated content
date: "2019-10-30"
description: "Adding rich content to static sites is often difficult. Supermaya comes with an option light-weight back-end for user generated content."
tags:
  - demo-content
  - sample-post
  - blog
---

Supermaya comes with the ability to add a bunch of rich features to your site including:

- Comments
- Claps
- Reading List
- Login

These _optional_ features are powered by a [JAMstack Plus starter kit](https://github.com/MadeByMike/keystone-jamstack-plus) which is powered by [Keystone 5](https://keystonejs.com/) a Node based application development framework and CMS.

Keystone is a back-end service and therefore can't be deployed to Netlify. Not all websites need a back-end, but what you get by adding this additional layer to the stack is the ability to store and manage user generated content.

If you want to add any kind of rich features to a static site and want to retain control of the platform, and ownership of data, Keystone is a good choice. It's open source and highly flexible in ways that third-party services can't provide.

To help add user generated content to static sites I built the [Keystone JAMstack Plus starter kit](https://github.com/MadeByMike/keystone-jamstack-plus) for Keystone that ties in with Supermaya. It allows you to skip a lot of the overhead of deploying and hosting a CMS like WordPress or attempting to unify many different APIs in a build process. Keystone's package based architecture means you can build tiny streamlined CMS and API designed specifically for your content.

Don't need rich features? Although Supermaya has ties into Keystone it absolutely stands on it's own as a great static site template. It was not created for Keystone but it was created to make it a little easier to go beyond purely static content if you need.

If you've already deployed Supermaya you will need to add a `KEYSTONE_API` environmental variable to your front-end.

**Note**: Rich features are optional. Supermaya is a perfectly good starter template for 11ty without any other services.
