"use client"
import React from 'react';
import Logo from '../assets/logo-amantiya-nessans-1536x642.png'
import { Result, getResults } from '@/assets/calculation';
import { Question } from '@/assets/calculation';
import Mock from '../assets/mock.jpg';
import axios from 'axios'
import { useRouter } from 'next/navigation';

function sleep(ms: number) {
  return new Promise(r=>setTimeout(r, ms))
}

export default function Home() {
  const [result, setResult] = React.useState<Result>({
    algemeenGrads: -1,
    type: 'De Overload Burnout',
    energyLevel: {
      energielevel: 0,
      activerende: 0,
      blokkade: 0,
      focus: 0,
      hyper: 0,
      energiereserves: 0
    }
  })
  const [questions, setQuestions] = React.useState<Array<Question>>([
    {
      question: 'Ik voel me vitaal en sterk',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Mijn energie als ik wakker word heeft niveau:',
      startVal: 'laag',
      endVal: 'hoog',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Na tien minuten wakker te zijn heeft mijn energie niveau:',
      startVal: 'laag',
      endVal: 'hoog',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Ik heb zin in ontbijt en eet met smaak:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Om 11.00 heeft mijn energie niveau.',
      startVal: 'laag',
      endVal: 'hoog',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Ik heb zin in lunch en eet met smaak:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Na de lunch heeft mijn energie niveau:',
      startVal: 'laag',
      endVal: 'hoog',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Om 16.00 heeft mijn energie niveau:',
      startVal: 'laag',
      endVal: 'hoog',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Ik heb zin in avondeten en eet met smaak:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'na het avondeten heeft mijn energie niveau:',
      startVal: '',
      endVal: '',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Om 21.00 ben ik niet moe en wil nog niet naar bed',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Ik slaap goed in',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik slaap rustig en kalm',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: "Ik word's nachts niet wakker",
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik word niet snel moe van lichte lichamelijke arbeid, zoals poetsen, tuin werken, knutselen.',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Ik kan goed een paar uur achter de computer werken.',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Op mijn werk voel ik me energiek',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Thuis voel ik me energiek',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'In de weekenden en op vakantie ben ik uitgerust',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Mijn buik voelt altijd lekker en kalm',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,  
      category: 'Blokkade'
    },
    {
      question: 'Ik heb nooit last van mijn lage rug',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen regelmatige last van hoofdpijn',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van een gespannen nek.',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van stijfheid in mijn gewrichten',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van pijn in mijn gewrichten',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Mijn borstkas voelt altijd ontspannen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen pijn in pezen of spieren',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van kortademigheid',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van hartkloppingen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van een algeheel gestrest gevoel',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van spontaan zweet',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik heb geen last van hete voeten s nachts of van hogere lichaamswarmte',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik heb het niet eerder koud nu in vergelijking met vroeger',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Mijn stoelgang is niet te hard',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Mijn stoelgang is niet te zacht',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik heb geen last van koude voeten of handen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'In de winter voel ik me niet vaker moe dan in de zomer',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik heb geen allergieën',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik heb geen last van mijn maag, buikpijn, misselijkheid of oprispingen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik heb geen last van spontane neusbloedingen, anale bloeding of blauwe plekken of te hevige menstruele bloeding.',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik ben niet prikkelbaar voor licht, lampen of lichtflitsen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik ben niet prikkelbaar voor geluiden',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'ik voel me goed in een grotere groep mensen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik kan goed tegen rumoer en chaos om me heen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik voel me kalm en verdraagzaam bij mijn familie, kinderen en beste vrienden',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik voel me niet nerveus',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'ik voel me niet angstig',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik schrik niet snel',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik ben niet snel emotioneel',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik ben niet depressief',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik heb vertrouwen in mijn gezondheid',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik ben gefocust en kan gericht werken',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik kan goed een boek of stuk tekst lezen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik kan na werk goed afschakelen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik kan na een emotionele gebeurtenis goed afschakelen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik heb mijn gedachten op een rijtje.',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik kan goed rekenen, duidelijk formuleren en mijn talen spreken',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik pieker niet veel en maak me niet veel zorgen',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
  ])
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const questionLen = [1,2,3,4,5,6,7,8,9,10]
  const [question, setQuestion] = React.useState(0)
  const [email, setEmail] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  const [name, setName] = React.useState('')
  const [telephone, setTelephone] = React.useState('') 
  const mainDivRef = React.useRef<HTMLDivElement | null>(null)
  const areAnswersFilled = (question: number) => {
    let flag = questions[question].answer !== 0 ? true : false
    return flag
  }
  const handleSubmit = async () => {
    setSubmitted(true)
    const postData = {
      name: name,
      email: email,
      number: telephone,
      energyLevel: {
        energielevel: `${result.energyLevel.energielevel}`,
        activerende: `${result.energyLevel.activerende}`,
        blokkade: `${result.energyLevel.blokkade}`,
        focus: `${result.energyLevel.focus}`,
        hyper: `${result.energyLevel.hyper}`,
        energiereserves: `${result.energyLevel.energiereserves}`
      }
    }
    await axios.post('https://api.amantiya.com:8080/users/create', postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await sleep(2000)
    setSubmitted(false)
    window.location.reload()
  }
  const handleFinalClick = () => {
    const resultsLocal = getResults(questions)
    setResult(resultsLocal)
  }
  const [page, setPage] = React.useState<'Home' | 'How' | 'Quiz'>('Home')
  return (
    <div className="bg-primary flex flex-col justify-center items-center w-full min-h-screen font-primary">
      <div className={`transition duration-500 flex justify-center items-center p-4 bg-primary z-50 w-fit self-center fixed border-[1px] border-buttonBorder rounded-full top-5 ${submitted ? 'opacity-100' : 'opacity-0'}`}>
        <p>De resultaten van de test zijn verstuurd naar...</p>
      </div>
      <div className="w-full h-[72px] relative border-b-buttonBorder border-b-[1px] bg-F3EEE7 flex justify-between items-center px-24 lg:px-4 py-8">
        <img src={Logo.src} className='h-[72px]'/>
        <button className='border-[1px] border-buttonBorder transition duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2'>
          Go Back
        </button>
      </div>
      <div className='min-h-screen flex flex-col px-24 justify-center items-center mt-4 lg:px-8'>
        {page == 'Quiz' && result.algemeenGrads == -1 ?
        <div className='flex-col flex justify-center items-center w-full border-[32px]  border-white'>
          <div className='p-8 flex justify-center items-center flex-col'>
            <button className='mt-4 w-32 border-[1px] border-buttonBorder hover:cursor-default bg-button text-text rounded-[1px] px-6 py-2 text-xl'>
              {question + 1}/{questions.length}
            </button>
            <h1 className='text-3xl mt-4 text-center'>{questions[question].question}</h1>
            <div className='flex flex-col justify-center mt-2 items-center'>
              <div className='flex justify-center items-center flex-row'>
                {questionLen.map((qL, index) => (
                  <div key={index} className='flex flex-row'>
                    <h1 className={`text-2xl lg:text-xl mx-1 font-sans ${qL == 10 || qL == 1 ? 'font-semibold' : ''} transition duration-500 active:scale-90 cursor-pointer ${questions[question].answer == qL ? 'scale-[130%] font-semibold' : 'hover:scale-110'}`} onClick={()=>{
                      let oldQuestions = [...questions]
                      oldQuestions[question].answer = qL
                      setQuestions(oldQuestions)
                    }}>{qL}</h1>
                    <h1 className={`text-2xl lg:text-xl mx-1 font-sans ${qL == 10 ? 'hidden' : ''}`}>-</h1>
                  </div>
                ))}
              </div>
              <div className='flex justify-between items-center w-full'>
                <span className='text-md mr-2 mt-1'>{questions[question].startVal}</span>
                <span className='text-md ml-2'>{questions[question].endVal}</span>
              </div>
            </div>
            {question + 1 == questions.length ? 
            
            <button className={`mt-4 border-[1px] border-buttonBorder transition mx-4 duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2 ${areAnswersFilled(question) ? '' : 'pointer-events-none cursor-not-allowed opacity-50'}`} onClick={handleFinalClick}>
              Indienen
            </button>
            :
            <button className={`mt-4 border-[1px] border-buttonBorder transition mx-4 duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2 ${areAnswersFilled(question) ? '' : 'pointer-events-none cursor-not-allowed opacity-50'}`} onClick={()=>{setQuestion(question + 1)}}>
              Verder
            </button>}
          </div>
        </div>
        : page == 'Quiz' ?   
        <div className='min-h-screen flex-col flex justify-center items-center w-full border-[32px] border-white'>
          <div className='w-5/6 h-full p-8 flex justify-end items-center flex-col'>
            {result.type == 'De Overload Burnout' ? 
            <h1 className='font-primary text-start text-3xl w-full'>Uit je antwoorden blijkt dat je een <span className='text-blue-500'>Overload Burn out</span> hebt.</h1>
            :
            <h1 className='font-primary text-start text-3xl w-full'>Uit je antwoorden blijkt dat je geen burn out hebt.</h1>
            }
            {result.type == 'De Overload Burnout' ?
            <p className={`text-xl text-start`}>Deze Burn out is een 1e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten. Kenmerken: oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust. Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maar wanneer degene met een normale burn out voldoende rust krijgt, gaat het hem/haar al zichtbaar beter. Behandeling van deze burn out bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden.</p>
            :
            <p className={`text-start text-xl`}>Je totale energiebeeld geeft aan dat je geen Burn out hebt. Je energie is hoog genoeg om zelf te herstellen van eventuele klachten die je zou kunnen hebben. Zorg voor een gezond levensritme, met voldoende rust, beweging en gezond eten. Zoek je een methode om jezelf te ontwikkelen, je levensritme en je energie te leren kennen en onder controle leren brengen. We bieden een online begeleiding en training van je eigen energie via de cursus “De Yuan methode – Eén met je eigen energie”. Klik hier voor meer info.</p>
            }
            <h1 className={`text-lg text-start mt-6 font-primary`}>Uit de test kunnen wij nog meer informatie over je level van energie en over jouw specifieke kenmerken halen. Wil je dit ontvangen dan laten we dit samenstellen en sturen we het per email gratis naar je toe.</h1>
            <div className='flex justify-start w-full items-start flex-col'>
              <input onChange={(e)=>{setName(e.target.value)}} className='bg-white mt-2 border-[1px] border-slate-300 p-3 placeholder-slate-500 focus:outline-none w-96' placeholder='Naam'/>
              <input onChange={(e)=>{setEmail(e.target.value)}} className='bg-white mt-2 border-[1px] border-slate-300 p-3 placeholder-slate-500 focus:outline-none w-96' placeholder='Email'/>
              <input onChange={(e)=>{setTelephone(e.target.value)}} className='bg-white mt-2 border-[1px] border-slate-300 p-3 placeholder-slate-500 focus:outline-none w-96' placeholder='Telefoon'/>
              <label className="inline-flex items-center mt-4">
                <input type="checkbox" checked={checked} onChange={()=>{setChecked(!checked)}} className="checkbox-rounded" />
                <span className="ml-2 text-md">Vink aan, en wij nemen contact met u op voor het plannen van een gratis intake </span> 
              </label>
              <button onClick={handleSubmit} className={`mt-4 border-[1px] border-buttonBorder transition duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2 ${name.length < 2 || email.length < 3 || !email.includes('@') || !email.includes('.') ? 'opacity-50 curser-not-allowed pointer-events-none' : ''}`}>
                Verstuur
              </button>
              <h1 className='text-xl mt-4'><span className='font-bold'>Let op </span>deze uitslag geeft onze eerste bevinding. Wil je een meer diepgaande en uitgebreidere diagnose.  Vul dan je gegevens in en plan een gratis intake.</h1>
            </div>
          </div>
        </div> : ''}
        {page == 'Home' ? 
        <div className='flex-row flex justify-center p-2 items-center w-10/12 lg:w-full border-[32px] border-white p-0'>
          <div className='flex justify-end w-[300px] lg:hidden items-end flex-col'>
            <img src={Mock.src} className='w-full rounded h-auto mr-12' alt='Mockup Image'/>
          </div>
          <div className='flex justify-start w-5/12 lg:w-full items-start flex-col'>
            <h1 className='text-5xl w-full text-start'>Burn-out Test</h1>
            <h1 className='text-xl w-full text-start lgo:pr-32'>Doe de test en zle wat wllje kunng0 ke tellen over jouw situatie. Je krijgt van ous direct Antwoord.</h1>
            <ul className='text-xl ml-4 mt-8 list-disc'>
              <li>of dit eeg burn-out is. </li>
              <li className='mt-2'>zo ja, wat voor short Burn-out</li>
              <li className='mt-2'>over je energielevel</li>
            </ul>
            <button onClick={()=>{setPage('How')}} className='mt-8 border-[1px] border-buttonBorder transition duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2'>
              Take The Quiz
            </button>
            <h1 className='text-md mt-4'>De test duurt circa 10 minuten</h1>
          </div>
        </div> : page == 'How' ? 
        
        <div className='min-h-screen flex-col flex justify-center items-center lg:items-start w-full border-[32px] p-4 border-white'>
          <h1 className='text-5xl font-bold lg:text-3xl lg:text-start lg:w-full'>Hoe de Test werkt</h1>
          <h1 className='text-xl mt-2 text-center w-7/12 lg:w-full lg:text-start'>Antwoordmogelijkheden zijn telkens cijfers tussen 1 en 10, Cijfer 10 is volledig waar en cijfer 1 is volledig niet waar of cijfer 10 is hoge energie en 1 zeer lage energie. <br/>Test en gradeer iedere bewering met je gevoel en het eerste cijfer wat binnenvalt alt zet je neer. Niet twijfelen en terugkijken, dat geeft alleen verwarring. <br/>De test neemt ongeveer 10 minuten in beslag. <br/>Wordt nooit ongerust van wat voor test dan ook. De test is er om een diagnose te maken en te kijken wat we kunnen doen om je score gezond hoog te krijgen. <br/>ledere uitslag is dus een goede uitslag, veel success.</h1>
          <button onClick={()=>{setPage('Quiz')}} className='mt-4 border-[1px] border-buttonBorder transition duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2'>
            Verder
          </button>
        </div> : ''}
      </div>
    </div>
  );
}
