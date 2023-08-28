import { useQuestionsStore } from "../store/questions"

export const Footer = () => {
    //Usamos nuestro estado global de zustand para saber cuantas contestamos de forma corresta o no
    //TODO: llamamos al estado y traemos las preguntas
    const questions = useQuestionsStore(state => state.questions);
    //TODO funcion del reset
    const reset = useQuestionsStore(state => state.reset);
    //TODO iniciamos variables que van a almacenar ls correctas o incorrestas
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach(question => {
        const { userSelecterAnswer, correctAnswer} = question;
        if(userSelecterAnswer == null) unanswered++
        else if(userSelecterAnswer === correctAnswer) correct++
        else incorrect ++
    })
    return(
        <footer>
            <strong>
                {`✔ ${correct} Correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} faltantes `}
            </strong>
            <button onClick={reset} className="bg-red-900 px-3 py-2 rounded-full">Reset</button>
        </footer>
    )


}