# Notes
#### You can use anything that you put in your notes.md file when taking the midterm or final.

## Topic 1: Github & Git
You know this. 
[Review here.](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#links)

## Topic 2: EC2
My instance: http://75.101.199.252/

`chmod 600 [key pair file]`

`ssh -i [key pair file] ubuntu@[ip address]` exit with `exit`

The Caddyfile is the configuration file for your web service gateway. The public_html directory contains all of the static files that you are serving up directly through Caddy when using it as a web service. We will cover Caddy configuration in a later instruction. The services directory is the place where you are going to install all of your web services once you build them.


## Topic 3: HTTPS, TLS, and web certificates
The secure version of HTTP is called Secure Hypertext Transport Protocol (HTTPS). This is basically HTTP with a negotiated secure connection that happens before any data is exchanged. Having a secure connection means that all the data is encrypted using the TLS protocol. SSL is used sometimes to refer to TLS

You can see the actual negotiation with `curl -v -s https://byu.edu > /dev/null` (Does a handshake)

Enable https by getting a web certificate

# HTML

## Topic 4: HTML structure elements

The header contains a paragraph with a span, and a navigation containing multiple divisions of sub-content.

The main contains multiple sections that contain either an unordered list (ul) or a table. Main also contains an aside for content that does not fit the content flow of the sections.

The footer has a content division with a single span.

### Block and inline
block element is meant to be a distinct block in the flow of the content structure. An inline element is meant to be inline with the content flow of a block element.
    
    Block elements: `div`, `p` (paragraph)
   
    Inline elements: `b`, `span`

`Links:` <a href="https://www.byu.edu/">BYU</a>

`Image links:` <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com" style="width:100px;height:100px;">

`Tables: `
<table>
    <tr>
        <td>1 row 1 col<td>
        <td>1 row 2 col</td>
    <tr>
 </table>


## Topic 4: HTML inputs
### Input elements:
| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

### Input types:
| Type           | Meaning                           |
| -------------- | --------------------------------- |
| text           | Single line textual value         |
| password       | Obscured password                 |
| email          | Email address                     |
| tel            | Telephone number                  |
| url            | URL address                       |
| number         | Numerical value                   |
| checkbox       | Inclusive selection               |
| radio          | Exclusive selection               |
| range          | Range limited number              |
| date           | Year, month, day                  |
| datetime-local | Date and time                     |
| month          | Year, month                       |
| week           | Week of year                      |
| color          | Color                             |
| file           | Local file                        |
| submit         | button to trigger form submission |

### Attribute types:
| Attribute | Meaning                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| name      | The name of the input. This is submitted as the name of the input if used in a form |
| disabled  | Disables the ability for the user to interact with the input                        |
| value     | The initial value of the input                                                      |
| required  | Signifies that a value is required in order to be valid                             |

https://codepen.io/Savannah-Smith-the-animator/pen/GRbPeBe?editors=1000

## Topic 5: HTML media
EX: img, audio, video, svg, and canvas. The img, audio, and video elements are all simple references to an external file, but svg and canvas both contain the code to render a visual image that can even be animated.

`<img alt="mountain landscape" src="https://images.pexels.com/photos/164170/pexels-photo-164170.jpeg" />`

`<audio controls src="testAudio.mp3"></audio>`

`<video controls width="300" crossorigin="anonymous">
  `<source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />`
</video`

Crossorigin needed if the video is not from your site.


`<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="red" fill="red" style="border: 1px solid #000000">
  <circle cx="150" cy="100" r="50" />
</svg>`

# CSS

## Topic 6: CSS Flexbox
`flex` display layout is useful when you want to partition your application into areas that responsively move around as the window resizes or the orientation changes

Make th e body element into a responsive flexbox by including `display: flex` in CSS

`flex-direction: row` that the children are oriented side by side.

### Small screen sizes
Use `@media`

Set `flex-direction: column`

## Topic 7: CSS Frameworks
Tailwind: it uses smaller definitions that are applied specifically to individual HTML elements. This moves much of the CSS representation out of the CSS file and directly into the HTML.

Bootstrap: Referencing the Bootstrap CSS files then add the HTML link elements to your head element.
https://getbootstrap.com/docs/5.2/getting-started/introduction/

Here's an [example](https://codepen.io/leesjensen/pen/JjZavjW?editors=1100) of using bootstrap components.

# Javascript

## Topic 8: Javascript Arrays

| Function | Meaning                                                   | Example                       |
| -------- | --------------------------------------------------------- | ----------------------------- |
| push     | Add an item to the end of the array                       | `a.push(4)`                   |
| pop      | Remove an item from the end of the array                  | `x = a.pop()`                 |
| slice    | Return a sub-array                                        | `a.slice(1,-1)`               |
| sort     | Run a function to sort an array in place                  | `a.sort((a,b) => b-a)`        |
| values   | Creates an iterator for use with a `for of` loop          | `for (i of a.values()) {...}` |
| find     | Find the first item satisfied by a test function          | `a.find(i => i < 2)`          |
| forEach  | Run a function on each array item                         | `a.forEach(console.log)`      |
| reduce   | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)`   |
| map      | Run a function to map an array to a new array             | `a.map(i => i+i)`             |
| filter   | Run a function to remove items                            | `a.filter(i => i%2)`          |
| every    | Run a function to test if all items match                 | `a.every(i => i < 3)`         |
| some     | Run a function to test if any items match                 | `a.some(i => 1 < 1)`          |

## Topic 9: DOM
Document Object Model (DOM) is an object representation of the HTML elements that the browser uses to render the display. The browser also exposes the DOM to external code so that you can write programs that dynamically manipulate the HTML.