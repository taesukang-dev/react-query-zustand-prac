import _ from 'lodash'
import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const InfiScroll = (props) => {
  const dispatch = useDispatch()
  const { children, callNext, is_next } = props
  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window
    const { scrollHeight } = document.body

    if (scrollHeight - innerHeight - document.documentElement.scrollTop < 250) {
      callNext()
    }
  }, 300)

  const handleScroll = useCallback(_handleScroll, [_handleScroll])

  useEffect(() => {
    if (is_next) {
      window.addEventListener('scroll', handleScroll)
    } else {
      window.removeEventListener('scroll', handleScroll)
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll, is_next])

  return <React.Fragment>{props.children}</React.Fragment>
}

InfiScroll.defaultProps = {
  children: null,
  callNext: () => {},
}

export default InfiScroll
