import styled from 'styled-components'

const Button = (props) => {
  const { children } = props

  return (
    <>
      <AddButton onClick={props.onClick}>{children}</AddButton>
    </>
  )
}

Button.defaultProps = {
  children: '추가하기',
}

const AddButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  width: 100%;
  height: 40px;
`

export default Button
