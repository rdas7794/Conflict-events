// The events manager creates the event listeners and defines the functions which are called in response to the different events.

class EventManager {

    addListeners = function() {
        const events = this.events;
        const sAll = this.settings;

        if(sAll.general.clicked == false){
            d3.select('#container-main')
            .select('#container-map')
            .selectAll('.map')
            .on('click', function(d){
                events.enlarge(d, this);
            })
            .on("mouseover", function() { 
                events.mouseover(this);
            })
            .on("mouseout", function() {
                events.mouseout(this);
            });
        }

        d3.select('#container-main')
            .select('#container-map')
            .select('#multiple-map')
            .select('#reset-button')
            .on('click', function(){
                events.reset();
            })
        
    }

    constructor(sAll, dataManager, c) {
        this.settings = sAll;
        this.events = {
            enlarge: function(datum, node){
                // console.log(datum);
                sAll.general.clicked = true;
                d3.select(node).call(c.multiple_map.update);
            },

            reset: function(){
                sAll.general.clicked = false;
                d3.select('#container-main').data([dataManager.data]).call(c.multiple_map.update);   
            },

            mouseover: function(node){
                d3.select(node) 
                .selectAll('.map-path')
                .transition()
                .delay(10)
                .style("fill", "grey");
            },

            mouseout: function(node){
                d3.select(node)
                    .selectAll('.map-path')
                    .transition()
                    .delay(10)
                    .style("fill", "black");
            },
        }
    }

}