// Here, all the internal helper functions from component_a are stored to keep the script for the component as slim as possible.
// Since sg, s, si, and f are passed, the functions can be written exactly the same as they would be inside the main script of component_a.component.js.

function getmultiple_mapFunctions(sg, s, si, f) {
    const fi = {};

    fi.render = function(month_data, geo, context){
        fi.data = month_data.values;
        fi.context2;
        
        // Logic for first time load
        if(sg.clicked == false && si.first_time_clicked == false){
            fi.context2 = d3.select(context)
                        .append("svg")
                        .attr("width", 100)
                        .attr("height", 100)
                        .attr("class", "map")
                        .append("g");
            
        }
        else{
            fi.context2 = d3.select(context)
                        .select("g");
        }

        // Color 
        fi.color = d3.scaleOrdinal()
                    .domain(["TRUE", "FALSE"])
                    // .range(d3.schemeSet3);
                    .range([ "yellow", "red"]);
        
    
        fi.map = fi.context2.selectAll("path")
            .data([{year: month_data.year, month: month_data.key, geoData: geo.features}])
            .join(
                enter => enter
                    .append("path")
                    .attr("d",d => si.path(d.geoData[0]))
                    .attr("class", "map-path")
                    .style("fill","black"),

                update => update
                    .attr("d",d => si.path(d.geoData[0])),
                
                exit => exit.remove()
            );

        fi.datapoints = fi.context2.selectAll("circle")
            .data(fi.data)
            .join(
                enter => enter
                    .append("circle")
                    .attr("cx", d => si.projection([d.long, d.lat])[0])
                    .attr("cy", d => si.projection([d.long, d.lat])[1])
                    .attr("r", sg.clicked == true ?4 : 2)
                    .attr("class", d=> d.matches)
                    .style("fill", d => fi.color(d.matches))
                    .append("title")			//Simple tooltip
                    .text(function(d) {
                            return d.matches;
                        }),
                    
                update => update
                    .attr("cx", d => si.projection([d.long, d.lat])[0])
                    .attr("cy", d => si.projection([d.long, d.lat])[1])
                    .attr("r",sg.clicked == true ?4 : 2)
                    .attr("class", d=> d.matches)
                    .style("fill", d => fi.color(d.matches))
                    .select("title")
                    .text(function(d) {
                        return d.matches;
                    }),			

                exit => exit.remove()
            );

        fi.update();

        }

    fi.update = function(){

        d3.select("#container-main")
        .select("#container-map")
        .selectAll(".checkbox")
        .each(function(){

            cb = d3.select(this);
            grp = cb.property("value");

            if(cb.property("checked")){
                fi.context2
                .selectAll("."+grp)
                .style("opacity", 1);
            }
            else{
               
                fi.context2
                .selectAll("."+grp)
                .style("opacity", 0); 
            }
        })
    
    }

    fi.hide_elements = function(){
        // Hide Months and Years Slider
        si.months_slider
        .style("display","none");

        si.months_slider.value_time
        .style("display","none");

        si.months_slider.slider_time
        .style("display","none");

        si.years_slider
        .style("display","none");

        si.years_slider.value_time
        .style("display","none");

        si.years_slider.slider_time
        .style("display","none");

        //Hide checkboxes
        si.checkboxes
        .style("display","none");

    }

    fi.show_elements = function(){
        //Set the selected table data as visible
        d3.select(si.clicked_map.parentNode.parentNode)
        .style("display", "table-cell");

        //Display slider months and years displayed
        si.months_slider
        .style("display","table-cell");

        si.months_slider.value_time
        .style("display","table-cell");

        si.months_slider.slider_time
        .style("display","table-cell");

        si.years_slider
        .style("display","table-cell");

        si.years_slider.value_time
        .style("display","table-cell");

        si.years_slider.slider_time
        .style("display","table-cell");

        // Display checkboxes
        si.checkboxes
        .style("display","block");
    }

    return fi;
} 

