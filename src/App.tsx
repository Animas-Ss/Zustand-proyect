
import javaScriptLogo from './assets/javascript.svg';
import Game from './components/Game';
import { Start } from './components/Start';
import { useQuestionsStore } from './store/questions';

function App() {
  const questions =  useQuestionsStore((state) => state.questions);
  console.log(questions)

  return (
    <main className='w-full h-screen flex justify-center items-center flex-col'>
    <div className='flex items-center gap-3 justify-center '>
      <div className='flex items-center justify-center'>
      <img src={javaScriptLogo} alt="JavaScript Logo" className='w-[40px] h-[40px]' />
      </div>
      <h1 className='text-2xl'>Preguntas de JavaScript</h1>
    </div>
    {questions.length === 0 && <Start/>}
    {questions.length > 0 && <Game/>}
    </main>
  )
}

export default App
