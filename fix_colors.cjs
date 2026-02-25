const fs = require("fs");
const file =
  "c:/Users/Acer/OneDrive/Desktop/coaching center/src/routes/DemoApp.jsx";
let code = fs.readFileSync(file, "utf8");

const replacements = {
  '"red"': '"#dc2626"',
  "'red'": '"#dc2626"',
  '"blue"': '"#2563eb"',
  "'blue'": '"#2563eb"',
  '"orange"': '"#f97316"',
  "'orange'": '"#f97316"',
  '"purple"': '"#7c3aed"',
  "'purple'": '"#7c3aed"',
  '"green"': '"#10b981"',
  "'green'": '"#10b981"',
  '"emerald"': '"#10b981"',
  "'emerald'": '"#10b981"',
  '"indigo"': '"#4f46e5"',
  "'indigo'": '"#4f46e5"',
  '"slate"': '"#334155"',
  "'slate'": '"#334155"',
};

for (const [key, value] of Object.entries(replacements)) {
  const regex = new RegExp(`themeColor:\\s*${key}`, "g");
  code = code.replace(regex, `themeColor: ${value}`);
}

fs.writeFileSync(file, code);
console.log("Fixed theme colors");
