import { useQuestionsStore } from "../store/questions";

const LIMIT_QUESTIONS = 10;

//FIXME: importante recordar que cuando creamos una funcion para el evento click solo poner dicha duncion sin necesidad de colocar una funcion dentro del evento

export const Start = () => {
    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);

    const handleClick = () => {
        fetchQuestions(LIMIT_QUESTIONS);
    }

  return (
    <>
      <button className="bg-blue-600 rounded-lg px-4 py-2 text-white" onClick={handleClick}>Comenzar</button>
    </>
  )
}
