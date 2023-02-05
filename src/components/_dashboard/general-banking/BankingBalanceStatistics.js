import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Box } from '@mui/material';
//
// import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 'Year',
    data: [
      { name: 'Current Year', data: [76, 42, 29, 41, 27, 138, 117, 86, 63] },
      { name: 'Previous Year', data: [80, 55, 34, 114, 80, 130, 15, 28, 55] }
    ]
  }
];

export default function BankingBalanceStatistics() {
  const chartOptions = merge(
    // BaseOptionChart(),
    {
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
      },
      colors: ['#796621', '#8F8F8F', '#9C27B0'],
      tooltip: {
        y: {
          formatter: (val) => `$${val}`
        }
      }
    });

  return (
    <>
      {
        CHART_DATA.map((item) => (
          <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
            <ReactApexChart type="bar" series={item.data} options={chartOptions} height={364} />
          </Box>
        ))
      }
    </>
  );
}
