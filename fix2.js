const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// There's a curly brace bug right at the wrapper around Landing Page Filters
const bugMatch = `
      </div>

      </div>

      {/* Landing Page Filters (Tabs) */}`;
const fixMatch = `
      </div>

      {/* Landing Page Filters (Tabs) */}`;

code = code.replace(bugMatch, fixMatch);

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed main wrapper brackets");
