import styled from 'styled-components'

const Button = (props) => {
  const { children, margin, type } = props
  const styles = { margin }

  return (
    <>
      <AddButton {...styles} onClick={props.onClick}>
        {children}
      </AddButton>
    </>
  )
}

Button.defaultProps = {
  children: '추가하기',
  margin: '',
  type: '',
}

const AddButton = styled.button`
  margin: ${(props) => props.margin};
  cursor: pointer;
  outline: none;
  border: none;
  width: 100%;
  height: 40px;
`

export default Button
