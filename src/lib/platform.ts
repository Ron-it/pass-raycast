import path from "path";

export const IS_MACOS = process.platform === "darwin";
export const IS_WINDOWS = process.platform === "win32";
export const SUPPORTS_BUNDLED_CLI = IS_MACOS;
export const SUPPORTS_TERMINAL_LOGIN = IS_MACOS;

export function getWindowsDefaultCliDirectory(): string | undefined {
  const localAppData = process.env.LOCALAPPDATA;
  return localAppData ? path.join(localAppData, "Programs", "ProtonPass") : undefined;
}

export function getWindowsDefaultCliPath(): string | undefined {
  const directory = getWindowsDefaultCliDirectory();
  return directory ? path.join(directory, "pass-cli.exe") : undefined;
}

export function getCliNotInstalledDescription(): string {
  if (!IS_WINDOWS) {
    return "You need to install the Proton Pass CLI to use this extension. Click below to learn how to install it.";
  }

  const defaultPath = getWindowsDefaultCliPath();
  return defaultPath
    ? `Install Proton Pass CLI for Windows or set CLI Path to '${defaultPath}'.`
    : "Install Proton Pass CLI for Windows or set the CLI Path preference.";
}

export function getCliNotInstalledMessage(cliPath: string): string {
  if (!IS_WINDOWS) {
    return `pass-cli not found at '${cliPath}'. Install it or set the correct path in extension preferences.`;
  }

  const defaultPath = getWindowsDefaultCliPath();
  return defaultPath
    ? `pass-cli not found at '${cliPath}'. Install Proton Pass CLI for Windows or set CLI Path to '${defaultPath}'.`
    : `pass-cli not found at '${cliPath}'. Install Proton Pass CLI for Windows or set the CLI Path preference.`;
}

export function getLoginDescription(): string {
  if (SUPPORTS_TERMINAL_LOGIN) {
    return "Use browser login (default pass-cli flow). Terminal login remains available as a fallback.";
  }

  return "Use browser login (default pass-cli flow).";
}

export function getKeyringTroubleshootingMessage(): string {
  if (!IS_WINDOWS) {
    return "pass-cli could not access secure key storage. Try: pass-cli logout --force, then set PROTON_PASS_KEY_PROVIDER=fs and login again.";
  }

  return "pass-cli could not access secure key storage. Try: pass-cli logout --force, then in PowerShell run `$env:PROTON_PASS_KEY_PROVIDER='fs'; pass-cli login`.";
}
