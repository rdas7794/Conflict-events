//The structure of components follows mainly the one described in https://bost.ocks.org/mike/chart/

function map(sg, s, f) {
    /*
    "s" is used for the "settings" from the settingsManager corresponding to component_a,
    "sg" is used for the general settings from the settingsManager,
    and "si" is used for the internal settings that are not to be accessed from the outside.
    Correspondingly, "f" are the general helper functions while "fi" are the internal helper functions.
    The internal helper functions where moved to an external script to keep the code as slim as possible.
    */
    const si = {};
    const fi = getmapFunctions(sg, s, si, f);

    /*
    For development, append variables to s and f here and move them to the respective managers later
    s.width = 550;
    ...
    */

    function component(selection) {
        // Create permanent stuff here and anything that potentially needs to be updated in "component.update"
        // This function is only called when initially building the component, later on only the update function will be called. 
        selection.each(function(data, idx) {
            if (!data) {return;}
            // Select the svg element
            si.svg = d3.select(this)
                .attr('width', sg.width)
                .attr('height', sg.height);
            // Append group for the content of the svg
            si.gAll = si.svg.append('g')
                .attr('class', 'container-map');

            si.projection = d3.geoMercator().scale(800).translate([-600,650]);

            si.path = d3.geoPath().projection(si.projection);
        })
        // Update DOM
        component.update(selection);
    }

    component.update = function(selection) {
        // Map data displayed here
        selection.each(function(data, idx) {
            if (!data.mapData) {return;}
            si.gAll.selectAll('path')
                .data(data.mapData.features)
                .join(
                    enter => enter
                        .append('path')
                        .attr('d', si.path)
                        .style('fill','steelblue')
                );
        })
        
        // Data points of map data displayed here
        selection.each(function(data, idx) {
            if (!data.csvData) {return;}
            si.gAll.selectAll('circle')
                .data(data.csvData)
                .join(
                    enter => enter
                        .append('circle')
                        .attr('cx', function(d) {
                            return si.projection([d.longitude, d.latitude])[0];
                        })
                        .attr('cy', function(d) {
                            return si.projection([d.longitude, d.latitude])[1];
                        })
                        .attr('r', 1)
                        .style("fill", "yellow")
                        .style("stroke", "gray")
                        .style("stroke-width", 0.25)
                        .style("opacity", 0.75)
                        .append("title")			//Simple tooltip
                        .text(function(d) {
                                return d.dataset;
                        })
                );
        })
    }

    // The getters and setters described in #Reconfiguration from https://bost.ocks.org/mike/chart/ 
    f.createGettersSetters(component, s);

    return component;
}