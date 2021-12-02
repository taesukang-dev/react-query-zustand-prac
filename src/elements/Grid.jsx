import styled from 'styled-components'

const Grid = (props) => {
  const { _onSubmit } = props
  return (
    <>
      <Form onSubmit={_onSubmit} {...props}></Form>
    </>
  )
}

Grid.defaultProps = {
  isFlex: false,
  width: '100%',
  height: '',
  padding: false,
  margin: false,
  background: false,
  zIndex: 0,
  position: '',
  _onSubmit: () => {},
}

const Form = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.margin ? `margin : ${props.margin};` : '')}
  ${(props) =>
    props.background ? `background-color: ${props.background};` : ''}
  ${(props) =>
    props.isFlex
      ? `display: flex; align-items: center; justify-content: center;`
      : ''}
  z-index: ${(props) => props.zIndex};
  position: ${(props) => props.position};
`

export default Grid
