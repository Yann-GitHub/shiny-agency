import PropTypes from 'prop-types'
import { useState } from 'react'
import styled from 'styled-components'
import colors from '../../utiles/style/color'
import { useTheme } from '../../utiles/hooks'
import DefaultPicture from '../../assets/profile.png'
import { Component } from 'react'

const CardLabel = styled.span`
  color: ${({ theme }) => (theme === 'light' ? colors.primary : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  padding-left: 15px;
`

const CardTitle = styled.div`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-size: 22px;
  font-weight: normal;
  align-self: center;
  height: 25px;
  display: flex;
  align-items: center;
`

const CardImage = styled.img`
  height: 150px;
  width: 150px;
  align-self: center;
  border-radius: 50%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  border-radius: 30px;
  width: 300px;
  height: 300px;
  &:hover {
    cursor: pointer;
  }
`
// Functional component
// function Card({ label, title, picture }) {
//   const { theme } = useTheme()
//   const [isFavorite, setIsFavorite] = useState(false)
//   const star = isFavorite ? '⭐️' : ''

//   return (
//     <CardWrapper theme={theme} onClick={() => setIsFavorite(!isFavorite)}>
//       <CardLabel theme={theme}>{label}</CardLabel>
//       <CardImage src={picture} alt="freelance" />
//       <CardTitle theme={theme}>
//         {star} {title} {star}
//       </CardTitle>
//     </CardWrapper>
//   )
// }

// Class component
class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: false,
    }
  }

  setFavorite = () => {
    this.setState({ isFavorite: !this.state.isFavorite })
  }

  render() {
    const { theme, picture, label, title } = this.props
    const { isFavorite } = this.state
    const star = isFavorite ? '⭐️' : ''

    return (
      <CardWrapper theme={theme} onClick={this.setFavorite}>
        <CardLabel theme={theme}>{label}</CardLabel>
        <CardImage src={picture} alt="freelance" />
        <CardTitle theme={theme}>
          {star} {title} {star}
        </CardTitle>
      </CardWrapper>
    )
  }
}

Card.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
}

Card.defaultProps = {
  label: '',
  title: '',
  picture: DefaultPicture,
}

export default Card
