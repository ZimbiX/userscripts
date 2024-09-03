# ZimbiX's userscripts

A collection of my Tampermonkey userscripts used to improve particular websites.

See [`js/`](js/) for the list of userscripts.

Additionally, the following ones are instead distributed as Chrome extensions:

- [YouTube Fast Fullscreen Toggle](https://github.com/ZimbiX/youtube-fast-fullscreen-toggle)

## How to install userscripts

- Download the [Tampermonkey](https://www.tampermonkey.net/) extension for your web browser
- Browse to any userscript in [`js/`](js/) and click the 'Raw' button at the top-right — Tampermonkey should then prompt you to review and install it

## Note to self: how to refresh this repo

- Open the Tampermonkey dashboard
- Click the filter icon at the top-left
- Tick the checkbox that appears to select all userscripts
- Select 'Export' from the dropdown
- Click 'Start'
- In this repo, run: `./scripts/import-from-tampermonkey-download`
