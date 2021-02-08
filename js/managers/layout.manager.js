// In the layout manager, all changes to the overall appearance of the app are managed. 
// The initial creation of the different containers, however, happens inside "index.html".

class LayoutManager{
    
    constructor(settingsManager) {
        this.sAll = settingsManager;
    }

    addDataToComponents = function(data, components) {
        // Init SVG
        // const svgmap = d3.select("#container-map")
        //     .selectAll("#svg-map")
        //     .data([0])
        //     .join(
        //         enter => enter
        //             .append("svg:svg")
        //             .attr("id", "svg-map")
        //             .style("position", "absolute")
        //     );

        // Draw component
        // svgmap.data([data]).call(components.map);

        const svgmultiple_map = d3.select("#container-map")
            .selectAll("#multiple-map")
            .data([0])
            .join(
                enter => enter
                    .append("table:table")
                    .attr("id", "multiple-map")

            );

        svgmultiple_map.data([data]).call(components.multiple_map);

    };
    
    // toggleVisibility = function(containerName) {
    //     const container = d3.select("#"+containerName)
    //     if (container.style("display") === "none") {
    //         container.style("display", "block");
    //     }
    //     else {
    //         container.style("display", "none");
    //     }
    // };
}