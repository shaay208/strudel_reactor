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
    const elementCodes = musicElements.map((element) => {
      // Remove leading "name:"
      let code = element.code.replace(/^[\s\r\n]*[A-Za-z0-9_.-]+\s*:\s*/, '');

      // Apply volume scaling
      code = code.replaceAll(
        /(?<!post)gain\(([\d.]+)\)/g,
        (match, g) => `gain(${g} * ${volume})`
      );

      return code.trim();
    });

    // finding the stack of the track and inserting the elements there
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
      // No stack found then adding the elements at the end
      matches3 +=
        '\n\n// === Added Elements ===\n' + elementCodes.join('\n\n') + '\n';
    }
  }

  console.log(matches3);
  return matches3;
};
