const fs = require('fs');

function checkFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  let openTags = [];
  const regex = /<(\/?)([a-zA-Z0-9]+)([^>]*)>/g;
  let match;
  let lineCount = 1;
  let lastIndex = 0;
  
  while ((match = regex.exec(content)) !== null) {
    const isClosing = match[1] === '/';
    const tag = match[2];
    const textBefore = content.substring(lastIndex, match.index);
    lineCount += (textBefore.match(/\n/g) || []).length;
    lastIndex = match.index;
    
    const attrs = match[3];
    if (attrs.endsWith('/') || ['input', 'br', 'hr', 'img', 'AlertCircle', 'AlertTriangle', 'CheckCircle2', 'Save', 'Send', 'ChevronRight'].includes(tag)) {
      continue;
    }
    
    if (!['div', 'Layout', 'fieldset', 'h1', 'h2', 'h3', 'span', 'button', 'textarea', 'Link', 'label', 'p', 'select', 'option'].includes(tag)) continue;

    if (!isClosing) {
      openTags.push({ tag, line: lineCount });
    } else {
      if (openTags.length === 0) {
        console.error(`${file}: Found closing </${tag}> at line ${lineCount} without open tag!`);
        return;
      }
      const last = openTags.pop();
      if (last.tag !== tag) {
        console.error(`${file}: Mismatched tags! Expected </${last.tag}> (opened at ${last.line}) but found </${tag}> at line ${lineCount}`);
        return;
      }
    }
  }
  
  if (openTags.length > 0) {
    console.error(`${file}: Unclosed tags remaining: ${openTags.map(t => `<${t.tag}> (line ${t.line})`).join(', ')}`);
  } else {
    console.log(`${file}: Perfectly balanced tags!`);
  }
}

checkFile('src/components/forms/PatientCounsellingForm.jsx');
checkFile('src/components/forms/PharmacistInterventionForm.jsx');
checkFile('src/components/forms/DrugInformationRequestForm.jsx');
checkFile('src/components/forms/ADRForm.jsx');
