// The data manager loads, stores, and filters the data 

class DataManager{
    
    constructor(settingsManager) {
        this.sAll = settingsManager;
        this.data = {};
<<<<<<< HEAD
        this.subset = {};
        this.fileList = [
            // {name: "csvData", path: "/data/afg.csv", type: "csv"},
            {name: "csvData", path: "/data/CEM_data.csv", type: "csv"},
=======
        this.fileList = [
            {name: "csvData", path: "/data/afg.csv", type: "csv"},
>>>>>>> 2f32c8bf0310d43585424c89e1dd5f0884d4df80
            {name: "mapData", path: "/data/afghanistan.json", type: 'json'},
        ]
    }

    rowConverter = function(d, i) {
<<<<<<< HEAD
        var parseTime  = d3.timeParse("%Y-%m-%d %H:%M:%S");  
        // var parseTime  = d3.timeParse("%d-%m-%Y") ; 
        var event_type;
        
        
        //Convert timestamp type from String to Time
        if(typeof d.timestamp == "string"){
                // var parse = d3.timeParse("%d-%m-%Y");
                d.timestamp = parseTime(d.timestamp);
            }
        
        /* Use this block of code in case data preprocessing is not performed*/
        //Convert different kinds of  events under a single category- Turn In adn side as Friend
        // if(d.kind == "Turn In" || d.kind == "Evidence Turn-in/Received"|| d.kind == "ERW/Turn-in" ){
        //     d.kind = "Turn In";
        //     d.side = "FRIEND";
        // }

        // //Creation of new column as event type with values
        // event_type = d.kind.concat("-", d.side);

        // if(event_type == "Turn In-FRIEND"){
        //     event_type = "gb_assist";
        // }

        // if(event_type == "Indirect Fire-FRIEND" || event_type == "Close Air Support-FRIEND"){
        //     event_type = "br_indis";
        // }
        
        // if(event_type == "Direct Fire-FRIEND"){
        //     event_type = "br_sel";
        // }

        // if(event_type == "Indirect Fire-ENEMY" || event_type == "Mine Strike-ENEMY"){
        //     event_type = "rb_indis";
        // }

        // if(event_type == "Direct Fire-ENEMY"){
        //     event_type = "rb_sel";
        // }

        return {reportkey: d.reportkey, 
                kind: d.kind,
                category: d.category,
                side: d.side,
                civcas: d.civcas,
                lat: d.lat,
                long: d.long,
                timestamp: d.timestamp,
                event_type: d.event_type,
                dist_pak: d.dist_pak,
                dist_kabul: d.dist_kabul,
                elevation: d.elevation,
                population: d.population,
                lineofsight: d.lineofsight,
                gecon: d.gecon,
                pashtun: d.pashtun,
                hazara: d.hazara,
                matches: d.matches,
=======
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
>>>>>>> 2f32c8bf0310d43585424c89e1dd5f0884d4df80
            };
    }

    loadData = function() {
        return Promise.all(this.fileList.map(d => d.type=='csv'?d3.csv(d.path, this.rowConverter):d3.json(d.path, this.featureConverter)))
    }

    addData = function(dataNew) {
        // Convert array of data to more easily accessible object
        this.fileList.map((d, i) => {
            // To nest data in terms of enteries in terms of years
<<<<<<< HEAD
            if (d.name == "csvData"){
                
                /* Use this block of code in case data preprocessing is not performed*/
                //Take subset of data with selected event_types
                // this.subset = dataNew[i]
                //         .filter(function(s){ 
                //             return  s.event_type == "gb_assist"||
                //                     s.event_type == "br_indis" ||
                //                     s.event_type == "br_sel" ||
                //                     s.event_type == "rb_indis" ||
                //                     s.event_type == "rb_sel"; 
                //         });
                
                //Nest the dat as per years and then months

                var priority_order = ["0", "1", "2", "3", "4", "5", "6" ,"7" ,"8", "9", "10", "11"];

                var nested_data =   d3.nest()
                .key(function(data) { return data.timestamp.getFullYear(); })
                .sortKeys(d3.ascending)
                .key(function(data) { return data.timestamp.getMonth(); })
                .sortKeys(function(a,b) { return priority_order.indexOf(a) - priority_order.indexOf(b); })
=======
            if (d.name == 'csvData'){
                var nested_data =   d3.nest()
                .key(function(data) { return data.date.getFullYear(); })
                .sortKeys(d3.ascending)
                .key(function(data) { return data.date.getMonth(); })
>>>>>>> 2f32c8bf0310d43585424c89e1dd5f0884d4df80
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