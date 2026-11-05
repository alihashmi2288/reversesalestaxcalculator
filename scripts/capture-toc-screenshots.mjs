import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const dir = 'audit/after-ui/screenshots';
fs.mkdirSync(dir, { recursive: true });

function run(cmd) {
  return execSync(cmd, { stdio: 'inherit' });
}

console.log('Capturing desktop screenshots...');
// Desktop open
run(`agent-browser open "http://localhost:3005/" && agent-browser set viewport 1354 875 && agent-browser scrollintoview ".toc-nav" && agent-browser wait 300 && agent-browser screenshot "${dir}/home-1354-toc-scrolled.png"`);

// Desktop collapsed
run(`agent-browser open "http://localhost:3005/" && agent-browser set viewport 1354 875 && agent-browser scrollintoview ".toc-nav" && agent-browser click ".toc-summary" && agent-browser wait 300 && agent-browser screenshot "${dir}/home-1354-toc-collapsed.png"`);

// Desktop scrolled to formula
run(`agent-browser open "http://localhost:3005/" && agent-browser set viewport 1354 875 && agent-browser click "a[href='#formula']" && agent-browser wait 600 && agent-browser screenshot "${dir}/home-1354-formula-scrolled.png"`);

console.log('Capturing mobile screenshots...');
// Mobile open
run(`agent-browser open "http://localhost:3005/" && agent-browser set viewport 390 844 && agent-browser scrollintoview ".toc-nav" && agent-browser wait 300 && agent-browser screenshot "${dir}/home-390-toc-scrolled.png"`);

// Mobile collapsed
run(`agent-browser open "http://localhost:3005/" && agent-browser set viewport 390 844 && agent-browser scrollintoview ".toc-nav" && agent-browser click ".toc-summary" && agent-browser wait 300 && agent-browser screenshot "${dir}/home-390-toc-collapsed.png"`);

console.log('✔ All screenshots captured successfully.');
