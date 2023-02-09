import styled from 'styled-components'
import ErrorImg from '../../assets/404.svg'
import colors from '../../utiles/style/color'

const ErrorWrapper = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  align-items: center;
`

const TopMessage = styled.h1`
  font-weight: 300;
`

const BottomMessage = styled.h2`
  font-weight: 300;
  color: ${colors.secondary};
`

const ErrorImage = styled.img`
  max-width: 800px;
`

function Error() {
  return (
    <ErrorWrapper>
      <TopMessage>Oups...</TopMessage>
      <ErrorImage src={ErrorImg} alt="image" />
      <BottomMessage>Il semblerait qu’il y ait un problème</BottomMessage>
    </ErrorWrapper>
  )
}

export default Error
