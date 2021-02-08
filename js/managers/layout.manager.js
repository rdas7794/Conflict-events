// In the layout manager, all changes to the overall appearance of the app are managed. 
// The initial creation of the different containers, however, happens inside "index.html".

class LayoutManager{
    
    constructor(settingsManager) {
        this.sAll = settingsManager;
    }

    addDataToComponents = function(data, components) {
        // Init SVG
<<<<<<< HEAD
        // const svgmap = d3.select("#container-map")
=======
        // const svgmap = d3.select('#container-map')
>>>>>>> 2f32c8bf0310d43585424c89e1dd5f0884d4df80
        //     .selectAll("#svg-map")
        //     .data([0])
        //     .join(
        //         enter => enter
<<<<<<< HEAD
        //             .append("svg:svg")
        //             .attr("id", "svg-map")
=======
        //             .append('svg:svg')
        //             .attr('id', 'svg-map')
>>>>>>> 2f32c8bf0310d43585424c89e1dd5f0884d4df80
        //             .style("position", "absolute")
        //     );

        // Draw component
        // svgmap.data([data]).call(components.map);

<<<<<<< HEAD
        const svgmultiple_map = d3.select("#container-map")
=======
        const svgmultiple_map = d3.select('#container-map')
>>>>>>> 2f32c8bf0310d43585424c89e1dd5f0884d4df80
            .selectAll("#multiple-map")
            .data([0])
            .join(
                enter => enter
<<<<<<< HEAD
                    .append("table:table")
                    .attr("id", "multiple-map")
=======
                    .append('table:table')
                    .attr('id', 'multiple-map')
>>>>>>> 2f32c8bf0310d43585424c89e1dd5f0884d4df80

            );

        svgmultiple_map.data([data]).call(components.multiple_map);

    };
    
    // toggleVisibility = function(containerName) {
<<<<<<< HEAD
    //     const container = d3.select("#"+containerName)
    //     if (container.style("display") === "none") {
    //         container.style("display", "block");
    //     }
    //     else {
    //         container.style("display", "none");
=======
    //     const container = d3.select('#'+containerName)
    //     if (container.style('display') === 'none') {
    //         container.style('display', 'block');
    //     }
    //     else {
    //         container.style('display', 'none');
>>>>>>> 2f32c8bf0310d43585424c89e1dd5f0884d4df80
    //     }
    // };
}