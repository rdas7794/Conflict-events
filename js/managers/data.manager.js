// The data manager loads, stores, and filters the data 

class DataManager{
    
    constructor(settingsManager) {
        this.sAll = settingsManager;
        this.data = {};
        this.fileList = [
            {name: "csvData", path: "/data/afg.csv", type: "csv"},
            {name: "mapData", path: "/data/afghanistan.json", type: 'json'},
        ]
    }

    rowConverter = function(d, i) {
        var parseTime  = d3.timeParse("%d-%m-%Y") ;  

        if(typeof d.date == 'string'){
                // var parse = d3.timeParse("%d-%m-%Y");
                d.date = parseTime(d.date);
            }
            
        return {dataset: d.dataset, 
                event: d.event,
                date: d.date,
                latitude: d.latitude,
                longitude: d.longitude,
                actor_tax: d.actor_tax,
                event_tax: d.event_tax,
                prec_tax: d.prec_tax,
                event_name: d.event_name,
            };
    }

    loadData = function() {
        return Promise.all(this.fileList.map(d => d.type=='csv'?d3.csv(d.path, this.rowConverter):d3.json(d.path, this.featureConverter)))
    }

    addData = function(dataNew) {
        // Convert array of data to more easily accessible object
        this.fileList.map((d, i) => {
            // To nest data in terms of enteries in terms of years
            if (d.name == 'csvData'){
                var nested_data =   d3.nest()
                .key(function(data) { return data.date.getFullYear(); })
                .sortKeys(d3.ascending)
                .key(function(data) { return data.date.getMonth(); })
                .entries(dataNew[i]);
                
                this.data[d.name] = nested_data;

            }
            else{
                this.data[d.name] = dataNew[i];
            }
        })
    }

    featureConverter = function(d, i) {
        debugger;
        return {features: d.features};
    }
}