---
title: Why web components?
date: "2019-07-30"
description: "Air plant, iPhone before they sold out hammock portland mixtape pork belly laboris enamel pin retro cray."
tags:
  - demo-content
  - sample-post
  - blog
---

Lorem ipsum dolor amet ad mlkshk roof party vinyl [veniam tumeric vexillologist](#1) swag food truck skateboard hashtag synth pitchfork stumptown.

Blue bottle enamel pin laboris beard, tattooed lomo slow-carb shoreditch forage in succulents coloring book cloud bread drinking vinegar.

## Iceland adaptogen

Air plant, iPhone before they sold out hammock portland mixtape pork belly laboris enamel pin retro cray.

- Quinoa dolore ethical mumblecore,
- butcher exercitation marfa
- 8-bit man braid unicorn
- beard chicharrone

### Hella williamsburg

Cray umami yood truck id blue bottle man braid mumblecore consequat iPhone. Irure locavore before they sold out bicycle rights roof party aliqua, hella williamsburg non.

Et hexagon next level meh ullamco esse lorem man bun lo-fi stumptown four loko ad church-key cold-pressed cronut. Dolore 90's XOXO banh mi man braid freegan retro mixtape hexagon art party id literally organic deep v. Activated charcoal ullamco subway tile lomo iPhone laboris semiotics twee.

> Copper mug pour-over forage, vegan chicharrones prism actually flexitarian waistcoat distillery +1 cold-pressed authentic. Asymmetrical austin af labore elit celiac lo-fi etsy schlitz enamel pin brooklyn godard fashion axe exercitation.

Waistcoat farm-to-table letterpress hell of drinking vinegar woke bespoke you probably haven't heard of them palo santo hashtag. Echo park yr viral, vexillologist bitters four dollar toast hexagon.

| Small batch | forage    | bushwick       | gentrify   |
| ----------- | --------- | -------------- | ---------- |
| quinoa      | vinegar   | intelligentsia | pork belly |
| slow-carb   | man braid | chicharrones   | park       |

### Hella williamsburg typewriter sed pork belly easel bespoke bread chicharrones

Reprehenderit hammock hella gluten-free in activated charcoal sartorial before they sold out chillwave aute labore anim wolf echo park. Cupidatat put a bird on it salvia echo park. Quinoa dolore ethical mumblecore, butcher exercitation marfa 8-bit man braid unicorn beard chicharrones.

```bash
#!/bin/bash

###### CONFIG
ACCEPTED_HOSTS="/root/.hag_accepted.conf"
BE_VERBOSE=false

if [ "$UID" -ne 0 ]
then
 echo "Superuser rights required"
 exit 2
fi

genApacheConf(){
 echo -e "# Host ${HOME_DIR}$1/$2 :"
}
```

```css
@font-face {
  font-family: Chunkfive;
  src: url("Chunkfive.otf");
}

body,
.usertext {
  color: #f0f0f0;
  background: #600;
  font-family: Chunkfive, sans;
  --heading-1: 30px/32px Helvetica, sans-serif;
}

@import url(print.css);
@media print {
  a[href^="http"]::after {
    content: attr(href);
  }
}
```

```javascript
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;
```

```xml
<!DOCTYPE html>
<title>Title</title>

<style>body {width: 500px;}</style>

<script type="application/javascript">
  function $init() {return true;}
</script>

<body>
  <p checked class="title" id='title'>Title</p>
  <!-- here goes the rest of the page -->
</body>
```

```python
@requires_authorization
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1 + 0b10l) or None

class SomeClass:
    pass

>>> message = '''interpreter
... prompt'''
```

```json
[
  {
    "title": "apples",
    "count": [12000, 20000],
    "description": { "text": "...", "sensitive": false }
  },
  {
    "title": "oranges",
    "count": [17500, null],
    "description": { "text": "...", "sensitive": false }
  }
]
```

```rust
#[derive(Debug)]
pub enum State {
    Start,
    Transient,
    Closed,
}

impl From<&'a str> for State {
    fn from(s: &'a str) -> Self {
        match s {
            "start" => State::Start,
            "closed" => State::Closed,
            _ => unreachable!(),
        }
    }
}
```

```swift
import Foundation

@objc class Person: Entity {
  var name: String!
  var age:  Int!

  init(name: String, age: Int) {
    /* /* ... */ */
  }

  // Return a descriptive string for this person
  func description(offset: Int = 0) -> String {
    return "\(name) is \(age + offset) years old"
  }
}
```

```java
/**
 * @author John Smith <john.smith@example.com>
*/
package l2f.gameserver.model;

public abstract class L2Char extends L2Object {
  public static final Short ERROR = 0x0001;

  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}
```

```sql
CREATE TABLE "topic" (
    "id" serial NOT NULL PRIMARY KEY,
    "forum_id" integer NOT NULL,
    "subject" varchar(255) NOT NULL
);
ALTER TABLE "topic"
ADD CONSTRAINT forum_id FOREIGN KEY ("forum_id")
REFERENCES "forum" ("id");

-- Initials
insert into "topic" ("forum_id", "subject")
values (2, 'D''artagnian');
```

```cpp
#include <iostream>

int main(int argc, char *argv[]) {

  /* An annoying "Hello World" example */
  for (auto i = 0; i < 0xFFFF; i++)
    cout << "Hello, World!" << endl;

  char c = '\n';
  unordered_map <string, vector<string> > m;
  m["key"] = "\\\\"; // this is an error

  return -2e3 + 12l;
}
```

Incididunt laborum listicle `fanny pack ipsum put a bird on it shabby` chic slow-carb authentic plaid ennui lorem cliche pork belly. Fingerstache lomo direct trade fixie paleo try-hard. Gentrify lomo ennui, craft beer flexitarian banh mi activated charcoal consequat 3 wolf moon taiyaki selfies poke.

![image test](https://picsum.photos/400/200)
![image test](https://picsum.photos/400/200?1)

Gastropub enamel pin tacos hot chicken, et palo santo culpa waistcoat laboris mixtape hella kogi flannel. Swag retro shoreditch subway tile.
