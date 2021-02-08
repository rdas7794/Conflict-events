// The helper function manager contains all functions that might be used by more than one component

class HelperFunctionManager{

    constructor(settingsManager) {
        this.sAll = settingsManager;
    }

    createGettersSetters = function(component, settingsObject) {
        Object.entries(settingsObject).map(entry => {
            let [name, val] = entry;
            component[name] = function(value) {
                if (!arguments.length) return settingsObject[name]; 
                settingsObject[name] = value;
                return component;
            };
        });
    }
}