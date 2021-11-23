import styled from 'styled-components'
const Text = (props) => {
  const { children, bold, color, size, label } = props
  const styles = { bold, color, size }
  return (
    <>
      <Label>{label}</Label>
      <Line {...styles}>{children}</Line>
    </>
  )
}

Text.defaultProps = {
  label: '',
  children: null,
  bold: false,
  color: '#333',
  size: '16px',
}

const Line = styled.p`
  margin: 0;
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? '600' : 400)};
`
const Label = styled.label`
  font-size: small;
  text-decoration: underline;
`

export default Text
