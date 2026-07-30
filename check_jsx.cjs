const fs = require('fs');
const parser = require('@babel/parser');

function checkFile(file) {
  const code = fs.readFileSync(file, 'utf8');
  try {
    parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx']
    });
    console.log(file, 'is OK');
  } catch (err) {
    console.error(file, err.message);
  }
}

checkFile('src/components/forms/PatientCounsellingForm.jsx');
checkFile('src/components/forms/PharmacistInterventionForm.jsx');
checkFile('src/components/forms/DrugInformationRequestForm.jsx');
checkFile('src/components/forms/ADRForm.jsx');
