// Einmalige Einrichtung: legt die Android- und iOS-Projekte an, erzeugt Icons und stellt Querformat ein.
const { execSync } = require('child_process');
const fs = require('fs');
const run = c => { console.log('> ' + c); execSync(c, { stdio: 'inherit' }); };
const mac = process.platform === 'darwin';

run('npm install');
if (!fs.existsSync('android')) run('npx cap add android');
if (mac && !fs.existsSync('ios')) run('npx cap add ios');

// Icons aus icon-1024.png für beide Systeme erzeugen
fs.mkdirSync('assets', { recursive: true });
fs.copyFileSync('icon-1024.png', 'assets/icon-only.png');
fs.copyFileSync('icon-1024.png', 'assets/icon-foreground.png');
fs.writeFileSync('assets/icon-background.png', fs.readFileSync('icon-1024.png'));
try { run('npx capacitor-assets generate --iconBackgroundColor #8fd3ff --splashBackgroundColor #8fd3ff'); } catch (e) { console.log('Icon-Erzeugung übersprungen:', e.message); }

// Android: Querformat + Vollbild
const am = 'android/app/src/main/AndroidManifest.xml';
if (fs.existsSync(am)) {
  let x = fs.readFileSync(am, 'utf8');
  if (!x.includes('screenOrientation')) x = x.replace('<activity', '<activity android:screenOrientation="sensorLandscape"');
  fs.writeFileSync(am, x);
  const st = 'android/app/src/main/res/values/styles.xml';
  if (fs.existsSync(st)) {
    let y = fs.readFileSync(st, 'utf8');
    if (!y.includes('windowFullscreen')) y = y.replace(/<style name="AppTheme.NoActionBar"[^>]*>/, m => m + '\n        <item name="android:windowFullscreen">true</item>\n        <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>');
    fs.writeFileSync(st, y);
  }
}
// iOS: Querformat + Statusleiste ausblenden
const ip = 'ios/App/App/Info.plist';
if (fs.existsSync(ip)) {
  let x = fs.readFileSync(ip, 'utf8');
  x = x.replace(/<key>UISupportedInterfaceOrientations<\/key>\s*<array>[\s\S]*?<\/array>/, '<key>UISupportedInterfaceOrientations</key>\n\t<array>\n\t\t<string>UIInterfaceOrientationLandscapeLeft</string>\n\t\t<string>UIInterfaceOrientationLandscapeRight</string>\n\t</array>');
  x = x.replace(/<key>UISupportedInterfaceOrientations~ipad<\/key>\s*<array>[\s\S]*?<\/array>/, '<key>UISupportedInterfaceOrientations~ipad</key>\n\t<array>\n\t\t<string>UIInterfaceOrientationLandscapeLeft</string>\n\t\t<string>UIInterfaceOrientationLandscapeRight</string>\n\t</array>');
  if (!x.includes('UIStatusBarHidden')) x = x.replace('</dict>\n</plist>', '\t<key>UIStatusBarHidden</key>\n\t<true/>\n\t<key>UIViewControllerBasedStatusBarAppearance</key>\n\t<false/>\n</dict>\n</plist>');
  fs.writeFileSync(ip, x);
}
run('npx cap sync');
console.log('\nFertig. Android: npm run android   |   iPhone (nur Mac): npm run ios');
