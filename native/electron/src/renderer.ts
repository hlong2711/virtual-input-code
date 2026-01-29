
const information = document.getElementById('info');

if (information) {
  information.innerText = `111 This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;
}
