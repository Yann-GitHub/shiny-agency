import { useParams } from 'react-router-dom'
// import { useEffect, useState, useContext } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Loader } from '../../utiles/style/Atoms'
import colors from '../../utiles/style/color'
import { SurveyContext } from '../../utiles/context'
import { useFetch, useTheme } from '../../utiles/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`

const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#000000')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const { theme } = useTheme()

  //Partie pour le call API sans passer par le custom hook (1a, 1b, 2)
  //const [surveyData, setSurveyData] = useState({})
  //const [isDataLoading, setDataLoading] = useState(false)
  //const [error, setError] = useState(false)

  const { saveAnswers, answers } = useContext(SurveyContext)

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }

  //Partie pour le call API avec le custom hook (useFetch)
  const { data, isDataLoading, error } = useFetch(
    `http://localhost:8000/survey`
  )
  const surveyData = data?.surveyData

  if (error) {
    return <span>Oups il y a eu un problème</span>
  }

  ////////////////////   CALL API   ////////////////////

  // 1a - Solution avec Promesses
  // useEffect(() => {
  //   setDataLoading(true)
  //   fetch(`http://localhost:8000/survey`).then((response) =>
  //     response.json().then(({ surveyData }) => {
  //       setSurveyData(surveyData)
  //       setDataLoading(false)
  //     })
  //   )
  // }, [])

  // 1b - Solution avec Promesses et gestion des erreurs
  // useEffect(() => {
  //   setDataLoading(true)
  //   fetch(`http://localhost:8000/survey`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok')
  //       }
  //       return response.json()
  //     })
  //     .then(({ surveyData }) => {
  //       setSurveyData(surveyData)
  //       setDataLoading(false)
  //     })
  //     .catch((error) => {
  //       console.error('There was a problem with the fetch operation:', error)
  //       setError(true)
  //       setDataLoading(false)
  //     })
  // }, [])

  // if (error) {
  //   return <span>Oups il y a eu un problème</span>
  // }

  // 2 - Solution avec fonction asynchrone
  // Cette syntaxe permet aussi bien de faire des calls API.
  // Mais pour utiliser await dans une fonction, il faut que celle-ci soit async (pour asynchrone).
  // Comme la fonction passée à useEffect ne peut pas être asynchrone,
  // il faut utiliser une fonction qui est appelée dans useEffect et déclarée en dehors, comme ici 👇.
  // Essayez de commenter le code créé dans le chapitre et de décommenter fetchData pour voir.

  // useEffect(() => {
  //   async function fetchSurvey() {
  //     setDataLoading(true)
  //     try {
  //       const response = await fetch(`http://localhost:8000/survey`)
  //       const { surveyData } = await response.json()
  //       setSurveyData(surveyData)
  //     } catch (err) {
  //       console.log(err)
  //       setError(true)
  //     } finally {
  //       setDataLoading(false)
  //     }
  //   }
  //   fetchSurvey()
  // }, [])

  // if (error) {
  //   return <span>Oups il y a eu un problème</span>
  // }

  ////////////////////   END CALL API   ////////////////////

  return (
    <SurveyContainer>
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      {isDataLoading ? (
        <Loader />
      ) : (
        <QuestionContent theme={theme}>
          {surveyData[questionNumber]}
        </QuestionContent>
      )}
      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
          theme={theme}
        >
          Oui
        </ReplyBox>
        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
          theme={theme}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>
      <LinkWrapper theme={theme}>
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent</Link>
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>Suivant</Link>
        ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}

export default Survey
