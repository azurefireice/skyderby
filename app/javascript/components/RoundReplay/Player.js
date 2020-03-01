import React, { useState, useEffect, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'

import { drawChart, updateChart } from './altitudeChart'
import { drawCards, updateCardNumbers } from './cards'
import processPoints from './processPoints'
import { drawHeight, drawWidth } from './constants'
import getPathsUntilTime from './getPathsUntilTime'
import { Canvas } from './elements'

const Player = ({ discipline, rangeFrom, rangeTo, group = [], playing }) => {
  const [playerPoints, setPlayerPoints] = useState()

  const canvasRef = useRef()
  const playerTime = useRef()
  const prevFrameTime = useRef()
  const requestId = useRef()

  useEffect(() => {
    if (group.length === 0) return

    setPlayerPoints(group.map(data => processPoints(discipline, rangeTo, data)))
  }, [group, discipline, rangeTo])

  const drawFrame = useCallback(
    time => {
      if (!canvasRef.current) return

      playerTime.current = playerTime.current + (time - prevFrameTime.current) / 1000
      const ctx = canvasRef.current.getContext('2d')

      const paths = playerPoints.map(currentPoints =>
        getPathsUntilTime(currentPoints, playerTime.current)
      )

      updateCardNumbers(ctx, paths, discipline)
      updateChart(ctx, paths, rangeFrom, rangeTo)

      prevFrameTime.current = performance.now()
      requestId.current = requestAnimationFrame(drawFrame)
    },
    [discipline, playerPoints, rangeFrom, rangeTo]
  )

  useEffect(() => {
    if (playing) {
      const canvas = canvasRef.current

      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, drawWidth, drawHeight)
      drawChart(ctx, rangeFrom, rangeTo)
      drawCards(ctx, group)

      playerTime.current = playerTime.current || 0
      prevFrameTime.current = performance.now()
      requestId.current = requestAnimationFrame(drawFrame)
    } else {
      cancelAnimationFrame(requestId.current)
    }
  }, [playing, drawFrame, rangeFrom, rangeTo, group])

  useEffect(() => {
    if (group.length === 0) return

    const ctx = canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, drawWidth, drawHeight)

    drawChart(ctx, rangeFrom, rangeTo)
    drawCards(ctx, group)
  }, [group, rangeFrom, rangeTo])

  return <Canvas ref={canvasRef} width={drawWidth} height={drawHeight} />
}

Player.propTypes = {
  discipline: PropTypes.oneOf(['distance', 'speed', 'time']),
  rangeFrom: PropTypes.number,
  rangeTo: PropTypes.number,
  playing: PropTypes.bool.isRequired,
  group: PropTypes.array
}

export default Player
