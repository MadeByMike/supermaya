---
title: Style architecture
date: "2019-10-29"
description: "A short post about the approach to CSS architecture on this project"
tags:
  - demo-content
  - sample-post
  - blog
---

Supermaya doesn't have a lot of specific CSS. The vast majority of the styles relate to layout with only a few classes having thematic or presentational styles. It's designed this way so that you can extend it by adding presentational styles.

If you want to extend the styles in this project you might notice they are written in a particular way. You might find this un-familiar or difficult to reason about at first. I've use specific conventions around style architecture that I've found to be scalable and maintainable for any size project. If you want to follow the same conventions I explain the methodologies here.

## Layout classes

Layout classes in Supermaya are denoted with an `l-` prefix. I'm pretty specific about what a layout class is. It should have only `display`, `grid` or `flex` properties, sometimes `width`, `height` or `padding`, but never presentational properties like `background` or `font-size` or `color`. It should be mostly intuitive what is layout and what is presentational.

I also believe that **layout components should own both sides of the parent > child relationship**. What this means is layout classes are responsible for applying layout properties to child elements. The reason for this is I try wherever possible to co-locate layout concerns. In modern CSS layout there is always a parent child relationship E.g. `flex-container` > `flex-item`, or `grid-container` > `grid-item`. When these styles are not co-located, this relationship is like a hidden dependency. Things break when we modify the styles on a child item or use it in a different container.

By separating layout styles from presentation styles and co-locating layout concerns we're able to refactor HTML and CSS much more freely. Adding items to a layout container is usually enough for them to acquire the correct styles for the child items. In practical terms it usually looks something like this:

```css
.l-component {
  display: flex;
  flex-wrap: wrap;
}
.l-component > * {
  flex-basis: 25%;
}
```

Liberal use of `> *` will target all immediate child elements and you can use `> .l-child-layout` where you need to be more specific.

I try to avoid child items that are presentational elements. For example if I was adding a styled button to a flex container I might wrap it in a child element, such as `l-media-object-button` in the example below:

```html
<div class="l-media-object">
  <div class="l-media-object-button">
    <button class="button">Submit</button>
  </div>
  <p>Some text</p>
</div>
```

This helps avoid the temptation to add layout styles to the presentational component `button` later. Without it, when we want to add more specific layout classes to the media object with a button we need to refactor the HTML to add a class to the button container.

### Layout modifiers

Another approach to styling specific child elements in a layout component is to use a modifier class such as `l-media-object--button` a technique borrowed from OOCSS and BEM.

```html
<div class="l-media-object l-media-object--button">
  <button class="button">Submit</button>
  <p>Some text</p>
</div>
```

Here `l-media-object--button` is a variation of `l-media-object` where the first child is always a button. we use this class to override the default `flex-basis` on the `first-child` within the container:

```css
.l-media-object {
  display: flex;
}
.l-media-object > *:first-child {
  flex-basis: 25%;
}
.l-media-object--button > *:first-child {
  flex-basis: 200px;
}
```

I've used both modifier classes and nested layout containers in Supermaya. The important thing is to keep the separation of layout and presentation and co-locate hiddent layout dependencies wherever possible. I strongly suggest avoiding layout and presentation classes on the same element.

When it's done well it should be possible to move towards a common set of reusable abstractions such as described by [https://every-layout.dev/](https://every-layout.dev/). This results in far less CSS which is easier to maintain.

## Presentational classes

Presentational classes in Supermaya are not prefixed. Any class without an `l-` prefix is a presentational class or a utility class (or both). Presentational classes should not have `width`, `height`, `padding`, `display` or any other layout properties. This sometimes feels hard to do when you are not used to it. When it's done properly it means that all presentational components will be completely size-agnostic. They should be able to fill the space available inside any layout container.

If they don't have `padding` or `margin` it means the layout class is responsible for spacing and alignment. It should then be possible to move components around the page without refactoring. If something is not aligned, or spacing is not right it means the layout container is wrong.

Some of the hardest components to work with in this way are icons and images. For these I still recommend avoiding width and heights. If it's really needed I recommend using a utility classes.

## Utility classes

There are not many utility classes in Supermaya which is why they are not prefixed. If you need more, it might be a good idea to prefix them with something like `u-`. Utility classes can be combined with presentational components or used on their own. They should do just one thing. Some examples are:

- apply the theme colors
- hide elements intended for screen-readers
- Set a size variation on an icon.

Use this as an escape hatch when needed but try wherever possible to follow the principals regarding the separation of layout and presentation.

## Use of variables

There are two types of variables used in Supermaya. Static `scss` variables and dynamic `custom-properties`. I try to define all variables including custom properties at the top of the a stylesheet. I keep the number of global variables to an absolute minimum.

If anything in my CSS changes because of a dynamic condition such as a media-query I make this a custom property. This allow me to define the logic separate to the presentation. An example looks like this:

```scss
$bp-container: 800px;

.l-container {
  --container-margin: 0.5rem;
}

@media (min-width: $bp-container) {
  .l-container {
    --container-margin: 1rem;
  }
}

.l-container {
  margin: var(--container-margin);
}
```

Organising variables in this way means that there is only once place where I apply declarations to a class. I don't need to search the CSS to find out what is changing. Anywhere I see a `var()` statment I know this is a dynamic property and I can look to the top of the page to see the logic. If you are interested in finding out more about this I wrote a [blog post about this approach](https://www.madebymike.com.au/writing/using-css-variables/).
