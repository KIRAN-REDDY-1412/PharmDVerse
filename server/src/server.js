require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` 🚀 PharmDVerse ERP SaaS Production Backend v2.1.0`);
  console.log(` 🌐 Server listening on http://localhost:${PORT}`);
  console.log(` 🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
