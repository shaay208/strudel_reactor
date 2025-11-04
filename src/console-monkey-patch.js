let originalLog = null;
const logArray = [];

export default function console_monkey_patch() {
  //If react multicalls this, do nothing
  if (originalLog) return;

  originalLog = console.log;

  //Overwrite console.log function
  console.log = function (...args) {
    // Convert arguments to string for pattern matching
    const logString = args.join(' ');

    //Check for [hap], that's a strudel prefix
    const isStrudelHap = logString.substring(0, 8) === '%c[hap] ';

    // Check for music data patterns (note, sound, numeric values, gain)
    // Catches Strudel events without [hap] prefix
    const isMusicData =
      logString.includes('note:') ||
      logString.includes('s:') ||
      logString.includes('n:') ||
      logString.includes('gain:');

    // Accept both [hap] prefix and music data patterns
    if (isStrudelHap || isMusicData) {
      // Remove console formatting artifacts (%c, background-color, etc.)
      let cleanString = logString
        .replace('%c[hap] ', '')
        .replace(/%c/g, '')
        .replace(/background-color:.*$/i, '')
        .trim();

      //If so, add it to the Array of values.
      //Then remove the oldest values once we've hit 100.
      logArray.push(cleanString);

      if (logArray.length > 100) {
        logArray.splice(0, 1);
      }
      //Dispatch a customevent we can listen to in App.js
      const event = new CustomEvent('d3Data', { detail: [...logArray] });
      document.dispatchEvent(event);
    }
    originalLog.apply(console, args);
  };
}

export function getD3Data() {
  return [...logArray];
}

export function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}

export function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}
