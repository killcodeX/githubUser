import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Bar3D = ({data}) => {

  const chartConfigs = {
    type: "bar3d", 
    width: "100%", 
    height: "400", 
    dataFormat: "json", 
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Forked",
        yAxisName: "Forks",
        xAxisName: "Repos",
        yAxisNameFontSize: '16px',
        xAxisNameFontSize: '16px',     
        theme: "fusion",
        decimals:0,
        paletteColors:'#ff6361, #ffa600, #366EEA, #58508d, #bc5090 '           
      },
      data: data
    }
  };

  return <ReactFC {...chartConfigs} />;
};

export default Bar3D;
