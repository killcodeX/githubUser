import React from 'react';
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Pie3D = ({data}) => {

const chartConfigs = {
  type: "pie3d", 
  width: "400", 
  height: "400", 
  dataFormat: "json", 
  dataSource: {
    // Chart Configuration
    chart: {
      caption: "Most Languages Used",     
      theme: "fusion",
      decimals:0,
      pieRadius: '45%',
      paletteColors:'#ff6361, #ffa600, #003f5c, #58508d, #bc5090 '              
    },
    data: data
  }
};
  return <ReactFC {...chartConfigs} />;
};

export default Pie3D;
