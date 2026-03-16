const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// There is an extra </div> causing issues between header and Landing Page Tabs
// 187:       </div>
// 188:
// 189:       </div> <-- this goes rogue
// 190:
// 191:       {/* Landing Page Filters (Tabs) */}
code = code.replace("      </div>\n\n      </div>\n\n      {/* Landing Page Filters (Tabs) */}", "      </div>\n\n      {/* Landing Page Filters (Tabs) */}");

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed stray div tag");
