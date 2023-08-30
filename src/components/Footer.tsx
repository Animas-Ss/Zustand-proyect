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
        <footer className="flex justify-between w-full px-4">
            <strong>
                {`✔ ${correct} Correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} faltantes `}
            </strong>
            <button onClick={reset} className="text-slate-200 hover:text-black bg-red-500 rounded-full px-2">reset</button>
        </footer>
    )


}