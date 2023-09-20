import Highcharts from 'highcharts';
import PieChart from 'highcharts-react-official';
import { FC } from 'react';

interface IHighchartsPieChartProps {
  options?: {
    series?: any[];
  }
}


const HighchartsPieChart = (props) => {

  const {
    options={}
  } = props;

  const defaultOptions = {
    chart: {
      backgroundColor: '#202020',
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      height: '200px',
    },
    credits: {
      enabled: false
    },
    title: {
      text: '',
      align: 'left'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      data: [{
        name: 'Chrome',
        y: 70.67,
        sliced: true,
        selected: true
      }, {
        name: 'Edge',
        y: 14.77
      }]
    }]
  }


  return (
    <PieChart highcharts={Highcharts} options={{ ...defaultOptions, ...options }} />
  )
}

export default HighchartsPieChart