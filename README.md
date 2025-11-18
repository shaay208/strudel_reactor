# Strudel Reactor

A React-based music application using Strudel for live coding music. This app allows users to create, preprocess, and play music tracks with various controls and visualizations.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Demonstration Video

[Link to demonstration video](https://drive.google.com/drive/folders/1faCjdqfjxK3E1ccSpKW4vPPlYOIWw8io?usp=sharing) - 5-minute screen recording with facecam showing all features and controls in action.

## Features

### UI & Controls

The application features a cohesive Bootstrap-styled interface with the following controls:

- **Track Selection**: Dropdown menu to select from available music tracks (e.g., Stranger, etc.).
- **Volume Control**: Slider (0-100%) to adjust playback volume.
- **BPM Control**: Number input field to set beats per minute, with a reset button to default track BPM.
- **Mode Selection**: Radio buttons to toggle between "P1: ON" (playing) and "P1: HUSH" (muted) modes.
- **Playback Controls**:
  - Play/Stop buttons for starting and stopping music.
  - Preprocess button to process the text input.
  - Process & Play button to preprocess and immediately start playback.
- **Music Adder**: Quick add buttons for various music elements (Kick, Hi-Hat, Snare, Bass, Synth, Pad, FX, Cymbal, Clap, Jazz). Added elements are displayed as removable badges.
- **Code Editor**: Accordion with textarea for editing Strudel code and a live editor view.
- **Presets**: Save and Load buttons to store/load current settings (volume, BPM, track, added elements, mode) using localStorage.
- **Keyboard Shortcuts**: Ctrl+Enter to play, Ctrl+. to stop.
- **Visualizations**: Real-time D3 graph showing music event data, ball animation during playback, and pianoroll canvas.

### Preprocessing Logic

- Single parent component (App.js) manages all state and data flow.
- Preprocessing logic in `PreProcessLogic.js` handles volume scaling, BPM adjustment, and integration of added music elements into the Strudel code.
- Code is organized into modular components with descriptive names and comments.
- Error handling for invalid inputs and graceful fallbacks.

### Additional Features

- **JSON Handling**: Save/load presets as JSON objects stored in localStorage for persisting user settings.
- **D3 Graph**: Real-time updating line graph visualizing music events (notes, gains, etc.) extracted from Strudel logs. Graph clears every 100 events and shows up to 20 data points.

## Usage Guidelines

- Start by selecting a track from the dropdown.
- Adjust volume and BPM as needed.
- Use the code editor to modify the Strudel code.
- Add music elements using the quick add buttons; they will blend into the current track.
- Save presets to remember your settings.
- The D3 graph updates in real-time during playback.

## Songs and Attribution

- Default tracks are original and adapted from Strudel.cc bakery examples (https://strudel.cc/learn/effects/)
- No external songs used; all code is custom and from Strudel library.

## AI Usage

<!-- /issue with not adding new music to the on playing music issue debug by using AI and then explaining the code and learning the solution  -->

**Debug steps**:
`check the difference between the working 1st track where it works with adding music to the playing track and other tracks did not adding music to the track instead it play only the newly added music elements. so debug with it by checking the differences by checking the playing code diff in diffcheker like in the (/Users/shalinialgama/Documents/webtec/strudel_reactor/public/diffchker of debug.png) then identified that the adding elements are change in the tunes and then feeding the recent preProcessLogic`

**Inserted input to AI**: existing preProcessLogic.js file logic and 'added elements only playing when added to the music but it should play both track and added elements combined'

**AI output**: `Got it — this tells me exactly what the bug is: Your added elements are NOT being inserted inside stack(),

so Strudel treats the added elements as a separate, new track, which overrides the main one → you only hear the added elements instead of the combined layers.

This happens because your second code never finds stack() and never injects into it.

// Add music elements if any exist and apply volume to them
if (musicElements.length > 0) {
const elementCodes = musicElements.map((element) => {
// Remove leading "name:"
let code = element.code.replace(/^[\s\r\n]_[A-Za-z0-9_.-]+\s\_:\s\*/, '');

    // Apply volume scaling
    code = code.replaceAll(
      /(?<!post)gain\(([\d.]+)\)/g,
      (match, g) => `gain(${g} * ${volume})`
    );

    return code.trim();

});

const idx = matches3.indexOf('stack(');
if (idx !== -1) {
const openPos = matches3.indexOf('(', idx);
let depth = 0;

    for (let i = openPos; i < matches3.length; i++) {
      const ch = matches3[i];
      if (ch === '(') depth++;
      else if (ch === ')') {
        depth--;
        if (depth === 0) {
          // Insert right before the closing ")"
          const before = matches3.slice(0, i);
          const after = matches3.slice(i);

          // Add comma if needed
          const needsComma = /[^,\s]$/.test(before.trim());

          matches3 =
            before +
            (needsComma ? ',' : '') +
            '\n' +
            elementCodes.join(',\n') +
            '\n' +
            after;

          break;
        }
      }
    }

} else {
// No stack() found → fallback append (won’t override main)
matches3 +=
'\n\n// === Added Elements ===\n' + elementCodes.join('\n\n') + '\n';
}
}

Before fix:

Your code was doing:

stack(...)

// === Added Elements ===
s("new stuff")

Strudel sees TWO top-level expressions → last one wins → added elements replace the track.
After fix:

Now it produces:
stack(
s("bd*4"),
s("sn*2"),
s("added element"), <-- injected here 👍
)
So everything plays together, just like your first working version.`

**Inserted input to AI**:
"if (musicElements.length > 0) {
const elementCodes = musicElements.map((element) => {
// Remove leading "name:"
let code = element.code.replace(/^[\s\r\n]_[A-Za-z0-9_.-]+\s\_:\s\*/, '');

      // Apply volume scaling
      code = code.replaceAll(
        /(?<!post)gain\(([\d.]+)\)/g,
        (match, g) => `gain(${g} * ${volume})`
      );

      return code.trim();
    });

    const idx = matches3.indexOf('stack(');
    if (idx !== -1) {
      const openPos = matches3.indexOf('(', idx);
      let depth = 0;

      for (let i = openPos; i < matches3.length; i++) {
        const ch = matches3[i];
        if (ch === '(') depth++;
        else if (ch === ')') {
          depth--;
          if (depth === 0) {
            // Insert right before the closing ")"
            const before = matches3.slice(0, i);
            const after = matches3.slice(i);

            // Add comma if needed
            const needsComma = /[^,\s]$/.test(before.trim());

            matches3 =
              before +
              (needsComma ? ',' : '') +
              '\n' +
              elementCodes.join(',\n') +
              '\n' +
              after;

            break;
          }
        }
      }
    } else {
      // No stack() found → fallback append (won’t override main)
      matches3 +=
        '\n\n// === Added Elements ===\n' + elementCodes.join('\n\n') + '\n';
    }

}
explain the code "

**AI output**:
"This code block is part of a function that processes and modifies a string (matches3) based on the presence of musicElements. Here's a detailed explanation:

Purpose
The code dynamically injects or appends new music-related elements (musicElements) into a string (matches3) that represents some kind of structured data, such as a configuration or script. It ensures that the new elements are properly formatted and integrated into the existing structure.

Step-by-Step Explanation
Check if musicElements is not empty:

if (musicElements.length > 0) {

    This ensures that the logic inside the block only executes if there are elements in the musicElements array.

Transform musicElements into formatted codes:

const elementCodes = musicElements.map((element) => {
let code = element.code.replace(/^[\s\r\n]_[A-Za-z0-9_.-]+\s\_:\s*/, '');
code = code.replaceAll(
/(?<!post)gain\(([\d.]+)\)/g,
(match, g) => `gain(${g} * ${volume})`
);
return code.trim();
});

Each element in musicElements is processed:

Remove leading "name:": The replace regex removes any leading identifier (e.g., name:) from the element.code.
Apply volume scaling: The replaceAll regex modifies any gain(value) by multiplying the value with the volume variable. It skips postgain using the negative lookbehind (?<!post).
Trim whitespace: The resulting string is cleaned up.
The transformed codes are stored in the elementCodes array.

Find the first occurrence of stack( in matches3:

const idx = matches3.indexOf('stack(');
The code looks for the first stack( in the matches3 string. This is likely a function or block where the new elements should be injected.
If stack( is found:

if (idx !== -1) {
const openPos = matches3.indexOf('(', idx);
let depth = 0;

for (let i = openPos; i < matches3.length; i++) {
const ch = matches3[i];
if (ch === '(') depth++;
else if (ch === ')') {
depth--;
if (depth === 0) {
// Insert right before the closing ")"
const before = matches3.slice(0, i);
const after = matches3.slice(i);

        const needsComma = /[^,\s]$/.test(before.trim());

        matches3 =
          before +
          (needsComma ? ',' : '') +
          '\n' +
          elementCodes.join(',\n') +
          '\n' +
          after;

        break;
      }
    }

}
}

Locate the opening parenthesis: The position of the first ( after stack( is stored in openPos.
Track nested parentheses: A depth counter is used to track nested parentheses. It increments for ( and decrements for ).
Find the closing parenthesis: The loop continues until the matching closing ) for the stack( is found.
Inject elementCodes:
The string is split into before (everything before the closing )) and after (everything after it).
A comma is added if the before part doesn't already end with one.
The elementCodes are joined with commas and newlines, then inserted before the closing ).
If stack( is not found:

else {
matches3 +=
'\n\n// === Added Elements ===\n' + elementCodes.join('\n\n') + '\n';
}

If no stack( is found, the elementCodes are appended to the end of matches3 with a comment // === Added Elements === to indicate the addition.

Key Features
Regex for Parsing and Transformation:
Removes unnecessary prefixes (name:).
Scales gain values dynamically based on volume.
Dynamic Injection:
If stack( exists, the new elements are injected inside it.
If stack( doesn't exist, the elements are appended at the end.
Parentheses Matching:
Ensures proper placement of new elements by tracking nested parentheses.

Use Case
This code is likely part of a music or audio processing tool where matches3 represents a script or configuration. The musicElements array contains additional elements to be integrated into the script, and the code ensures they are added in the correct format and location.
"

#### Ball animation

Do search to create an animation and found an medium article(https://medium.com/@josesoal/a-canvas-animation-with-react-7a81aa331609) that have ball animation and learned from it and used it on the assignment to show the user an animation when user playing and when sound track stop then user is seeing boostrap loading animation.
