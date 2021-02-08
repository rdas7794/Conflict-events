function runApp() {

    // Set up managers necessary for creating the component functions
    const settingsManager = new SettingsManager();
    const helperFunctionManager = new HelperFunctionManager(settingsManager);
    const additionalObjectsManager = {};

    // Set up components
    const components = build(settingsManager, helperFunctionManager, additionalObjectsManager);

    // Set up remaining managers
    // Data manager
    const dataManager = new DataManager(settingsManager);
    dataManager.loadData().then(function(data) {
        dataManager.addData(data);
        // Layout manager
        const layoutManager = new LayoutManager(settingsManager);
        layoutManager.addDataToComponents(dataManager.data, components);
        // Event manager
        const eventManager = new EventManager(settingsManager, dataManager, components);
        eventManager.addListeners();
    })

}

export { runApp }