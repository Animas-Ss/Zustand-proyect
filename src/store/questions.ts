import { create } from 'zustand';//TODO: funcion para crear el estado
import { persist } from 'zustand/middleware';//OPTIMIZE: este metodo sirbe para gaurdar los datos en el localstorage o donde yo determine invertigar mas
import { type Questions } from '../types/types';//TODO: tipos creados para declarar en mi estado global


//TODO: creamos una interface de nuestro estado global en este caso va a tener preguntas, numeros de preguntas, y funcion para solicitar a una api las preguntas
interface State {
  //TODO: el estado tiene un array que de comienzo esta vacio pero es de typo Question que declaramos en nuestro archivo de types
    questions: Questions[]
    //TODO: como vamos a necesitar la cantidad e indice de preguntas colocamos el nuemro en current
    currentquestions: number,
    //TODO: aca declaramos la funcion de mie stado global que realiza un fetch de datos por eso el tipo es promesay devuelve un void
    fetchQuestions: (limit: number) => Promise<void>
    //TODO: generamos una funcion que realice la comparacion de la respuesta del usuario
    selectAnswer: (questionsID: number, answerIndex: number) => void,
    //TODO: funciones para actualziar el indice de mi arrays de preguntas
    goNextQuestion: () => void,
    goPreviusQuestion: () => void,
    //TODO: como generamos una persistencia de datos , tenemos que desarrollar un reset sino no se va a reiniciar
    reset: () => void
}

//FIX: para que el persist funcione tenemos que declarar las cosas como son embolver nuestro estado con el persist y ponerle nombre 
//FIX: y saber que devuleve una funcion por lo cual el type de el stado abria que camiarlo y ponerle un()
//OPTIMIZE: aca propiamente dicho creamos el custom hook para generar el estado global con zustand
export const useQuestionsStore = create<State>()(persist((set, get) => {
  //                                          👆 por que devuleve una funcion el persist
  return {
    questions: [],
    currentquestions: 0,
    //TODO: generamos la funcion para llenar nuestro estado con un fetch desde una api de necesitarlo
    fetchQuestions: async (limit: number) => {
      //TODO: aca en esta funcion que usamos de nuestro estado global es apra pedir a nuestra base de datos o api los elementos necesario
       const res = await fetch('http://localhost:5173/data.json');//como pusimos nuestro archivo en publico podemos pedirlo como si fuera una api , para saber como cargar neustro estado global
       const json = await res.json();
       
       //TODO: en esta variable guardamos la respuesta pero limitada solo las preguntas que nos pidan y con el random que sean a lazar 
       const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
       //TODO: con esta funcion de zustand modificamos el estado en este caso despes de realizar la peticion a nuestra api lo cargamos
       set({questions});
    },
    //TODO: generamos la funcion de selectAnswer
    selectAnswer: (questionID: number, answerIndex: number ) => {
       //TODO: llamamos con el metodo get a nuestro estado y desestructuramos apra optener las preguntas cargadas
       const  { questions }  = get();
       //TODO: ahora usamos structuredClone para clonar el objeto y luego volverlo a pasar para actualizar el estado con los cambios pertinentes
       const newQuestions = structuredClone(questions);
       //TODO: buscamos el indice de la pregunta que se respondio
       const questionIndex = newQuestions.findIndex(q => q.id === questionID);
       //TODO: obtenemos la informacion de la pregunta
       const questionInfo = newQuestions[questionIndex];
       //TODO: averiguamos si el usuario a seleccionado la respuesta correcta
       const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
       //TODO cambiamos la informacion en la copia de la pregunta
       newQuestions[questionIndex] = {...questionInfo, isCorrectUserAnswer, userSelecterAnswer: answerIndex}
       //TODO: actualizamos finalmente el estado
       set({questions: newQuestions})
    },
    //TODO ahora vamosa  generar un funcion para podernos mover entre preguntas mediante el indice
    goNextQuestion: () => {
      const {currentquestions, questions} = get();
      const nextQuestion = currentquestions + 1;

      if(nextQuestion < questions.length){
        set({ currentquestions: nextQuestion});
      }
    },
    //TODO: generamos una funcion para volver a la pregunta anterior
    goPreviusQuestion: () => {
      const { currentquestions } = get();
      const previousQuestion = currentquestions - 1;
      if(previousQuestion >= 0){
        set({ currentquestions: previousQuestion});
      }
    },
    reset: () => {
      set({currentquestions: 0, questions: []});
    }
  }
},{
  //TODO: se agrega un nombre o una llave para guardarlo en el localstorage o donde yo determine por defecto lo guarda en el localStorage
  name: 'questions',
  //getStorage: () => sessionStorage con esta linea decidimos donde enviar la secion o los datos a persistir 
}))
