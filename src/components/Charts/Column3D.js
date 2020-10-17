import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


const Column3D = ({data}) => {

  const chartConfigs = {
    type: "column3d", 
    width: "100%", 
    height: "400", 
    dataFormat: "json", 
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Popular",
        yAxisName: "Stars",
        xAxisName: "Repos",
        yAxisNameFontSize: '16px',
        xAxisNameFontSize: '16px',     
        theme: "fusion",
        decimals:0,
        paletteColors:'#366EEA, #ff6361, #39F3BB, #58508d, #bc5090 '           
      },
      data: data
    }
  };

  return <ReactFC {...chartConfigs} />;
};

export default Column3D;
