const vscode = require('vscode');

function activate() {
  const config = vscode.workspace.getConfiguration();
  const chavaSettings = config.get('[chava]') || {};

  if (chavaSettings['editor.direction'] !== 'rtl') {
    const updated = {
      ...chavaSettings,
      'editor.direction': 'rtl',
    };

    config.update('[chava]', updated, vscode.ConfigurationTarget.Workspace).then(
      () => {
        vscode.window.setStatusBarMessage('ChavaScript: RTL enabled for .chava', 3000);
      },
      () => {
        // Ignore errors, user may have settings locked
      }
    );
  }
}

function deactivate() {}

module.exports = { activate, deactivate };
