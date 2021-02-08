//The structure of components follows mainly the one described in https://bost.ocks.org/mike/chart/

function multiple_map(sg, s, f) {
    /*
    "s" is used for the "settings" from the settingsManager corresponding to component_a,
    "sg" is used for the general settings from the settingsManager,
    and "si" is used for the internal settings that are not to be accessed from the outside.
    Correspondingly, "f" are the general helper functions while "fi" are the internal helper functions.
    The internal helper functions where moved to an external script to keep the code as slim as possible.
    */
    const si = {};
    const fi = getmultiple_mapFunctions(sg, s, si, f);

    /*
    For development, append variables to s and f here and move them to the respective managers later
    s.width = 500;
    ...
    */

    function component(selection) {
        // Create permanent stuff here and anything that potentially needs to be updated in "component.update"
        // This function is only called when initially building the component, later on only the update function will be called. 
        selection.each(function(data, idx) {
            if (!data) {return;}

        //****************  Setting variables for constucting maps **********8***/
            si.projection = d3.geoMercator().scale([350]).translate([-370, 270]);

            si.path = d3.geoPath().projection(si.projection);

            // Select the svg element and initializing map and csv data
            si.svg = d3.select(this);

            //Selecting the checkboxes
            si.checkboxes = d3.select(this.parentNode)
                                .select("#checkboxes");

            si.mapData = data.mapData;

            si.csvData = data.csvData;

            // For initial loading
            si.first_time_clicked = false;  

            // Initialization of variables for slider data
            si.month_data = [01, 02, 03, 04, 05, 06, 07 ,08 ,09, 10, 11, 12];

            si.year_data = si.csvData.map(function(d){
                return d.key;
            })

            si.selected_year = si.year_data[0];

            si.selected_month = 01;

            si.default_year = si.year_data[0];

            si.default_month = si.selected_month;

        /***************Creation of tables ************************/

            si.tableHeads = si.svg.append("thead").selectAll("th")
                        .data(["", "JAN", "FEB", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"])
                        .enter()
                        .append("th")
                        .attr("class", "col-header")
                        .text(function(d) { return d; });
                        
            si.tableRows = si.svg.selectAll("tr")
                        .data(data.csvData, function(d) { return d.key; })
                        .enter()
                        .append("tr"); 

            si.rowsHeaders = si.tableRows.append("td")
                        .attr("class", "row-header")
                        .text(function(d) { return d.key; });

            si.tableData = si.tableRows.selectAll(".map")
                        .data(function(d) { return d.values.map(e => {e.year = d.key; return e}); })
                        .enter()
                        .append("td");

            si.canvases = si.tableData.append("div")
                        .each(function(d){fi.render(d,si.mapData,this)});

        /****************Creation of Slider**********************************/    
            si.slider = si.svg
                    .append("div")
                    .attr("class","slider");

            // Creation of slider for year data                
            si.years_slider = si.slider
                            .append("div")
                            .attr("class","years-slider")
                            .style("display","table-cell");

            si.years_slider.value_time = si.years_slider
                                        .append("div")
                                        .attr("class","years-valuetime")
                                        .append("p")
                                        .attr("id","years-value-time");

            si.years_slider.slider_time = si.years_slider
                                            .append("div")
                                            .attr("class","years-slidertime")
                                            .append("div")
                                            .attr("id","years-slider-time");
            
            si.years_sliderTime = d3
                                .sliderBottom()
                                .min(d3.min(si.year_data))
                                .max(d3.max(si.year_data))
                                .step(1)
                                .width(300)
                                .tickFormat(d3.format("1"))
                                .tickValues(si.year_data)
                                .default(si.default_year)
                                .on("onchange", val => {
                                    // Update the map with selected slider year and month
                                    si.selected_year = val;

                                    si.year_value = si.csvData.filter(function(d){
                                        return d.key == si.selected_year;
                                    })
                                    
                                    si.month_value = si.year_value.map(function(d){
                                        values = d.values.filter(function(e){
                                            return e.key == si.selected_month-1;
                                        })
                                        return values;
                                    })

                                    d3.select("p#years-value-time")
                                    .text("Selected year:"+val);

                                    sg.clicked = true;

                                    d3.select(si.clicked_map)
                                    .data([si.month_value[0][0]])
                                    .call(component.update);

                                });
        
            si.gTime1 = d3
                        .select("div#years-slider-time")
                        .append("svg")
                        .attr("width", 500)
                        .attr("height", 100)
                        .append("g")
                        .attr("transform", "translate(30,30)");
        
            si.gTime1
            .call(si.years_sliderTime);
        
            d3.select("p#years-value-time")
            .text("Selected Year:"+si.years_sliderTime.value());

            //Creation of month slider
            si.months_slider = si.slider
                            .append("div")
                            .attr("class","months-slider")
                            .style("display","table-cell");

            si.months_slider.value_time = si.months_slider
                                        .append("div")
                                        .attr("class","col-sm-2")
                                        .append("p")
                                        .attr("id","months-value-time")
                                        .style("display","table-cell");
            

            si.months_slider.slider_time = si.months_slider
                                        .append("div")
                                        .attr("class","col-sm")
                                        .append("div")
                                        .attr("id","months-slider-time")
                                        .style("display","table-cell");
            
            si.months_sliderTime = d3
                                .sliderBottom()
                                .min(d3.min(si.month_data))
                                .max(d3.max(si.month_data))
                                .step(1)
                                .width(300)
                                .tickValues([01, 02, 03, 04, 05, 06, 07 ,08 ,09, 10, 11, 12])
                                .default(si.default_month)
                                .on("onchange", val => {
                                    // Update the map with selected slider year and month
                                    si.selected_month = val;

                                    si.year_value = si.csvData.filter(function(d){
                                        return d.key == si.selected_year;
                                    })
                                    
                                    si.month_value = si.year_value.map(function(d){
                                        values = d.values.filter(function(e){
                                            return e.key == si.selected_month-1;
                                        })
                                        return values;
                                    })

                                    d3.select("p#months-value-time")
                                    .text("Selected month:"+val);

                                    sg.clicked = true;

                                    d3.select(si.clicked_map)
                                    .data([si.month_value[0][0]])
                                    .call(component.update);

                                    // fi.update();
                                });

            si.gTime = d3
                    .select("div#months-slider-time")
                    .append("svg")
                    .attr("width", 500)
                    .attr("height", 100)
                    .append("g")
                    .attr("transform", "translate(30,30)");
        
            si.gTime.call(si.months_sliderTime);
        
            d3.select("p#months-value-time")
            .text("Selected month:"+si.months_sliderTime.value());

        /**************Creation of a reset button *********************/
        
            si.button = si.slider
                        .selectAll("#reset-button")
                        .data([0])
                        .join(
                            enter => enter
                                .append("button:button")
                                .attr("id", "reset-button")
                                .attr("class", "tool-button")
                                .text("Reset")
                        );

            d3.select(".loading-text").remove();

            
        })

        // Update DOM
        component.update(selection);
    }

    component.update = function(selection) {
        selection.each(function(data, idx) {
            if (!data) {return;}

            if (sg.clicked == false){
                si.projection = d3.geoMercator().scale([350]).translate([-370, 270]);

                si.path = d3.geoPath().projection(si.projection);

                //Setting the visibility of table data
                si.tableData
                .style("display", "table-cell")

                // Setting the visibilty to visible
                si.canvases
                .selectAll(".map")
                .transition()
                .delay(10)
                .style("display", "block")

                // Table headers visbile
                si.svg
                .selectAll(".col-header")
                .style("display", "table-cell")

                si.svg
                .selectAll(".row-header")
                .style("display", "table-cell")

                //Setting the checkbox as checked while resetting
                si.checkboxes
                .selectAll(".checkbox")
                .property("checked","true");

                //Setting the projection of clicked map back to normal
                d3.select(si.clicked_map)
					.transition()
					.delay(100)
                    .attr("width", s.width)
                    .attr("height", s.height)//;
                    .each(function(d){fi.render(si.clicked_map_data,si.mapData,si.clicked_map)});

                fi.hide_elements();

            }
            else{
                //Map clicked
                si.clicked_map = this;
                si.clicked_map_data = data;
                si.first_time_clicked = true;

                //Set table data as none
                si.tableData
                .style("display", "none")

                // Set display of all maps as none
                si.canvases
                .selectAll(".map")
                .transition()
                .delay(100)
                .style("display", "none");

                //Set table headers as hidden
                si.svg
                .selectAll(".col-header")
                .style("display", "none");

                si.svg
                .selectAll(".row-header")
                .style("display", "none");

                //Scaling
                si. projection = d3.geoMercator()						
                                .scale([1800])
                                .center([60.7100, 30.9391])
                                .translate([400, 350]);
                            
                si.path = d3.geoPath().projection(si.projection);

                //Show the required DOM elements
                fi.show_elements();

                //Setting the checkbox as checked while resetting
                // si.checkboxes
                // .selectAll(".checkbox")
                // .property("checked","true");

                //Set the selected component as visibile
                d3.select(si.clicked_map)
                    .transition()
                    .duration(500)
                    .delay(100)
                    .style("display", "block")
                    .attr("align","center")
                    .attr("width", sg.width )
                    .attr("height", sg.height )
                    .each(function(d){fi.render(data,si.mapData,si.clicked_map)});
                
                // fi.update();

                // Checkboxes
                d3.select("#container-main")
                .select("#container-map")
                .selectAll(".checkbox")
                .on("change", function(){
                    fi.update();
                })
        
                    
            }

        })
    }

    // The getters and setters described in #Reconfiguration from https://bost.ocks.org/mike/chart/ 
    f.createGettersSetters(component, s);

    return component;
}