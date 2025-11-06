export const preProcess = (
  inputText,
  volume,
  bpm = 140,
  musicElements = [],
  p1Mode = 'on'
) => {
  let outputText = inputText + '\n// hello, this is a test';
  outputText += `\n//all(x => x.gain(${volume}))`;
  outputText = outputText.replaceAll('{$VOLUME}', volume);
  outputText = outputText.replaceAll('{$BPM}', bpm);

  // Handle p1 mode replacement
  const p1Replacement = p1Mode === 'hush' ? '_' : '';
  outputText = outputText.replaceAll('<p1_Radio>', p1Replacement);

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

  // Add music elements if any exist and apply volume to them
  if (musicElements.length > 0) {
    const elementCodes = musicElements
      .map((element, index) => {
        // Apply volume to each element's code
        let elementCode = element.code;
        elementCode = elementCode.replaceAll(
          /(?<!post)gain\(([\d.]+)\)/g,
          (match, captureGroup) => `gain(${captureGroup} * ${volume})`
        );
        return `added_element_${index + 1}: ${elementCode}`;
      })
      .join('\n\n');

    matches3 += '\n\n// === Added Elements ===\n' + elementCodes;
  }

  console.log(matches3);
  return matches3;
};
