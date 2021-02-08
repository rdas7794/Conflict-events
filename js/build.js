// The build function is responsible for the initial creation of the different component objects.

function build(settingsManager, helperFunctionManager, additionalObjectsManager) {
    const sAll = settingsManager;
    const f = helperFunctionManager;
    const o = additionalObjectsManager;

    // Create components
    const components = {
        multiple_map: multiple_map(sAll.general, sAll.multiple_map, f),
        map: map(sAll.general, sAll.map, f)
    };

    return components;
}