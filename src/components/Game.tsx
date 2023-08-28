import { useQuestionsStore } from "../store/questions"
import { type Questions as  QuestionsType} from "../types/types";//TODO: cambiamos de nombre para que no aya problemas con el elemento llamado Question
import SyntaxHighLihgter from 'react-syntax-highlighter'
import {gruvboxDark} from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Footer } from "./Footer";

//FIX: recordar que en TypeScript puede quejarse la funcion si no devuelve nada , por lo cual siempre colocar el return para que no genere ese error
const Question = ({info} : {info : QuestionsType }) => {
    const selectAnswer = useQuestionsStore(state => state.selectAnswer);
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)

    const createHandleClick = ( answerIndex: number)=> () => {
        selectAnswer(info.id, answerIndex);
        setTimeout(() => {
            goNextQuestion()
        }, 900);
    }

    //FIX: mejorar la siguiente funcion  que cambia de color segun als posibles respuestas o estados de la respuesta

    const getBackgroundColor = (index: number) => {
        const { userSelecterAnswer, correctAnswer } = info;
        //usuario no selecciona nada todavia
        if(userSelecterAnswer == null) return 'transparent';
        //si ya selecciono pero la respuesta es incorrecta
        if(index != correctAnswer && index !== userSelecterAnswer) return 'transparent'
        //si es la seleccion correcta
        if(index === correctAnswer) return 'green'
        //si la seleccion del usuario esta , pero no es correcta
        if(index === userSelecterAnswer) return 'red'
        //si no es ninguna de las anteriores
        return 'transparente'
    }

  return (
    <div className=" w-[600px] p-4 flex gap-3 flex-col rounded-md">
        <div className="bg-white w-full p-4">
            <h3>{info.question}</h3>
        </div>
        <div>
            <SyntaxHighLihgter language="javascript" style={gruvboxDark}>
                {info.code}
            </SyntaxHighLihgter>
        </div>
        <div className="">
            <ul>
                {info.answers.map((answer, index) => (
                    <li key={index}>
                        <button className="w-full p-3 border-b-[1px] border-gray-700 hover:bg-slate-500" style={{background:`${getBackgroundColor(index)}`}} onClick={createHandleClick(index)} disabled={info.userSelecterAnswer != null}>{answer}</button>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

const Game = () => {
    //TODO: recuperamos del estado las preguntas y la posicion de la pregunta 
    const questions = useQuestionsStore(store => store.questions);
    const currentQuestions = useQuestionsStore(store => store.currentquestions);
    //OPTIMIZE: ahora aca usamos lo de ir para adelante y para atras
    const goNextQuestion = useQuestionsStore(store => store.goNextQuestion);
    const goPreviusQuestion = useQuestionsStore(store => store.goPreviusQuestion);

    //TODO creamos ahora mediante estos dos datos la infomacion de la pregunta
    const questionInfo = questions[currentQuestions];
    //TODO: ahora pasamos como parametro de nuestro questions la informacion
  return (
    <>
        <div className="flex gap-3">
            <button onClick={goPreviusQuestion} disabled={currentQuestions === 0} className="bg-blue-300 w-[20px] h-[20px] rounded-full flex items-center justify-center">{"<"}</button>
            {currentQuestions + 1} / {questions.length}
            <button onClick={goNextQuestion} disabled={currentQuestions > questions.length -1} className="bg-blue-300 w-[20px] h-[20px] rounded-full flex items-center justify-center">{">"}</button>
        </div>
        <Question info={questionInfo}/>
        <Footer/>
    </>
  )
}

export default Game