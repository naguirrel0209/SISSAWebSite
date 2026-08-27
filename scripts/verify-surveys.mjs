import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd, exit } from 'node:process';

const root = cwd();
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

const packageJson = JSON.parse(read('package.json'));
const app = read('src/App.jsx');
const format = read('src/modules/surveys/utils/format.ts');
const viteConfig = read('vite.config.js');

check(existsSync(join(root, 'src/modules/surveys/pages/PublicSurveyPage.tsx')), 'Missing public survey page.');
check(existsSync(join(root, 'src/modules/surveys/pages/DashboardPage.tsx')), 'Missing admin dashboard page.');
check(existsSync(join(root, 'src/modules/surveys/components/SurveyProviders.tsx')), 'Missing survey providers.');
check(existsSync(join(root, 'src/modules/surveys/types/sis.ts')), 'Missing survey domain types.');
check(app.includes('path="/encuesta/:token"'), 'Public survey route is not wired.');
check(app.includes('path="/encuestas-admin/login"'), 'Admin login route is not wired.');
check(app.includes('path="/encuestas-admin/resultados"'), 'Admin results route is not wired.');
check(app.includes('<SurveyProviders>'), 'Survey routes are not wrapped with their provider.');
check(viteConfig.includes("base: '/SISSAWebSite/'"), 'GitHub Pages base path changed.');
check(format.includes('import.meta.env.BASE_URL'), 'Survey links do not use the Vite base URL.');
check(packageJson.dependencies?.sonner, 'Missing sonner dependency for survey notifications.');
check(!packageJson.dependencies?.['@supabase/supabase-js'], 'Legacy Supabase dependency is still present.');
check(!existsSync(join(root, 'supabase/migrations/202608070001_survey_portal.sql')), 'Legacy survey migration still exists.');
check(!existsSync(join(root, 'docs/surveys.md')), 'Legacy survey documentation still exists.');

if (failures.length) {
  console.error('Survey verification failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  exit(1);
}

console.log('Survey verification passed.');
