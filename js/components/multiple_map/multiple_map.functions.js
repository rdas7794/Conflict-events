// Here, all the internal helper functions from component_a are stored to keep the script for the component as slim as possible.
// Since sg, s, si, and f are passed, the functions can be written exactly the same as they would be inside the main script of component_a.component.js.

function getmultiple_mapFunctions(sg, s, si, f) {
    const fi = {};

    fi.render = function(month_data, geo, context){
        var data = month_data.values;
        
        var context2;
        if(sg.clicked == false && si.first_time_clicked == false){
            context2 = d3.select(context)
                .append('svg')
                .attr("width", 100)
                .attr("height", 100)
                .attr('class', 'map')
                .append('g');
            
        }
        else{
            context2 = d3.select(context)
                        .select('g');
        }
           
        
        var color = d3.scaleOrdinal()
                    .domain(["Violence sig", "Violence ged", "Violence gtd" ])
                    .range([ "green", "red", "yellow"]);
        
    
        context2.selectAll('path')
            .data([{year: month_data.year, month: month_data.key, geoData: geo.features}])
            .join(
                enter => enter
                    .append('path')
                    .attr('d',d => si.path(d.geoData[0]))
                    .attr('class', 'map-path')
                    .style('fill','black'),

                update => update
                    .attr('d',d => si.path(d.geoData[0])),
                
                exit => exit.remove()
            );

            si.showCircles = false;
			// si.transformedData = ...;

			context2.selectAll('circle')
				.data(data)
				.join(
					enter => enter
						.append('circle')
						.attr('cx', d => si.projection([d.longitude, d.latitude])[0])
						.attr('cy', d => si.projection([d.longitude, d.latitude])[1])
                        .attr('r', sg.clicked == true ?4 : 2)
                        .attr('class', 'datapoints'),
                        
                    update => update
                        .attr('cx', d => si.projection([d.longitude, d.latitude])[0])
                        .attr('cy', d => si.projection([d.longitude, d.latitude])[1])
                        .attr('r',sg.clicked == true ?4 : 2),

					exit => exit.remove()
				)
                .style('fill', d => color(d.event_name))
                .append("title")			//Simple tooltip
                .text(function(d) {
                    return d.dataset;
                });
    }
    

    return fi;
} 

