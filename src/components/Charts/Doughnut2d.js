import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Doughnut2d = ({data}) => {
  const chartConfigs = {
    type: "doughnut2d", 
    width: "100%", 
    height: "400", 
    dataFormat: "json", 
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Stars Per Language",     
        theme: "candy",
        decimals:0,
        doughnutRadius: '45%',
        showPercentValues: 0,
        paletteColors:'#ff6361, #ffa600, #003f5c, #58508d, #bc5090 '              
      },
      data:data,
    }
  };
    return <ReactFC {...chartConfigs} />;
};

export default Doughnut2d;
