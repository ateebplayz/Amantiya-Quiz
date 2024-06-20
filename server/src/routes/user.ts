import express, {Request, Response, NextFunction} from 'express'
import { sendEmail } from '../modules/email'
import { adminCollection, userCollection } from '../modules/mongo'
import jwt from 'jsonwebtoken'
import { Admin } from '../modules/types'
import dotenv from 'dotenv'
dotenv.config()
interface DecodedToken extends Admin {
    _id: string;
}
async function verifyToken(token: string): Promise<{data: string, code: number}>  {
    try {
        const dataset = jwt.verify(token, process.env.JWTKEY as string) as DecodedToken
        const doc = await adminCollection.findOne({username: dataset.username, password: dataset.password})
        if(doc) {
            return {data: 'Success', code: 200}
        } else return {data: 'Admin not found', code: 404}
    } catch (e) {
        console.log(e)
        return {data: 'Invalid JWT Token Structure', code: 400}
    }
}

const router = express.Router()

router.get('/Helloworld', (req, res) => {
    return res.json({data: 'Hello World'})
})

router.post('/create', async (req,res) => {
    const data = req.body as {name: string, email: string, number: string, energyLevel: {
        energielevel: string,
        activerende: string,
        blokkade: string,
        focus: string,
        hyper: string,
        energiereserves: string
    }, intake: 'y' | 'n'}
    if(data.intake !== 'y' && data.intake !== 'n') return res.json({data: 'intake must be either y or n'})
    if(!data.name) {
        return res.json({data: 'No Name Provided', code: 400})
    }
    if(!data.email) {
        return res.json({data: 'No Email Provided', code: 400})
    }
    if(!data.energyLevel.energielevel || isNaN(Number(data.energyLevel.energielevel))) {
        return res.json({data: 'No Energy Level Provided', code: 400})
    }
    if(!data.energyLevel.activerende || isNaN(Number(data.energyLevel.activerende))) {
        return res.json({data: 'No Activerende energy Provided', code: 400})
    }
    if(!data.energyLevel.blokkade || isNaN(Number(data.energyLevel.blokkade))) {
        return res.json({data: 'No Blokkade value Provided', code: 400})
    }
    if(!data.energyLevel.focus || isNaN(Number(data.energyLevel.focus))) {
        return res.json({data: 'No Focus Value Provided', code: 400})
    }
    if(!data.energyLevel.hyper || isNaN(Number(data.energyLevel.hyper))) {
        return res.json({data: 'No Hypersensitiv value Provided', code: 400})
    }
    if(!data.energyLevel.energiereserves || isNaN(Number(data.energyLevel.energiereserves))) {
        return res.json({data: 'No Energiereserves value Provided', code: 400})
    }

    let result = {  
        algemeenGrads: 0,
        type: '2e Graads Overload Burn out',
        energyLevel: data.energyLevel
    }
    if (Number(data.energyLevel.energielevel) <= 2.8 && Number(data.energyLevel.energielevel) >= 2.2) {
        result.algemeenGrads = 1;
        result.type = 'De Overload Burnout';
    } else if (Number(data.energyLevel.energielevel) <= 2.2 && Number(data.energyLevel.energielevel) >= 1.6) {
        result.algemeenGrads = 2;
        // Specific checks for 2e graads types
        if (Number(data.energyLevel.focus) <= 1.5 && Number(data.energyLevel.hyper) <= 1.5) {
            result.type = 'De Chaotic/Hypersensitive Burnout';
        } else if (Number(data.energyLevel.focus) <= 1.5) {
        result.type = 'De Chaotic Burnout';
    } else if (Number(data.energyLevel.hyper) <= 1.5) {
        result.type = 'De Hypersensitive Burnout';
    }
    } else if (Number(data.energyLevel.energielevel) <= 1.5) {
        result.algemeenGrads = 3;
        // Specific checks for 3e graads types
        if (Number(data.energyLevel.energiereserves) <= 1.5 && Number(data.energyLevel.blokkade) <= 1) {
            result.type = 'De Burnout/Rockbottom Shutdown';
        } else if (Number(data.energyLevel.blokkade) <= 1) {
            result.type = 'De Burnout Shutdown';
        } else if (Number(data.energyLevel.energiereserves) <= 1.5) {
            result.type = 'De Rockbottom Burnout';
        }
    }
    if (result.type == '2e Graads Overload Burn out') {
        if(result.algemeenGrads == 2 || result.algemeenGrads == 3)
        result.type = `${result.algemeenGrads}e Graads Overload Burn out`
        else result.type = `Geen Burn out`
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
        }
        // This is impossible to get.
        return 'Uit je antwoorden kunnen wij geen conclusie halen.'
      }
      const getParagraphOfResult = () => {
        switch (result.type) {
          case 'De Overload Burnout':
            return "Jouw Burn out is een 1e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten. Jouw burn out symptomen : oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maar wanneer je met een normale burn out voldoende rust krijgt, gaat het met jouw al snel zichtbaar beter. Jouw burn out herstel bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden."
          case 'De Chaotic Burnout':
            return "De chaotic burn out is een 2e graads Burn out waarbij de geest geen rust meer kan vinden en van hot naar haar gaat en continu het al lage energieniveau gebruikt, ook tijdens rustmomenten. Jouw burn out symptomen, geen puf om iets te doen, gevoelens van oververmoeidheid met een rusteloze geest. Rust willen nemen, maar geen rust voelen. Slechte nachtrust. Gevoelens van paniek en agressie. Jouw burn out herstel bestaat niet alleen uit het nemen van rust en het gradueel opbouwen van energie, maar een zwaartepunt ligt ook voornamelijk bij het tot rust brengen van jouw geest."
          case 'De Hypersensitive Burnout':
            return "Jouw burn out is een 2e graads Burn out. Bij deze Burn out bestaat een hogere gevoeligheid voor lichamelijke en/of geestelijke prikkels naast de enorme oververmoeidheid.  Burn out symptomen: Jouw lage energieniveau is doorgedrongen in je gevoeligheid. Dit resulteert in daadwerkelijke verhoogde allergiegraad van het lichaam met allerlei allergische reacties zoals, kortademigheid, rode vlekken, bulten en nog veel meer. Doordat het afweersysteem met histaminereacties te heftig reageert op stoffen van buitenaf. Bij deze Burn out kan ook een verhoogde geestelijke gevoeligheid spelen. Dit kan alleen of samen met de lichamelijke allergie gaan. Deze geestelijke overgevoeligheid kenmerkt zich door het niet kunnen verdragen van prikkels van buitenaf zoals prikkels van licht, geluid en beweging. Deze vorm van overgevoeligheid wordt dan ook wel de allergy for life genoemd. Jouw herstel van de Hypersensitive burn out bestaat uit het nemen van rust en gradueel opbouwen van energie. Ten aanzien van de voeding, moet de voeding waarvoor jij allergisch bent vermeden worden of in een opneembare vorm worden aangeboden. Darmzuivering is ook een aspect wat aandacht vraagt. Fysieke prikkels moeten ook worden vermeden tot een gradatie waarbij ze de rust niet verstoren. In de opbouw van energie moet ook een opbouw volgen waarbij prikkels weer hanteerbaar zijn en voeding weer verteerbaar is."
          case 'De Rockbottom Burnout':
            return "De rock Bottom Burn out is wat we noemen een 3e graads Burn out. Jouw energie is gewoon op. Er is ook onvoldoende energie om bijvoorbeeld voeding in lichaam bruikbare energie om te zetten’   Jouw burn out symptomen: je bent meer dan oververmoeid. Je bent gewoon op. hebt geen eetlust, een zeer onrustige slaap en ligt vaak wakker. Bewegingen zijn traag. Er is hoofdpijn, buikpijn en flankpijn. Je bent lethargisch oftewel emotieloos.   Jouw burn out herstel van de Rock Bottom Burn out begint met heel veel rust afgewisseld met hele kleine makkelijk verteerbare voeding. Warmte applicaties met regelmaat en kruiden om de slaap te bevorderen. Behandelingen zijn nodig om de orgaansystemen aan te wakkeren en te ondersteunen. Nadat je uit het diepste dal bent kunnen andere maateregelen volgen naar gelang de situatie van dat moment"
          case 'De Burnout Shutdown':
            return "Bij de Burn out Shutdown stoppen alle organische lichaamsprocessen, een voor een, met functioneren. Dit is een 3e graads Burn out met een zeer laag energieniveau en bijna altijd een mentale achtergrond. Jouw burn out symptomen: Je ervaart in zeer hoge mate oververmoeidheid. Er is een onrustige slaap met veel wakker worden. Er is lage rugpijn, een houdingsverandering naar de organen die zo goed als stil zijn komen te liggen. Andere symptomen kunnen zijn kortademigheid, hoofdpijnen, pijnlijke verkrampte spieren, geen eetlust of eten niet kunnen verdragen, koude gevoelens en buikkrampen. Jouw herstel van de Burn out Shutdown vraagt om therapeutische ondersteuning om de orgaansystemen weer op gang te krijgen, veel warmte, de juiste voeding en een gedoseerde lichte activatie naast heel veel rust. Nadat je uit de meest erge situatie bent, kunnen andere maatregelen volgen naar gelang van de situatie van dat moment."
          case 'De Burnout/Rockbottom Shutdown':
            return "De Rock Bottom Burn out is wat we noemen een 3e graads Burn out. Jouw energie is gewoon op. Er is ook onvoldoende energie om bijvoorbeeld voeding in lichaam bruikbare energie om te zetten’. Jouw burn out symptomen: je bent meer dan oververmoeid. Je bent gewoon op.  Je hebt geen eetlust, hebt  een zeer onrustige slaap en ligt vaak wakker. Bewegingen zijn traag. Er is hoofdpijn, buikpijn en flankpijn. Je bent lethargisch oftewel emotieloos. Burn out herstel van de Rock Bottom Burn out begint met heel veel rust afgewisseld met hele kleine makkelijk verteerbare voeding. Warmte applicaties met regelmaat en kruiden om de slaap te bevorderen. Behandelingen zijn nodig om de orgaansystemen aan te wakkeren en te ondersteunen. Nadat je uit het diepste dal bent kunnen andere maateregelen volgen naar gelang de situatie van dat moment Bovendien heb je een Burn out Shutdown Bij de Burn out Shutdown stoppen alle organische lichaamsprocessen, een voor een, met functioneren. Dit is een 3e graads Burn out met een zeer laag energieniveau en bijna altijd een mentale achtergrond. De symptomen: Er is lage rugpijn, een houdingsverandering naar de organen die zo goed als stil zijn komen te liggen. Andere symptomen kunnen zijn kortademigheid, hoofdpijnen, pijnlijke verkrampte spieren, geen eetlust of eten niet kunnen verdragen, koude gevoelens en buikkrampen.   Burn out herstel van de Burn out Shutdown vraagt om therapeutische ondersteuning om de orgaansystemen weer op gang te krijgen, veel warmte, de juiste voeding en een gedoseerde lichte activatie naast heel veel rust. Nadat je uit de meest erge situatie is, kunnen andere maatregelen volgen naar gelang van de situatie van dat moment."
          case 'De Chaotic/Hypersensitive Burnout':
            return "De chaotic burn out is een 2e graads Burn out waarbij de geest geen rust meer kan vinden en van hot naar haar gaat en continu het al lage energieniveau gebruikt, ook tijdens rustmomenten. Jouw burn out symptomen, geen puf om iets te doen, gevoelens van oververmoeidheid met een rusteloze geest. Rust willen nemen, maar geen rust voelen. Slechte nachtrust. Gevoelens van paniek en agressie. Jouw burn out herstel bestaat niet alleen uit het nemen van rust en het gradueel opbouwen van energie, maar een zwaartepunt ligt ook voornamelijk bij het tot rust brengen van jouw geest. Bovendien heb je een Hypersensitive Burn out Bij de Hypersensitive Burn out bestaat een hogere gevoeligheid voor lichamelijke en/of geestelijke prikkels naast de enorme oververmoeidheid. ouw burn out symptomen: Jouw lage energieniveau is doorgedrongen in je gevoeligheid. Dit resulteert in daadwerkelijke verhoogde allergiegraad van het lichaam met allerlei allergische reacties zoals, kortademigheid, rode vlekken, bulten en nog veel meer. Doordat het afweersysteem met histaminereacties te heftig reageert op stoffen van buitenaf. Bij deze Burn out kan ook een verhoogde geestelijke gevoeligheid spelen. Dit kan alleen of samen met de lichamelijke allergie gaan. Deze geestelijke overgevoeligheid kenmerkt zich door het niet kunnen verdragen van prikkels van buitenaf zoals prikkels van licht, geluid en beweging.  Deze vorm van overgevoeligheid wordt dan ook wel de allergy for life genoemd. Jouw herstel van de Hypersensitive burn out bestaat uit het nemen van rust en gradueel opbouwen van energie. Ten aanzien van de voeding, moet de voeding waarvoor jij allergisch bent vermeden worden of in een opneembare vorm worden aangeboden. Darmzuivering is ook een aspect wat aandacht vraagt. Fysieke prikkels moeten ook worden vermeden tot een gradatie waarbij ze de rust niet verstoren. In de opbouw van energie moet ook een opbouw volgen waarbij prikkels weer hanteerbaar zijn en voeding weer verteerbaar is."
          case '2e Graads Overload Burn out':
            return 'Jouw Burn out is een 2e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten. Jouw burn out symptomen : oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maar wanneer je met een normale burn out voldoende rust krijgt, gaat het met jouw al snel zichtbaar beter. Jouw burn out herstel bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden. Je systemen functioneren nog maar je bent op het randje van een zware Burn out. Het is belangrijk hier snel actie in te ondernemen en de situatie niet te onderschatten.'
          case '3e Graads Overload Burn out':
            return 'Jouw Burn out is een 3e graads Burn out en komt door te lang te veel werk of te veel denkwerkwerk zonder voldoende herstelmomenten. Jouw burn out symptomen : oververmoeidheid, prikkelbaarheid, nergens geen zin in hebben, niks af willen maken en vooral snakken naar rust Natuurlijk gaat iedere vorm van ziekte en energietekort gepaard met negatieve geestelijk gevoelens, maarwanneer je met een normale burn out voldoende rust krijgt, gaat het met jouw al snel zichtbaar beter. Jouw burn out herstel bestaat voornamelijk uit het nemen van rust en op de juiste manier doseren en opbouwen van een werkbaar ritme, waarbij energie langzaam opgebouwd kan worden. Je systemen functioneren nog maar je bent op het randje van een zware Burn out. Het is belangrijk hier snel actie in te ondernemen en de situatie niet te onderschatten.'
        }
      }
    let heading = getHeadingOfResult()
    const title = `Beste ${data.name} onderstaand het volledige resultaat van uw test.`

    let text = ``
    text += `<div style="background-color: #fdfaf6;">${title}`
    text += `<br/><p><b>${heading}</b></p>`
    text += `<p>${getParagraphOfResult()}`
    text += `<p>Uw persoonlijke uitslag : </p>`

    text += `<br/><b>Energie Level: </b><br/>`

    if(Number(data.energyLevel.energielevel) <= 5 && Number(data.energyLevel.energielevel) >= 3.6) text += 'Je totale energiebeeld geeft aan dat je geen Burn out hebt. Je energie is hoog genoeg om zelf te herstellen van eventuele klachten die je hebt. Zorg voor een gezond levensritme, met voldoende rust, beweging en gezond eten. Zoek je een methode om jezelf te ontwikkelen, je levensritme en je energie te leren kennen en onder controle leren brengen. We bieden een online begeleiding en training van je eigen energie via de cursus “De Yuan methode – Eén met je eigen energie”.'
    if(Number(data.energyLevel.energielevel) <= 3.5 && Number(data.energyLevel.energielevel) >= 2.9) text += 'Je totale energiebeeld geeft aan dat je nog geen Burn out hebt. Je energie is echter wel degelijk aan de lage kant. Vraag eens advies en begeleiding van een huisarts, fysiotherapeut of personal coach. Je energie is hoog genoeg om zelf te kunnen herstellen van dit lagere energieniveau en eventuele klachten die je hebt. Zorg in ieder geval voor dat je een tandje terugneemt in de belasting van je levensritme. Zorg voor voldoende rust, een gezonde slaap, voldoende maar geen uitputtende beweging en natuurlijk een gezonde voedzame maaltijd. Wil je jezelf ontwikkelen en je levensritme en je controle over je energie beheersen dan bieden we een online begeleiding en training van je eigen energie via de cursus “De Yuan methode – Eén met je eigen energie”.' 
    if(Number(data.energyLevel.energielevel) <= 2.8 && Number(data.energyLevel.energielevel) >= 2.2) text += 'Je totale energiebeeld geeft aan dat je een hogere vermoeidheidgraad tot een eerstegraads Burn out hebt. Je bent welkom bij ons, maar je kunt er ook voor kiezen om in je eigen omgeving op je eigen resterende energie te herstellen. Het vraagt wel om aandacht en aanpak. We bieden een online begeleiding en training van je eigen energie via de cursus “De Yuan methode – Eén met je eigen energie”. Je kunt ook begeleiding zoeken bij je huisarts, je fysiotherapeut, een psychotherapeut en/of een personal trainer. Zorg dat je iemand hebt waar je vertrouwen in hebt en ga samen aan de slag om de belastende zaken uit je leven te halen, je levensritme te verbeteren en andere aanpassingen te maken.' 
    if(Number(data.energyLevel.energielevel) <= 2.1 && Number(data.energyLevel.energielevel) >= 1.6) text += 'Je totale energiebeeld geeft aan dat je een tweedegraads Burn out hebt. Het is goed om een afspraak te maken voor je herstel bij ons in Thailand. Dit moet aangepakt worden omdat je energieniveau, je levensritme, je omgevingsfactoren en je andere klachten er samen voor zorgen dat je in een vicieuze cirkel komt of al bent gekomen. Je zult dit gedegen op meerdere fronten met een centrale draad voor jou moeten oplossen. We gaan je hierbij helpen en kunnen je weer bij je gezonde eigen ik terugbrengen.' 
    if(Number(data.energyLevel.energielevel) <= 1.5) text += 'Je totale energiebeeld geeft aan dat je een derdegraads Burn out hebt. Je energieniveau is op een gevaarlijk laag level. Het is belangrijk om zo snel mogelijk actie hierin te ondernemen en een afspraak bij ons in Thailand te maken. We gaan zorgen voor je rustritme, je levensritme, de opruiming van belastende zaken. Daarna kunnen we samen werken aan je opbouw en deze langzaam maar gestaag volgens een sterk plan inzetten. Een centrale lijn hierin, waarin iedereen weet wat er gebeuren moet en volgens hetzelfde plan kan werken, is essentieel.'

    text += '<br/><br/><b>Activerende Energie: </b><br/>'
    if(Number(data.energyLevel.activerende) <= 2.2 && Number(data.energyLevel.activerende) >= 1.6) text += 'Er is een duidelijk tekort aan de energie die voor je activerende functies zorgt. Dit is de energie waarmee je iets doet, een karwei, maar ook intern voedsel omzetten, bloedsomloop en de opruiming van afvalstoffen. Het is echter nog niet zodanig dat dit een peil bereikt dat dit op de rest van je systeem een verder afbrekend effect heeft. Het herstellen van je activerende energie is wel een serieus aandachtspunt.'
    if(Number(data.energyLevel.activerende) <= 1.5) text += 'Het niveau van je activerende energie is veel te laag. Dit is de energie waarmee je iets doet, een karwei, maar ook intern voedsel omzetten, transport en schoonmaak. Dit zorgt ervoor dat je totale energie zich onvoldoende kan opbouwen, herstellen en verschonen. Het houdt het algehele niveau van je energie in een vicieuze cirkel of brengt het zelfs in een neerwaartse spiraal.'
    else text += 'Het niveau van je activerende energie is voldoende.'

    text += '<br/><br/><b>Energiereserve: </b><br/>'
    if(Number(data.energyLevel.energiereserves) <= 2.5 && Number(data.energyLevel.energiereserves) >= 1.6) text += 'Je symptomen laten zien dat je je lichaamsreserves aan het verbruiken bent zonder ze voldoende op te bouwen. Dit zijn de reserves aan bouwstoffen, afweerstoffen, transportmiddelen en energieopslag. Je kunt nog wel een bepaalde balans hierin behouden, maar wanneer je energie verder af zal nemen, zullen ook je reserves verdwijnen en zal er op dit gebied een vicieuze cirkel of zelfs negatieve spiraal ontstaan.'
    if(Number(data.energyLevel.energiereserves) <= 1.5) text += 'Je lichaamsreserves zijn zover verminderd dat ze de normale circulatie van je energie verstoren. Dit zijn de reserves aan bouwstoffen, afweerstoffen, transportmiddelen en energieopslag. Door te weinig lichamelijke reserves, brand je op van binnen en komen je organen en/of je geest te weinig tot rust. Hierdoor worden de reserves niet aangevuld en een negatieve spiraal ontstaat. Deze zal snel omgekeerd moet worden zodat je systeem niet verder achteruitgaat met als eindresultaat een complete ineenstorting.'
    else text += 'Het niveau van je energie reserve is voldoende'
    
    text += '<br/><br/><b>Blokerings niveau: </b><br/>'
    if(Number(data.energyLevel.blokkade) <= 2.5 && Number(data.energyLevel.blokkade) >= 1.7) text += 'Je bent iemand die snel alles wat om je heen gebeurt in je opneemt. Daarmee blokkeer je op lichamelijke en geestelijke stressmomenten.'
    else if(Number(data.energyLevel.blokkade) <= 1.6 && Number(data.energyLevel.blokkade) >= 1.1) text += 'De manier waarop je met dingen omgaat zorgt ervoor dat lichamelijk en emotioneel blokkeert. Ook al voel je dat niet altijd, sla je de dingen die om je heen gebeuren op en loop je daarop vast; Op je spieren, je bindweefsel, je organen en/of je bloedvoorziening.'
    else if(Number(data.energyLevel.blokkade) <= 1.0) text += 'De stress in je leven, de manier van omgaan en je ritme zorgen ervoor dat je veel te veel blokkeert in je lijf. Processen in de spieren, in de zuivering van je lichaam, in je organen en in je bloedsomloop verlopen niet zoals het hoort.'
    else text += 'Je Blokkerings niveau is in orde.'
    
    text += '<br/><br/><b>Hypersensiviteit niveau: </b><br/>'
    if(Number(data.energyLevel.hyper) <= 2.2 && Number(data.energyLevel.hyper) >= 1.6) text += 'Je gevoeligheid is hoger dan bij de gemiddelde mens. Je reageert daarom meer op de prikkels om je heen. Dit kost je energie. Je kunt deze verloren energie wel een rustige omgeving terugkrijgen.'
    else if(Number(data.energyLevel.hyper) <= 1.5 && Number(data.energyLevel.hyper) >= 1.1) text += 'Je bent eigenlijk constant overprikkeld. Dit gaat ten koste van je energieopbouw en je energiezuivering. De overprikkeling wegnemen lukt je niet in de maatschappij waarin je leeft. Beter is het om je energielevel en daarmee je tolerantie te verhogen.'
    else if(Number(data.energyLevel.hyper) <= 1.0) text += 'Je overprikkeling is op het hoogste niveau. Je energielevel en de mate van de overprikkeling houden elkaar in een zeer negatieve stand. Je gaat je terugtrekken en afzonderen waardoor de situatie alleen verslechtert. Je energie laat het echter niet toe om de ommekeer te maken. Dit moet vanuit het totale energielevel aangepakt worden.'
    else text += 'Je Hypersensinsiviteit niveau is in orde.'

    text += '<br/><br/><b>Focus niveau: </b><br/>'
    if(Number(data.energyLevel.focus) <= 2.4 && Number(data.energyLevel.focus) >= 1.6) text += 'Jezelf organiseren en je ergens op focussen is minder dan normaal. Dit hoeft nog geen problemen op te leveren, maar het is wel een aandachtspunt wat je zou kunnen aanpakken en trainen zodat er geen energie meer hierdoor verloren gaat.'
    else if(Number(data.energyLevel.focus) <= 1.5 && Number(data.energyLevel.focus) >= 1.1) text += 'Je algehele niveau van focus is beneden peil. Er zijn zeker zaken in je leven die dit negatief beïnvloeden. Het schaadt je energie. Je levensritme, rust en energieniveau moeten verbeteren om dit aan te pakken.'
    else if(Number(data.energyLevel.focus) <= 1.0) text += 'Je gebrek aan focus beïnvloedt het level van je energie en vice versa. De chaos in je hoofd en in je leven zorgen voor verder energieverlies. Alleen leren focussen of je geest tot rust brengen is niet genoeg. Er zullen zowel op lichamelijk, energetisch als geestelijk gebied verbeteringen ingezet moeten worden.'
    else text += 'Je Focus niveau is in orde.'

    text += '<h4>Let op deze uitslag geeft onze eerste bevinding. Wil je een meer diepgaande en uitgebreidere diagnose.  Vul dan je gegevens in en plan een gratis intake.</h4>'
    text += '<img src="https://i.imgur.com/jx2DOZ6.png" alt="Logo"></img>'
    text += `<div style={{borderWidth: '2px', borderColor: '#000000', borderStyle: 'solid'}}><br/><b>Met vriendelijke Groet</b>,<br/>Stanley van Lamoen<br/>www.amantiya.com<br/>+31(0)30 781 0027</div>`
    text += '</div>'
    sendEmail('AmanTiya Burn out test', data.email, 'Persoonlijk resultaat van uw burn out test', text)
    if(data.intake == 'y') sendEmail(data.name, 'info@amantiya.com', 'burn out test intake', `
        <p><b>Name</b> : ${data.name}</p><br/>    
        <p><b>Email</b> : ${data.email}</p><br/>    
        <p><b>Telefone</b> : ${data.number}</p><br/>  
        <p><b>Energielevel</b> : ${data.energyLevel.energielevel}</p><br/>  
        <p><b>Activerende</b> : ${data.energyLevel.activerende}</p><br/>  
        <p><b>Blokkade</b> : ${data.energyLevel.blokkade}</p><br/>  
        <p><b>Energiereserves</b> : ${data.energyLevel.energiereserves}</p><br/>    
        <p><b>Focus</b> : ${data.energyLevel.focus}</p><br/>    
        <p><b>Hyper</b> : ${data.energyLevel.hyper}</p><br/>    
    `)
    userCollection.insertOne({
        email: data.email,
        name: data.name,
        phone: data.number,
        energyLevel: {
            energielevel: Number(data.energyLevel.energielevel),
            activerende: Number(data.energyLevel.activerende),
            blokkade: Number(data.energyLevel.blokkade),
            focus: Number(data.energyLevel.focus),
            hyper: Number(data.energyLevel.hyper),
            energiereserves: Number(data.energyLevel.energiereserves)
        },
        time: Date.now()
    })
    console.log('User added to collection ' + data.email)

    return res.json({data: 'Success', code: 200})
})
router.get('/get', async (req,res) => {
    const token = req.query.token as string
    if(token) {
        const verificationToken = await verifyToken(token)
        if (verificationToken.code !== 200) {
            return res.json(verificationToken)
        }
    } else return res.json({data: 'Token Not Found', code: 404})
    const docs = await userCollection.find().toArray()
    let avg = {
        energielevel: 0,
        activerende: 0,
        blokkade: 0,
        focus: 0,
        hyper: 0,
        energiereserves: 0
    }
    let arrayLen = 0
    docs.forEach(d=> {
        avg.energielevel += d.energyLevel.energielevel
        avg.activerende += d.energyLevel.activerende
        avg.blokkade += d.energyLevel.blokkade
        avg.focus += d.energyLevel.focus
        avg.hyper += d.energyLevel.hyper
        avg.energiereserves += d.energyLevel.energiereserves
        arrayLen += 1
    })
    avg.energielevel = Number((avg.energielevel / arrayLen).toFixed(1))
    avg.activerende = Number((avg.activerende / arrayLen).toFixed(1))
    avg.blokkade = Number((avg.blokkade / arrayLen).toFixed(1))
    avg.focus = Number((avg.focus / arrayLen).toFixed(1))
    avg.hyper = Number((avg.hyper / arrayLen).toFixed(1))
    avg.energiereserves = Number((avg.energiereserves / arrayLen).toFixed(1))
    return res.json({data: {
        data: docs,
        average: avg
    }, code: 200})
})

router.get('/delete', async (req,res) => {
    const token = req.query.token as string
    const docEmail = req.query.email as string
    if(token) {
        const verificationToken = await verifyToken(token)
        if (verificationToken.code !== 200) {
            return res.json(verificationToken)
        }
    } else return res.json({data: 'Token Not Found', code: 404})
    userCollection.deleteOne({email: docEmail})
    return res.json({data: {
        data: 'Success'
    }, code: 200})
})
export default router