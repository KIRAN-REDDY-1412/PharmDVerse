import * as acorn from 'acorn';
import jsx from 'acorn-jsx';
import fs from 'fs';

const parser = acorn.Parser.extend(jsx());

function checkFile(file) {
  const code = fs.readFileSync(file, 'utf8');
  try {
    parser.parse(code, { sourceType: 'module' });
    console.log(file, 'is OK');
  } catch (err) {
    console.error(file, 'Error:', err.message, 'at line', err.loc ? err.loc.line : 'unknown');
  }
}

checkFile('src/components/forms/PatientCounsellingForm.jsx');
checkFile('src/components/forms/PharmacistInterventionForm.jsx');
checkFile('src/components/forms/DrugInformationRequestForm.jsx');
checkFile('src/components/forms/ADRForm.jsx');
