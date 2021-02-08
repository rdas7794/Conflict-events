When adding a new component, the following steps have to be completed:

* Add folder `./js/components/componentNew` containing `componentNew.component.js` and `componentNew.functions.js`
* Add lines to `./index.html` to read in the `.component.js` and the `.functions.js` file
* Add appropriate containers to `./index.html`
* Add `componentnew` object to `./js/managers/settings.manager.js`
* Later: Add building of component inside `./build.js`
* Optional: Add new data as `./data/new_data.csv` and add entry to `fileList` in `./js/managers/data.manager.js`
