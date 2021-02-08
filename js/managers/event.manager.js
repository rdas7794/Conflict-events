// The events manager creates the event listeners and defines the functions which are called in response to the different events.

class EventManager {

    addListeners = function() {
        const events = this.events;
        const sAll = this.settings;

        if(sAll.general.clicked == false){
            d3.select("#container-main")
            .select("#container-map")
            .selectAll(".map")
            .on("click", function(d){
                events.enlarge(d, this);
            })
            .on("mouseover", function() { 
                events.mouseover(this);
            })
            .on("mouseout", function() {
                events.mouseout(this);
            });
        }

        d3.select("#container-main")
            .select("#container-map")
            .select("#multiple-map")
            .select("#reset-button")
            .on("click", function(){
                events.reset();
            })
        
        //Slider
        // d3.select("#container-main")
        //     .select("div#months-slider-time")
        //     .on("click", function(){
        //         events.updateslider();
        //     })
        
        
        // d3.select("#container-main")
        //     .select("div#years-slider-time")
        //     .select(".parameter-value")
        //     .select("text")
        //     .on("click", function(){
        //         console.log(this, d3.select(this));
        //         // const a = d3.select(this).select("text");
        //         // console.log(a.property);
        //         events.updateslider();
        //     })

        // Checkboxes
        // d3.select("#container-main")
        // .select("#container-map")
        // .selectAll(".checkbox")
        // .on("change", function(){
        //     events.update(this);
        // })
        
        
    }

    constructor(sAll, dataManager, c) {
        this.settings = sAll;
        this.datum;
        this.node;
        this.events = {
            enlarge: function(datum, node){
                this.datum = datum;
                this.node = node;
                sAll.general.clicked = true;
                d3.select(node).call(c.multiple_map.update);
            },

            reset: function(){
                sAll.general.clicked = false;
                d3.select("#container-main").data([dataManager.data]).call(c.multiple_map.update);   
            },

            mouseover: function(node){
                d3.select(node) 
                .selectAll(".map-path")
                .transition()
                .delay(10)
                .style("fill", "grey");
            },

            mouseout: function(node){
                d3.select(node)
                    .selectAll(".map-path")
                    .transition()
                    .delay(10)
                    .style("fill", "black");
            },

            // updateslider: function(){
            //     console.log(this);
            //     // const cb = d3.select(node);
            //     // const grp = cb.property("value");
            //     // // console.log(cb, grp, cb.property("checked"));

            //     // sAll.general.clicked = true;
            //     // d3.select(this.node).call(c.multiple_map.update);
            // }
        }
    }

}