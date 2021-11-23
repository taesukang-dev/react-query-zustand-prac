import styled from 'styled-components'

const Input = (props) => {
  return (
    <>
      <InputBox />
    </>
  )
}
Input.defaultProps = {
  ref: '',
}

const InputBox = styled.input`
  width: 100%;
  height: 50px;
`

export default Input
