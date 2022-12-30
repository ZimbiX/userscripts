# ZimbiX's userscripts

See [`js/`](js/) for the list of userscripts.

Additionally, the following ones are instead distributed as Chrome extensions:

- [YouTube Fast Fullscreen Toggle](https://github.com/ZimbiX/youtube-fast-fullscreen-toggle)

## Note to self: how to refresh this repo

- Open the Tampermonkey dashboard
- Click the filter icon at the top-left
- Tick the checkbox that appears to select all userscripts
- Select 'Export' from the dropdown
- Click 'Start'
- In this repo, run:

    ```bash
    rm -f js/* && unzip ~/Downloads/tampermonkey_scripts.zip -d js && rm -f ~/Downloads/tampermonkey_scripts.zip js/*.json
    ```
