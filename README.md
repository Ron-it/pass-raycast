# Proton Pass

Search and manage your Proton Pass items directly from Raycast.

## Fork Notes

This repository is a standalone fork of the original Proton Pass Raycast extension from the Raycast extensions monorepo:

- Upstream source: <https://github.com/raycast/extensions/tree/15e3cd2f1717ae409f5cc0707a23e10f21fbfc57/extensions/proton-pass>
- Original extension author: `izyuumi`
- Original listed contributor: `FeernandoOFF`

This fork keeps the upstream Proton Pass extension as the base and adds Windows compatibility for Raycast on Windows, using an installed and authenticated `pass-cli.exe`. It also includes compatibility fixes for current Proton Pass CLI item payloads, including `Custom` items and newer `extra_fields` formats.

## Setup

This extension requires the Proton Pass CLI (`pass-cli`) to be installed and authenticated.

### 1. Install the CLI

#### macOS

The extension can download the macOS CLI automatically on first use.

You can also install it manually with Homebrew:

```bash
brew install protonmail/proton/pass-cli
```

#### Windows

Install Proton Pass CLI before using the extension:

```powershell
Invoke-WebRequest -Uri https://proton.me/download/pass-cli/install.ps1 -OutFile install.ps1
.\install.ps1
```

If Raycast does not find the CLI automatically, set **CLI Path** to your installed executable, usually:

```text
C:\Users\<you>\AppData\Local\Programs\ProtonPass\pass-cli.exe
```

See the [Proton Pass CLI Documentation](https://protonpass.github.io/pass-cli/) for the latest install instructions.

### 2. Authenticate

Run the default web login flow:

```bash
pass-cli login
```

This uses web login by default: `pass-cli` prints a URL, you complete authentication in your browser, and the session is saved locally.

Optional: use terminal prompts with interactive login:

```bash
pass-cli login --interactive user@proton.me
```

### 3. Verify

Test that the CLI is working:

```bash
pass-cli vault list
```

## Preferences

- **CLI Path**: Path to the `pass-cli` executable (defaults to `pass-cli` in PATH)
- **Default Password Length**: Length for generated passwords (default: 20)
- **Default Password Type**: Random characters or memorable passphrase
- **Transient Clipboard**: Clear password from clipboard after pasting
- **Background Refresh**: Automatically refresh cached vault and item data
- **Web Integration**: Auto-select items that match your active browser tab URL (requires Raycast web extension access)

## Troubleshooting

### Keyring Access Issues

If you see keyring-related errors, try:

#### macOS / Linux

```bash
pass-cli logout --force
export PROTON_PASS_KEY_PROVIDER=fs
pass-cli login
```

#### Windows PowerShell

```powershell
pass-cli logout --force
$env:PROTON_PASS_KEY_PROVIDER='fs'
pass-cli login
```

### CLI Not Found

If the CLI is installed but not detected, set the full path in extension preferences:

```text
/opt/homebrew/bin/pass-cli
```

On Windows, the default install location is usually:

```text
C:\Users\<you>\AppData\Local\Programs\ProtonPass\pass-cli.exe
```

### Re-download CLI (macOS only)

If the bundled macOS CLI becomes corrupted or you want to force a re-download, use the **Clear CLI Cache** action available in the error screens.
