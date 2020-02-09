import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'

import Highchart from 'components/Highchart'

import useChartOptions from './useChartOptions'

const SpeedsChart = forwardRef(({ points = [], zeroWindPoints = [] }, ref) => {
  const options = useChartOptions(points, zeroWindPoints)

  return <Highchart ref={ref} options={options} />
})

SpeedsChart.displayName = 'SpeedsChart'

SpeedsChart.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      flTime: PropTypes.number.isRequired,
      vSpeed: PropTypes.number.isRequired,
      hSpeed: PropTypes.number.isRequired,
      altitude: PropTypes.number.isRequired
    })
  ),
  zeroWindPoints: PropTypes.arrayOf(
    PropTypes.shape({
      flTime: PropTypes.number.isRequired,
      hSpeed: PropTypes.number.isRequired,
      altitude: PropTypes.number.isRequired
    })
  )
}

export default SpeedsChart