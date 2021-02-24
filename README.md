<div align="center">
    <h1>Supermaya</h1>
    <br>
    <p>Supermaya is an <a href="https://github.com/11ty/eleventy/">Eleventy</a> starter kit designed to help you add rich features to a blog or website without the need for a complicated build process.</p>
    <br><img src="site/static/screenshot.png" width="500"/>
    <br>
    <p>See a <a href="https://supermaya-demo.netlify.com/">Live Demo</a>.</p>
    <p><a href="https://app.netlify.com/start/deploy?repository=https://github.com/MadeByMike/supermaya">Deploy Supermaya on it's own</a></p>
    <p><a href="https://heroku.com/deploy?template=https://github.com/keystonejs/keystone-jamstack-plus">Deploy Supermaya with Keystone</a> to allow user generated content. <br>(following instructions during installation to connect the API).</p>
    <br>
    <br>
    
</div>
    
It comes with all the blog standard features:

- Posts and Pages
- Pagination
- Tags
- Static server-rendered content

A bunch of good practices:

- RSS feed
- \*Considerate mark-up
- Service worker with offline content
- Lazy loading images
- Critical CSS

_\*Considerate means semantic, accessible mark-up, written for both humans and machines._

Additional features:

- Seamless JavaScript and SCSS compilation (no build process)
- Data-driven navigation
- Customisable settings including theming

Additional features:

- Comments
- Claps
- Reading List
- Login

These additional features that have persistent data including user generated content. On JAMstack sites including rich content usually means complicated build processes and multiple third-party services. This doesn't sit well with me since owning my own data and tinkering with the platform is a big motivation for building a static personal site.

That's why I opted to pair Supermaya with [KeystoneJS](https://keystonejs.com/) to create a unified API that you own and manage. Each of these features are optional and added progressively with JavaScript and will fail gracefully if not configured or the server can't be reached. You can opt-out on a per feature basis by modifying the data in `site/_data/site.js`, or on a per-page basis with front-matter.

**Note**: If you don't want any of these features you can [deploy Supermaya on its own](https://app.netlify.com/start/deploy?repository=https://github.com/MadeByMike/supermaya) or you can [deploy Supermaya and Keystone together](https://heroku.com/deploy?template=https://github.com/keystonejs/keystone-jamstack-plus) and connect the API by following the instructions during installation. This will deploy Keystone to Heroku and Supermaya to Netlify, as well as configure your Admin user and API URL.

To get started deploy the [Keystone JAMstack plus starter kit](https://github.com/keystonejs/keystone-jamstack-plus) platform to Heroku. Once installed visit the site on Heroku and copy your Keystone API URL. Follow the instructions to automatically deploy Supermaya to Netlify.

Note: Rich features are optional Supermaya is a perfectly good starter template for 11ty without any other services. You can deploy Supermaya on it's own and add a `KEYSTONE_API` environmental variable later if you wish.

Supermaya is designed to be a launch pad that allows you to go all the way from a simple static website to a feature rich application.

## Running the project

To start the project run:

```
npm install
```

then:

```
npm start
```

## Configuring site information

Configure important site-wide information like the site name, description and default author information:

```
site/_data/site.js
```

## Configuring navigation

Change the site navigation by modifying:

```
site/_data/navigation.json
```

## Changing the color scheme

Supermaya includes basic theming. Select an alternative to the black and white feature colors by modifying the `theme` key in:

```
site/_data/site.js
```

## Toggling Keystone features

If you connected Supermaya to a Keystone backend you can toggle features under the `keystone` key in:

```
site/_data/site.js
```

## Working with SCSS

In Supermaya SCSS files are compiled on-the-fly by 11ty and added to data. This means you can write inline CSS directly into templates and partials like this: `<style>{% raw %}{{css["compilation-target"] | safe}}{% endraw %}</style>`. Where "compilation-target" is the key added to the list of SCSS files to compile in:

```
site/_data/css.js
```

Each entry added to the `targets` array will be available as site data and a static file will also be written to `css/[compilation-target].css`.

Source files for scss have been added to the directory `site/src/scss`.

## Working with JavaScript

Similar to how SCSS works, JavaScript files in Supermaya are also compiled on-the-fly using Webpack.

The Webpack configuration contains a loader for `.js` files that will transpile ES6 to ES5 meaning you can safely write modern JavaScript. The Webpack configuration can be extended or modified in: `site/utils/compile-webpack.js`.

Files generated by Webpack are added to site data so you can write inline JavaScript in templates and partials like this: `<script>{{css["output-filename"] | safe}}</script>`. The "output-filename" should be the full name of a file generated by Webpack including the extension.

You can add additional entry points by modifying the `targets` array in:

```
site/_data/js.js
```

Each file generated will also be available as a static file at the path: `js/[output-filename]`.

Source files for javascript have been added to the directory `site/src/js`.

## Critical CSS

Supermaya is capable of generating criticalCSS although this is turned off by default for performance reasons. You can turn this feature on by modifying:

```
site/_data/site.js
```

## Credit where due

I need to acknowledge and credit the work of [Phil Hawksworth](https://twitter.com/philhawksworth) and [Andy Bell](https://twitter.com/hankchizljaw) for their work on [eleventyone](https://github.com/philhawksworth/eleventyone) and [Hylia](https://github.com/hankchizljaw/hylia) both of which are fantastic 11ty templates. I pulled these apart before making my own. In particular there are a few implementation details borrowed directly from Hylia - because if something is done right and it's open source why do it again? Thanks Andy.

## Why "Supermaya"

A friend and designer Matt Barron, helped me out with some initial design work and used it as a placeholder for the site name in early mock-ups. As usual development names grow on you. I later learned it was the name of his family dog. It's combination of Superman and Maya, one of his kids favourite cartoon characters. That settles it, right? And here's a picture:

<img src="site/static/supermaya.jpg" width="400"/>
