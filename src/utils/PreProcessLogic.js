export const preProcess = (inputText, volume, bpm = 140) => {
  let outputText = inputText + '\n// hello, this is a test';
  outputText += `\n//all(x => x.gain(${volume}))`;
  outputText = outputText.replaceAll('{$VOLUME}', volume);
  outputText = outputText.replaceAll('{$BPM}', bpm);

  // Original regex for named blocks (like bassline:, drums:, etc.)
  let regex = /[a-zA-Z0-9_.-]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:/])/gm;
  let m;
  let matches = [];

  while ((m = regex.exec(outputText)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      matches.push(match);
    });
  }

  // Apply volume to named blocks
  let matches2 = matches.map((match) =>
    match.replaceAll(
      /(?<!post)gain\(([\d.]+)\)/g,
      (match, captureGroup) => `gain(${captureGroup}* ${volume})`
    )
  );

  let matches3 = matches.reduce(
    (text, original, i) => text.replaceAll(original, matches2[i]),
    outputText
  );

  // If no named blocks were found, apply volume to the entire text
  // This handles tracks that just have stack() without named sections
  if (matches.length === 0) {
    matches3 = matches3.replaceAll(
      /(?<!post)gain\(([\d.]+)\)/g,
      (match, captureGroup) => `gain(${captureGroup} * ${volume})`
    );
  }

  console.log(matches3);
  return matches3;
};
