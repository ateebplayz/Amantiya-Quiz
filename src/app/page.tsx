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
    type: '2e Graads Overload Burn out',
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
      question: 'Ik voel me vitaal en sterk:',
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
      question: 'Om 11.00 heeft mijn energie niveau:',
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
      question: 'Na het avondeten heeft mijn energie niveau:',
      startVal: '',
      endVal: '',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Om 21.00 ben ik niet moe en wil nog niet naar bed:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Ik slaap goed in:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik slaap rustig en kalm:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: "Ik word s'nachts niet wakker:",
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik word niet snel moe van lichte lichamelijke arbeid zoals, poetsen, tuin werk, knutselen etc:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Ik kan goed een paar uur achter de computer werken:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Op mijn werk voel ik me energiek:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Thuis voel ik me energiek:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'In de weekenden en op vakantie ben ik uitgerust:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energielevel'
    },
    {
      question: 'Mijn buik voelt altijd lekker en kalm:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,  
      category: 'Blokkade'
    },
    {
      question: 'Ik heb nooit last van mijn lage rug:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen regelmatige last van hoofdpijn:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van een gespannen nek:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van stijfheid in mijn gewrichten:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van pijn in mijn gewrichten:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Mijn borstkas voelt altijd ontspannen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen pijn in pezen of spieren:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van kortademigheid:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van hartkloppingen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van een algeheel gestrest gevoel:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Blokkade'
    },
    {
      question: 'Ik heb geen last van spontaan zweet:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: "Ik heb geen last van hete voeten s'nachts of van hogere lichaamswarmte:",
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik heb het niet eerder koud nu in vergelijking met vroeger:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Mijn stoelgang is niet te hard:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Mijn stoelgang is niet te zacht:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik heb geen last van koude voeten of handen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'In de winter voel ik me niet vaker moe dan in de zomer:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik heb geen allergieën:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik heb geen last van mijn maag, buikpijn, misselijkheid of oprispingen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik heb geen last van spontane neusbloedingen, anale bloedingen, blauwe plekken of te hevige menstruele bloedingen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Peil activerende energie'
    },
    {
      question: 'Ik ben niet prikkelbaar voor licht, lampen of lichtflitsen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik ben niet prikkelbaar voor geluiden:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik voel me goed in een grotere groep mensen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik kan goed tegen rumoer en chaos om me heen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik voel me kalm en verdraagzaam bij mijn familie, kinderen en beste vrienden:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik voel me niet nerveus:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Hypersensiviteit'
    },
    {
      question: 'Ik voel me niet angstig:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik schrik niet snel:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik ben niet snel emotioneel:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik ben niet depressief:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik heb vertrouwen in mijn gezondheid:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Energiereserves'
    },
    {
      question: 'Ik ben gefocust en kan gericht werken:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik kan goed een boek of stuk tekst lezen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik kan na werk goed afschakelen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik kan na een emotionele gebeurtenis goed afschakelen:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik heb mijn gedachten op een rijtje:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik kan goed rekenen, duidelijk formuleren en mijn talen spreken:',
      startVal: 'niet waar',
      endVal: 'volledig waar',
      answer: 0,
      category: 'Naveau van focus'
    },
    {
      question: 'Ik pieker niet veel en maak me niet veel zorgen:',
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
      },
      intake: checked ? 'y' : 'n'
    }
    await axios.post('https://api.amantiya.com:8080/users/create', postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  const handleFinalClick = () => {
    const resultsLocal = getResults(questions)
    setResult(resultsLocal)
  }
  const getHeadingOfResult = () => {
    switch (result.type) {
      case 'De Overload Burnout':
        return 'Uit je antwoorden blijkt dat je een Overload Burn out hebt.'
      case 'De Chaotic Burnout':
        return 'Uit je antwoorden blijkt dat je een Chaotic Burn out hebt.'
      case 'De Hypersensitive Burnout':
        return 'Uit je antwoorden blijkt dat je een Hypersensitive Burn out hebt.'
      case 'De Rockbottom Burnout':
        return 'Uit je antwoorden blijkt dat je een Rock Bottom Burn out hebt.'
      case 'De Burnout Shutdown':
        return 'Uit je antwoorden blijk dat je een Burn out Shutdown hebt.'
      case 'De Burnout/Rockbottom Shutdown':
        return 'Uit je antwoorden blijkt dat je een combinatie hebt van de Rock Bottom Burn out en een Burn out Shutdown'
      case 'De Chaotic/Hypersensitive Burnout':
        return 'Uit je antwoorden blijkt dat je een combinatie hebt van de Chaotic Burn en Hypersensitive Burn out'
      case '3e Graads Overload Burn out':
        return 'Uit je antwoorden blijkt dat je een 3e graads Overload Burn out hebt.'
      case '2e Graads Overload Burn out':
        return 'Uit je antwoorden blijkt dat je een 2e graads Overload Burn out hebt.'
      case 'Geen Burn out':
        return 'Uit je antwoorden blijkt dat je Geen Burn out hebt.'
    }
    // This is impossible to get.
    return 'Uit je antwoorden kunnen wij geen conclusie halen.'
  }
  const getParagraphOfResult = () => {
    switch (result.type) {
      case 'De Overload Burnout':
        if(result.algemeenGrads == 2) {
          return 'Jouw Burn out is een 2e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten. \n\n Jouw burn out symptomen : oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust \n\n Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maar wanneer je met een normale burn out voldoende rust krijgt, gaat het met jouw al snel zichtbaar beter. \n\n Jouw burn out herstel bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden. \n\n Je systemen functioneren nog maar je bent op het randje van een zware Burn out. Het is belangrijk hier snel actie in te ondernemen en de situatie niet te onderschatten.'
        } else if(result.algemeenGrads == 3) {
          return 'Jouw Burn out is een 3e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten. \n\n Jouw burn out symptomen : oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust \n\n Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maar wanneer je met een normale burn out voldoende rust krijgt, gaat het met jouw al snel zichtbaar beter. \n\n Jouw burn out herstel bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden. \n\n Je systemen functioneren nog maar je bent op het randje van een zware Burn out. Het is belangrijk hier snel actie in te ondernemen en de situatie niet te onderschatten.'
        }
        return 'Jouw Burn out is een 1e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten.\n\n Jouw burn out symptomen : oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust \n\n Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maar wanneer je met een normale burn out voldoende rust krijgt, gaat het met jouw al snel zichtbaar beter. \n\n Jouw burn out herstel bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden. '
      case 'De Chaotic Burnout':
        return 'De chaotic burn out is een 2e graads Burn out waarbij de geest geen rust meer kan vinden en van hot naar haar gaat en continu het al lage energieniveau gebruikt, ook tijdens rustmomenten. \n\n Jouw burn out symptomen, geen puf om iets te doen, gevoelens van oververmoeidheid met een rusteloze geest. Rust willen nemen, maar geen rust voelen. Slechte nachtrust. Gevoelens van paniek en agressie. \n\n Jouw burn out herstel bestaat niet alleen uit het nemen van rust en het gradueel opbouwen van energie, maar een zwaartepunt ligt ook voornamelijk bij het tot rust brengen van jouw geest.'
      case 'De Hypersensitive Burnout':
        return 'Jouw burn out is een 2e graads Burn out. Bij deze Burn out bestaat een hogere gevoeligheid voor lichamelijke en/of geestelijke prikkels naast de enorme oververmoeidheid.\n\n Burn out symptomen: Jouw lage energieniveau is doorgedrongen in je gevoeligheid. Dit resulteert in daadwerkelijke verhoogde allergiegraad van het lichaam met allerlei allergische reacties zoals, kortademigheid, rode vlekken, bulten en nog veel meer. Doordat het afweersysteem met histaminereacties te heftig reageert op stoffen van buitenaf.\n\n Bij deze Burn out kan ook een verhoogde geestelijke gevoeligheid spelen. Dit kan alleen of samen met de lichamelijke allergie gaan. Deze geestelijke overgevoeligheid kenmerkt zich door het niet kunnen verdragen van prikkels van buitenaf zoals prikkels van licht, geluid en beweging.  Deze vorm van overgevoeligheid wordt dan ook wel de allergy for life genoemd. \n\n Jouw herstel van de Hypersensitive burn out bestaat uit het nemen van rust en gradueel opbouwen van energie. Ten aanzien van de voeding, moet de voeding waarvoor jij allergisch bent vermeden worden of in een opneembare vorm worden aangeboden. Darmzuivering is ook een aspect wat aandacht vraagt. Fysieke prikkels moeten ook worden vermeden tot een gradatie waarbij ze de rust niet verstoren. In de opbouw van energie moet ook een opbouw volgen waarbij prikkels weer hanteerbaar zijn en voeding weer verteerbaar is.'
      case 'De Rockbottom Burnout':
        return 'De rock Bottom Burn out is wat we noemen een 3e graads Burn out. Jouw energie is gewoon op. Er is ook onvoldoende energie om bijvoorbeeld voeding in lichaam bruikbare energie om te zetten’ \n\n Jouw burn out symptomen: je bent meer dan oververmoeid. Je bent gewoon op. hebt geen eetlust, een zeer onrustige slaap en ligt vaak wakker. Bewegingen zijn traag. Er is hoofdpijn, buikpijn en flankpijn. Je bent lethargisch oftewel emotieloos. \n\n Jouw burn out herstel van de Rock Bottom Burn out begint met heel veel rust afgewisseld met hele kleine makkelijk verteerbare voeding. Warmte applicaties met regelmaat en kruiden om de slaap te bevorderen. Behandelingen zijn nodig om de orgaansystemen aan te wakkeren en te ondersteunen. Nadat je uit het diepste dal bent kunnen andere maateregelen volgen naar gelang de situatie van dat moment'
      case 'De Burnout Shutdown':
        return 'Bij de Burn out Shutdown stoppen alle organische lichaamsprocessen, een voor een, met functioneren. Dit is een 3e graads Burn out met een zeer laag energieniveau en bijna altijd een mentale achtergrond. \n\n Jouw burn out symptomen: Je ervaart in zeer hoge mate oververmoeidheid. Er is een onrustige slaap met veel wakker worden. Er is lage rugpijn, een houdingsverandering naar de organen die zo goed als stil zijn komen te liggen. Andere symptomen kunnen zijn kortademigheid, hoofdpijnen, pijnlijke verkrampte spieren, geen eetlust of eten niet kunnen verdragen, koude gevoelens en buikkrampen. \n\n Jouw herstel van de Burn out Shutdown vraagt om therapeutische ondersteuning om de orgaansystemen weer op gang te krijgen, veel warmte, de juiste voeding en een gedoseerde lichte activatie naast heel veel rust. Nadat je uit de meest erge situatie bent, kunnen andere maatregelen volgen naar gelang van de situatie van dat moment.'
      case 'De Burnout/Rockbottom Shutdown':
        return 'De Rock Bottom Burn out is wat we noemen een 3e graads Burn out. Jouw energie is gewoon op. Er is ook onvoldoende energie om bijvoorbeeld voeding in lichaam bruikbare energie om te zetten’ \n\n Jouw burn out symptomen: je bent meer dan oververmoeid. Je bent gewoon op.  Je hebt geen eetlust, hebt  een zeer onrustige slaap en ligt vaak wakker. Bewegingen zijn traag. Er is hoofdpijn, buikpijn en flankpijn. Je bent lethargisch oftewel emotieloos. \n\n Burn out herstel van de Rock Bottom Burn out begint met heel veel rust afgewisseld met hele kleine makkelijk verteerbare voeding. Warmte applicaties met regelmaat en kruiden om de slaap te bevorderen. Behandelingen zijn nodig om de orgaansystemen aan te wakkeren en te ondersteunen. Nadat je uit het diepste dal bent kunnen andere maateregelen volgen naar gelang de situatie van dat moment \n\n Bovendien heb je een Burn out Shutdown \n\n Bij de Burn out Shutdown stoppen alle organische lichaamsprocessen, een voor een, met functioneren. Dit is een 3e graads Burn out met een zeer laag energieniveau en bijna altijd een mentale achtergrond. \n\n De symptomen: Er is lage rugpijn, een houdingsverandering naar de organen die zo goed als stil zijn komen te liggen. Andere symptomen kunnen zijn kortademigheid, hoofdpijnen, pijnlijke verkrampte spieren, geen eetlust of eten niet kunnen verdragen, koude gevoelens en buikkrampen. \n\n Burn out herstel van de Burn out Shutdown vraagt om therapeutische ondersteuning om de orgaansystemen weer op gang te krijgen, veel warmte, de juiste voeding en een gedoseerde lichte activatie naast heel veel rust. Nadat je uit de meest erge situatie is, kunnen andere maatregelen volgen naar gelang van de situatie van dat moment.'
      case 'De Chaotic/Hypersensitive Burnout':
        return 'De chaotic burn out is een 2e graads Burn out waarbij de geest geen rust meer kan vinden en van hot naar haar gaat en continu het al lage energieniveau gebruikt, ook tijdens rustmomenten. \n\n Jouw burn out symptomen, geen puf om iets te doen, gevoelens van oververmoeidheid met een rusteloze geest. Rust willen nemen, maar geen rust voelen. Slechte nachtrust. Gevoelens van paniek en agressie. \n\n Jouw burn out herstel bestaat niet alleen uit het nemen van rust en het gradueel opbouwen van energie, maar een zwaartepunt ligt ook voornamelijk bij het tot rust brengen van jouw geest.\n\n Bovendien heb je een Hypersensitive Burn out \n\n Bij de Hypersensitive Burn out bestaat een hogere gevoeligheid voor lichamelijke en/of geestelijke prikkels naast de enorme oververmoeidheid. \n\n ouw burn out symptomen: Jouw lage energieniveau is doorgedrongen in je gevoeligheid. Dit resulteert in daadwerkelijke verhoogde allergiegraad van het lichaam met allerlei allergische reacties zoals, kortademigheid, rode vlekken, bulten en nog veel meer. Doordat het afweersysteem met histaminereacties te heftig reageert op stoffen van buitenaf.  \n\n Bij deze Burn out kan ook een verhoogde geestelijke gevoeligheid spelen. Dit kan alleen of samen met de lichamelijke allergie gaan. Deze geestelijke overgevoeligheid kenmerkt zich door het niet kunnen verdragen van prikkels van buitenaf zoals prikkels van licht, geluid en beweging.  Deze vorm van overgevoeligheid wordt dan ook wel de allergy for life genoemd. \n\n Jouw herstel van de Hypersensitive burn out bestaat uit het nemen van rust en gradueel opbouwen van energie. Ten aanzien van de voeding, moet de voeding waarvoor jij allergisch bent vermeden worden of in een opneembare vorm worden aangeboden. Darmzuivering is ook een aspect wat aandacht vraagt. Fysieke prikkels moeten ook worden vermeden tot een gradatie waarbij ze de rust niet verstoren. In de opbouw van energie moet ook een opbouw volgen waarbij prikkels weer hanteerbaar zijn en voeding weer verteerbaar is.'
      case '2e Graads Overload Burn out' || '3e Graads Overload Burn out':
        // Code for this is embedded in the TSX section
    }
    return 'Deze test is samengesteld om een antwoord te geven op je situatie van vermoeidheid. Jouw uitslagen zijn zodanig dat we geen uitspraak kunnen doen. Wil je hier meer over weten neem dan contact met ons op.'
  }
  const getJSXOfResult = () => {
    switch (result.type) {
      case 'De Overload Burnout':
        return <p className={`text-start text-xl`}>Jouw Burn out is een 1e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten.<br/><br/> Jouw burn out symptomen : oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust <br/><br/> Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maar wanneer je met een normale burn out voldoende rust krijgt, gaat het met jouw al snel zichtbaar beter. <br/><br/> Jouw burn out herstel bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden.</p>
      case 'De Chaotic Burnout':
        return <p className={`text-start text-xl`}>De chaotic burn out is een 2e graads Burn out waarbij de geest geen rust meer kan vinden en van hot naar haar gaat en continu het al lage energieniveau gebruikt, ook tijdens rustmomenten. <br/><br/> Jouw burn out symptomen, geen puf om iets te doen, gevoelens van oververmoeidheid met een rusteloze geest. Rust willen nemen, maar geen rust voelen. Slechte nachtrust. Gevoelens van paniek en agressie. <br/><br/> Jouw burn out herstel bestaat niet alleen uit het nemen van rust en het gradueel opbouwen van energie, maar een zwaartepunt ligt ook voornamelijk bij het tot rust brengen van jouw geest.</p>
      case 'De Hypersensitive Burnout':
        return <p className={`text-start text-xl`}>Jouw burn out is een 2e graads Burn out. Bij deze Burn out bestaat een hogere gevoeligheid voor lichamelijke en/of geestelijke prikkels naast de enorme oververmoeidheid.<br/><br/> Burn out symptomen: Jouw lage energieniveau is doorgedrongen in je gevoeligheid. Dit resulteert in daadwerkelijke verhoogde allergiegraad van het lichaam met allerlei allergische reacties zoals, kortademigheid, rode vlekken, bulten en nog veel meer. Doordat het afweersysteem met histaminereacties te heftig reageert op stoffen van buitenaf.<br/><br/> Bij deze Burn out kan ook een verhoogde geestelijke gevoeligheid spelen. Dit kan alleen of samen met de lichamelijke allergie gaan. Deze geestelijke overgevoeligheid kenmerkt zich door het niet kunnen verdragen van prikkels van buitenaf zoals prikkels van licht, geluid en beweging.  Deze vorm van overgevoeligheid wordt dan ook wel de allergy for life genoemd. <br/><br/> Jouw herstel van de Hypersensitive burn out bestaat uit het nemen van rust en gradueel opbouwen van energie. Ten aanzien van de voeding, moet de voeding waarvoor jij allergisch bent vermeden worden of in een opneembare vorm worden aangeboden. Darmzuivering is ook een aspect wat aandacht vraagt. Fysieke prikkels moeten ook worden vermeden tot een gradatie waarbij ze de rust niet verstoren. In de opbouw van energie moet ook een opbouw volgen waarbij prikkels weer hanteerbaar zijn en voeding weer verteerbaar is.</p>
      case 'De Rockbottom Burnout':
        return <p className={`text-start text-xl`}>De rock Bottom Burn out is wat we noemen een 3e graads Burn out. Jouw energie is gewoon op. Er is ook onvoldoende energie om bijvoorbeeld voeding in lichaam bruikbare energie om te zetten’ <br/><br/> Jouw burn out symptomen: je bent meer dan oververmoeid. Je bent gewoon op. hebt geen eetlust, een zeer onrustige slaap en ligt vaak wakker. Bewegingen zijn traag. Er is hoofdpijn, buikpijn en flankpijn. Je bent lethargisch oftewel emotieloos. <br/><br/> Jouw burn out herstel van de Rock Bottom Burn out begint met heel veel rust afgewisseld met hele kleine makkelijk verteerbare voeding. Warmte applicaties met regelmaat en kruiden om de slaap te bevorderen. Behandelingen zijn nodig om de orgaansystemen aan te wakkeren en te ondersteunen. Nadat je uit het diepste dal bent kunnen andere maateregelen volgen naar gelang de situatie van dat moment</p>
      case 'De Burnout Shutdown':
        return <p className={`text-start text-xl`}>Bij de Burn out Shutdown stoppen alle organische lichaamsprocessen, een voor een, met functioneren. Dit is een 3e graads Burn out met een zeer laag energieniveau en bijna altijd een mentale achtergrond. <br/><br/> Jouw burn out symptomen: Je ervaart in zeer hoge mate oververmoeidheid. Er is een onrustige slaap met veel wakker worden. Er is lage rugpijn, een houdingsverandering naar de organen die zo goed als stil zijn komen te liggen. Andere symptomen kunnen zijn kortademigheid, hoofdpijnen, pijnlijke verkrampte spieren, geen eetlust of eten niet kunnen verdragen, koude gevoelens en buikkrampen. <br/><br/> Jouw herstel van de Burn out Shutdown vraagt om therapeutische ondersteuning om de orgaansystemen weer op gang te krijgen, veel warmte, de juiste voeding en een gedoseerde lichte activatie naast heel veel rust. Nadat je uit de meest erge situatie bent, kunnen andere maatregelen volgen naar gelang van de situatie van dat moment.</p>
      case 'De Burnout/Rockbottom Shutdown':
        return <p className={`text-start text-xl`}>De Rock Bottom Burn out is wat we noemen een 3e graads Burn out. Jouw energie is gewoon op. Er is ook onvoldoende energie om bijvoorbeeld voeding in lichaam bruikbare energie om te zetten’ <br/><br/> Jouw burn out symptomen: je bent meer dan oververmoeid. Je bent gewoon op.  Je hebt geen eetlust, hebt  een zeer onrustige slaap en ligt vaak wakker. Bewegingen zijn traag. Er is hoofdpijn, buikpijn en flankpijn. Je bent lethargisch oftewel emotieloos. <br/><br/> Burn out herstel van de Rock Bottom Burn out begint met heel veel rust afgewisseld met hele kleine makkelijk verteerbare voeding. Warmte applicaties met regelmaat en kruiden om de slaap te bevorderen. Behandelingen zijn nodig om de orgaansystemen aan te wakkeren en te ondersteunen. Nadat je uit het diepste dal bent kunnen andere maateregelen volgen naar gelang de situatie van dat moment <br/><br/> Bovendien heb je een Burn out Shutdown <br/><br/> Bij de Burn out Shutdown stoppen alle organische lichaamsprocessen, een voor een, met functioneren. Dit is een 3e graads Burn out met een zeer laag energieniveau en bijna altijd een mentale achtergrond. <br/><br/> De symptomen: Er is lage rugpijn, een houdingsverandering naar de organen die zo goed als stil zijn komen te liggen. Andere symptomen kunnen zijn kortademigheid, hoofdpijnen, pijnlijke verkrampte spieren, geen eetlust of eten niet kunnen verdragen, koude gevoelens en buikkrampen. <br/><br/> Burn out herstel van de Burn out Shutdown vraagt om therapeutische ondersteuning om de orgaansystemen weer op gang te krijgen, veel warmte, de juiste voeding en een gedoseerde lichte activatie naast heel veel rust. Nadat je uit de meest erge situatie is, kunnen andere maatregelen volgen naar gelang van de situatie van dat moment.</p>
      case 'De Chaotic/Hypersensitive Burnout':
        return <p className={`text-start text-xl`}>De chaotic burn out is een 2e graads Burn out waarbij de geest geen rust meer kan vinden en van hot naar haar gaat en continu het al lage energieniveau gebruikt, ook tijdens rustmomenten. <br/><br/> Jouw burn out symptomen, geen puf om iets te doen, gevoelens van oververmoeidheid met een rusteloze geest. Rust willen nemen, maar geen rust voelen. Slechte nachtrust. Gevoelens van paniek en agressie. <br/><br/> Jouw burn out herstel bestaat niet alleen uit het nemen van rust en het gradueel opbouwen van energie, maar een zwaartepunt ligt ook voornamelijk bij het tot rust brengen van jouw geest.<br/><br/> Bovendien heb je een Hypersensitive Burn out <br/><br/> Bij de Hypersensitive Burn out bestaat een hogere gevoeligheid voor lichamelijke en/of geestelijke prikkels naast de enorme oververmoeidheid. <br/><br/> ouw burn out symptomen: Jouw lage energieniveau is doorgedrongen in je gevoeligheid. Dit resulteert in daadwerkelijke verhoogde allergiegraad van het lichaam met allerlei allergische reacties zoals, kortademigheid, rode vlekken, bulten en nog veel meer. Doordat het afweersysteem met histaminereacties te heftig reageert op stoffen van buitenaf.  <br/><br/> Bij deze Burn out kan ook een verhoogde geestelijke gevoeligheid spelen. Dit kan alleen of samen met de lichamelijke allergie gaan. Deze geestelijke overgevoeligheid kenmerkt zich door het niet kunnen verdragen van prikkels van buitenaf zoals prikkels van licht, geluid en beweging.  Deze vorm van overgevoeligheid wordt dan ook wel de allergy for life genoemd. <br/><br/> Jouw herstel van de Hypersensitive burn out bestaat uit het nemen van rust en gradueel opbouwen van energie. Ten aanzien van de voeding, moet de voeding waarvoor jij allergisch bent vermeden worden of in een opneembare vorm worden aangeboden. Darmzuivering is ook een aspect wat aandacht vraagt. Fysieke prikkels moeten ook worden vermeden tot een gradatie waarbij ze de rust niet verstoren. In de opbouw van energie moet ook een opbouw volgen waarbij prikkels weer hanteerbaar zijn en voeding weer verteerbaar is.</p>
      case '2e Graads Overload Burn out':
        return <p>Jouw Burn out is een 2e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten.<br/><br/>Jouw burn out symptomen : oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust
        Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maar wanneer je met een normale burn out voldoende rust krijgt, gaat het met jouw al snel zichtbaar beter.<br/><br/>Jouw burn out herstel bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden.<br/><br/>Je systemen functioneren nog maar je bent op het randje van een zware Burn out. Het is belangrijk hier snel actie in te ondernemen en de situatie niet te onderschatten.</p>
      case '3e Graads Overload Burn out':
        return <p>Jouw Burn out is een 3e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten.<br/><br/>Jouw burn out symptomen : oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust<br/><br/>Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maarwanneer je met een normale burn out voldoende rust krijgt, gaat het met jouw al snel zichtbaar beter.<br/><br/>Jouw burn out herstel bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden.<br/><br/>Je systemen functioneren nog maar je bent op het randje van een zware Burn out. Het is belangrijk hier
        snel actie in te ondernemen en de situatie niet te onderschatten.</p>
    }
  }
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    (document.getElementById('placeholder') as HTMLSpanElement)?.classList.add('shrink');
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      (document.getElementById('placeholder') as HTMLSpanElement)?.classList.remove('shrink');
    }
  };
  const [page, setPage] = React.useState<'Home' | 'How' | 'Quiz'>('Home')
  return (
    <div className="bg-primary flex flex-col justify-center items-center w-full min-h-screen font-primary">
      <div className="w-full h-[72px] relative border-b-buttonBorder border-b-[1px] bg-F3EEE7 flex justify-between items-center px-24 lg:px-4 py-8">
          <img src={Logo.src} className='h-[72px]'/>
          <button onClick={()=>{window.open('https://amantiya.com/nl/')}} className='border-[1px] border-buttonBorder transition duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2'>
            Terug
          </button>
        {/*
        <div className='grid grid-cols-3 gap-4 w-full'>
          <div className=''/>  
          <div className='flex justify-center items-center'>
            <img src={Logo.src} className='h-[85px]'/>
          </div>
          <div className='flex justify-end items-center'>
            <button onClick={()=>{window.open('https://amantiya.com/')}} className='border-[1px] border-buttonBorder transition duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2 w-48'>
              Terug
            </button>
          </div>
        </div>
        <div className='flex flex-row mt-4 justify-center items-center w-full'>
          <h1 className='text-black mx-3.5 font-secondary border-b-[1px] border-transparent pb-6 transition duration-500 hover:border-black cursor-pointer' onClick={()=>{window.open("https://amantiya.com/")}}>AMANTIYA &gt;</h1>
          <h1 className='text-black mx-3.5 font-secondary border-b-[1px] border-transparent pb-6 transition duration-500 hover:border-black cursor-pointer' onClick={()=>{window.open("https://amantiya.com/methode/")}}>Methode</h1>
          <h1 className='text-black mx-3.5 font-secondary border-b-[1px] border-transparent pb-6 transition duration-500 hover:border-black cursor-pointer' onClick={()=>{window.open("https://amantiya.com/programma/")}}>Programma</h1>
          <h1 className='text-black mx-3.5 font-secondary border-b-[1px] border-transparent pb-6 transition duration-500 hover:border-black cursor-pointer' onClick={()=>{window.open("https://amantiya.com/ons-resort/")}}>Ons Resort</h1>
          <h1 className='text-black mx-3.5 font-secondary border-b-[1px] border-transparent pb-6 transition duration-500 hover:border-black cursor-pointer' onClick={()=>{window.open("https://amantiya.com/over-ons/")}}>Over ons</h1>
          <h1 className='text-black mx-3.5 font-secondary border-b-[1px] border-transparent pb-6 transition duration-500 hover:border-black cursor-pointer' onClick={()=>{window.open("https://amantiya.com/faq/")}}>Faq</h1>
          <h1 className='text-black mx-3.5 font-secondary border-b-[1px] border-transparent pb-6 transition duration-500 hover:border-black cursor-pointer' onClick={()=>{window.open("https://amantiya.com/blog/")}}>Blog</h1>
          <h1 className='text-black mx-3.5 font-secondary border-b-[1px] border-transparent pb-6 transition duration-500 hover:border-black cursor-pointer' onClick={()=>{window.open("https://amantiya.com/contact/")}}>Contact</h1>
        </div>
        */}
      </div>
      <div className='min-h-screen flex flex-col justify-center w-full items-center lg:px-0'>
        {page == 'Quiz' && result.algemeenGrads == -1 ?
        <div className='flex-col flex justify-center w-7/12 lg:w-full items-center lg:items-start border-[20px] p-8 lg:p-0 border-white' style={{ height: '492px', overflow: 'auto' }}>
          <div className='p-8 lg:p-0 flex justify-center items-center flex-col'>
            <button className='mt-4 border-[1px] border-buttonBorder hover:cursor-default bg-button text-text rounded-[1px] p-2 px-3 text-lg'>
              {question + 1}/{questions.length}
            </button>
            <h1 className='text-3xl mt-4 max-w-[40rem] text-center'>{questions[question].question}</h1>
            <div className='flex flex-col justify-center mt-2 items-center'>
              <div className='flex justify-center items-center flex-row'>
                {questionLen.map((qL, index) => (
                  <div key={index} className='flex flex-row'>
                    <h1 className={`text-2xl lg:text-base mx-1 font-sans ${qL == 10 || qL == 1 ? 'font-semibold' : ''} transition duration-500 active:scale-90 cursor-pointer ${questions[question].answer == qL ? 'scale-[130%] font-semibold' : 'hover:scale-110'}`} onClick={()=>{
                      let oldQuestions = [...questions]
                      oldQuestions[question].answer = qL
                      setQuestions(oldQuestions)
                    }}>{qL}</h1>
                    <h1 className={`text-2xl lg:text-base mx-1 font-sans ${qL == 10 ? 'hidden' : ''}`}>-</h1>
                  </div>
                ))}
              </div>
              <div className='flex justify-between items-center w-full'>
                <span className='text-md mr-2 mt-1'>{questions[question].startVal}</span>
                <span className='text-md ml-2'>{questions[question].endVal}</span>
              </div>
            </div>
            {question + 1 == questions.length ? 
            
            <button className={`text-xl mt-4 border-[1px] border-buttonBorder transition mx-4 duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2 ${areAnswersFilled(question) ? '' : 'pointer-events-none cursor-not-allowed opacity-50'}`} onClick={handleFinalClick}>
              Indienen
            </button>
            :
            <button className={`text-xl mt-4 border-[1px] border-buttonBorder transition mx-4 duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2 ${areAnswersFilled(question) ? '' : 'pointer-events-none cursor-not-allowed opacity-50'}`} onClick={()=>{setQuestion(question + 1)}}>
              Verder
            </button>}
          </div>
        </div>
        : page == 'Quiz' ?   
        submitted ?
        <div className='mx-24 lg:mx-4 flex-col flex justify-center items-center w-9/12 border-[20px] border-white'>
          <div className='w-5/6 h-full p-8 flex justify-end items-center flex-col'>
            <img src={Logo.src} className='h-32 mb-8'/>
            <h1 className='text-3xl text-center'>Bedankt voor het maken van onze Burn out test.</h1>
            <h1 className='text-2xl text-center'>U ontvangt van ons binnen elke minuten een email met de volledige uitslag.</h1>
          </div>
        </div>
        : <div className='min-h-screen mx-24 lg:mx-4 flex-col flex justify-center items-center p-8 border-[20px] border-white'>
        <div className='w-full h-full p-8 flex justify-end items-center flex-col'>
          <h1 className='font-primary text-start text-3xl w-full'>{getHeadingOfResult()}</h1>
          {result.type == 'Geen Burn out' ?
          <p className={`text-start text-xl`}>Je totale energiebeeld geeft aan dat je {result.type}. Je energie is hoog genoeg om zelf te herstellen van eventuele klachten die je zou kunnen hebben. Zorg voor een gezond levensritme, met voldoende rust, beweging en gezond eten. Zoek je een methode om jezelf te ontwikkelen, je levensritme en je energie te leren kennen en onder controle leren brengen. We bieden een online begeleiding en training van je eigen energie via de cursus “De Yuan methode – Eén met je eigen energie”.<span className='font-bold' onClick={()=>{window.open('http://amantiya.com/wp-content/uploads/2024/06/Cursus-leren-werken-met-Energie.pdf')}}>Klik hier</span> voor meer info.</p>
          :
          getJSXOfResult()
          }
          <h1 className={`text-lg text-start mt-6 font-primary`}>Uit de test kunnen wij nog meer informatie over je level van energie en over jouw specifieke kenmerken halen. Wil je dit ontvangen dan laten we dit samenstellen en sturen we het per email gratis naar je toe.</h1>
          <div className='flex justify-start w-full items-start flex-col'>
            <input onChange={(e)=>{setName(e.target.value)}} className='bg-white mt-2 border-[1px] border-slate-300 p-3 placeholder-slate-500 focus:outline-none w-96' placeholder='Naam'/>
            <input onChange={(e)=>{setEmail(e.target.value)}} className='bg-white mt-2 border-[1px] border-slate-300 p-3 placeholder-slate-500 focus:outline-none w-96' placeholder='Email'/>
            <div className='relative w-96 mt-2'>
              <input
                onChange={(e) => setTelephone(e.target.value)}
                onFocus={(e) => handleFocus(e)}
                onBlur={(e) => handleBlur(e)}
                className='bg-white border-[1px] border-slate-300 p-3 focus:outline-none w-full'
                id='phoneNum'
              />
              <span
                className="req_placeholder absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 pointer-events-none transition-all duration-200"
                id='placeholder'
              >
                Telefoon <span className='text-xs ml-1'>niet verplicht</span>
              </span>
            </div>
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
        <div className='flex-row flex justify-center p-2 items-center w-9/12 lg:w-full lg:w-full border-[20px] border-white p-0'>
          <div className='flex justify-start w-full lg:w-full items-center flex-row'>
            <img src={Mock.src} className='w-[300px] rounded lg:hidden h-auto mr-12' alt='Mockup Image'/> 
            <div className='flex flex-col justify-start items-start'>
              <h1 className='text-5xl w-full text-start'>Burn out test</h1>
              <h1 className='text-xl w-full text-start'>Doe de test en zie wat wij je kunnen vertellen over jouw situatie.<br/>Je krijgt van ons direct antwoord.</h1>
              <ul className='text-xl ml-4 mt-8 list-disc'>
                <li> Heb ik een Burn out? </li>
                <li className='mt-2'>Zo ja, wat voor soort Burn out</li>
                <li className='mt-2'>Over je energielevel</li>
              </ul>
              <button onClick={()=>{setPage('How')}} className='mt-8 border-[1px] border-buttonBorder transition duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2'>
                Start test
              </button>
              <h1 className='text-md mt-4'>De test duurt circa 10 minuten</h1>
            </div>
          </div>
        </div> : page == 'How' ? 
        
        <div className='flex-col flex justify-center w-9/12 lg:w-full items-center lg:items-start border-[20px] p-8 border-white'>
          <h1 className='text-5xl text-start w-full lg:text-3xl lg:text-start lg:w-full'>Hoe de test werkt</h1>          
          <h1 className='text-xl mt-2 text-start w-full lg:w-full lg:text-start'>Antwoordmogelijkheden zijn cijfers tussen 1 en 10, cijfer 10 is volledig waar en cijfer 1 is volledig niet waar of cijfer 10 is hoge energie en 1 zeer lage energie.<br/> <br/> Test en gradeer iedere bewering met je eerste gevoel en het eerste cijfer wat binnenvalt zet je neer. Niet twijfelen en terugkijken, dat geeft alleen verwarring.</h1>
          <div className='flex items-start justify-start flex-row w-full'>
            <button onClick={()=>{setPage('Quiz')}} className='mt-4 self-start border-[1px] border-buttonBorder transition duration-500 hover:bg-buttonBgHover bg-button text-text rounded-[1px] px-10 py-2'>
              Verder
            </button>
          </div>
        </div> : ''}
      </div>
    </div>
  );
}
