import styled from 'styled-components'

const Plus = (props) => {
  return (
    <>
      <PlusBox onClick={props.onClick}>+</PlusBox>
    </>
  )
}

Plus.defaultProps = {}

const PlusBox = styled.div`
  cursor: pointer;
  position: fixed;
  right: 30%;
  bottom: 20%;
  color: white;
  font-size: 40px;
  text-align: center;
  background-color: #333;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

export default Plus
