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
    }}

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

    const title = `Beste ${data.name} Onderstaand het volledige resultaat van uw test.`

    let text = ``
    text += `<h2>Uw persoonlijke uitslag : </h2>`

    text += `<br/><b>Energie Level: </b>`

    if(Number(data.energyLevel.energielevel) <= 5 && Number(data.energyLevel.energielevel) >= 3.6) text += 'Je totale energiebeeld geeft aan dat je geen Burn-out hebt. Je energie is hoog genoeg om zelf te herstellen van eventuele klachten die je zou kunnen hebben. Zorg voor een gezond levensritme, met voldoende rust, beweging en gezond eten. Zoek je een methode om jezelf te ontwikkelen, je levensritme en je energie te leren kennen en onder controle leren brengen. We bieden een online begeleiding en training van je eigen energie via de cursus “De Yuan methode – Eén met je eigen energie”.'
    if(Number(data.energyLevel.energielevel) <= 3.5 && Number(data.energyLevel.energielevel) >= 2.9) text += 'Je totale energiebeeld geeft aan dat je nog geen Burn-out hebt. Je energie is echter wel degelijk aan de lage kant. Vraag eens advies en begeleiding van een huisarts, fysiotherapeut of personal coach. Je energie is zeker hoog genoeg om zelf te kunnen herstellen van dit lagere energieniveau en eventuele klachten die je zou kunnen hebben. Zorg in ieder geval voor dat je een tandje terugneemt in de belasting van je levensritme. Zorg voor voldoende rust, een gezonde slaap, voldoende maar geen uitputtende beweging en natuurlijk een gezonde voedzame maaltijd. Wil je jezelf ontwikkelen en je levensritme en je controle over je energie beheersen dan bieden we een online begeleiding en training van je eigen energie via de cursus “De Yuan methode – Eén met je eigen energie”.' 
    if(Number(data.energyLevel.energielevel) <= 2.8 && Number(data.energyLevel.energielevel) >= 2.2) text += 'Je totale energiebeeld geeft aan dat je een hogere vermoeidheidgraad tot een eerstegraads Burn-out hebt. Je bent welkom bij ons, maar je kunt er ook voor kiezen om in je eigen omgeving op je eigen resterende energie te herstellen. Het vraagt wel om aandacht en aanpak. We bieden een online begeleiding en training van je eigen energie via de cursus “De Yuan methode – Eén met je eigen energie”. Je kunt ook begeleiding zoeken bij je huisarts, je fysiotherapeut, een psychotherapeut en/of een personal trainer. Zorg dat je iemand hebt waar je vertrouwen in hebt en ga samen aan de slag om de belastende zaken uit je leven te halen, je levensritme te verbeteren en andere aanpassingen te maken.' 
    if(Number(data.energyLevel.energielevel) <= 2.1 && Number(data.energyLevel.energielevel) >= 1.6) text += 'Je totale energiebeeld geeft aan dat je een tweedegraads Burn-out hebt. Het is goed om een afspraak te maken voor je herstel bij ons in Thailand. Dit moet aangepakt worden omdat je energieniveau, je levensritme, je omgevingsfactoren en je andere klachten er samen voor zorgen dat je in een vicieuze cirkel komt of al bent gekomen. Je zult dit gedegen op meerdere fronten met een centrale draad voor jou moeten oplossen. We gaan je hierbij helpen en kunnen je weer je gezonde eigen ik terugbrengen  ' 
    if(Number(data.energyLevel.energielevel) <= 1.5) text += 'Je totale energiebeeld geeft aan dat je een derdegraads Burn-out hebt. Je energieniveau is op een gevaarlijk laag level. Het is belangrijk om zo snel mogelijk actie hierin te ondernemen en een afspraak bij ons in Thailand te maken. We gaan zorgen voor je rustritme, je levensritme, de opruiming van belastende zaken. Daarna kunnen we samen werken aan je opbouw en deze langzaam maar gestaag volgens een sterk plan inzetten. Een centrale lijn hierin, waarin iedereen weet wat er gebeuren moet en volgens hetzelfde plan kan werken, is essentieel.'

    text += '<br/><br/><b>Activerende Energie: </b>'
    if(Number(data.energyLevel.activerende) <= 2.2 && Number(data.energyLevel.activerende) >= 1.6) text += 'Er is een duidelijk tekort aan de energie die voor je activerende functies zorgt. Dit is dus de energie waarmee je iets doet, een karwei, maar ook intern voedsel omzetten, bloedsomloop en de opruiming van afvalstoffen. Het is echter nog niet zodanig dat dit een peil bereikt dat dit op de rest van je systeem een verder afbrekend effect heeft. Het herstellen van je activerende energie is wel een serieus aandachtspunt.'
    if(Number(data.energyLevel.activerende) <= 1.5) text += 'Het niveau van je activerende energie is veel te laag. Dit is de energie waarmee je iets doet, een karwei, maar ook intern voedsel omzetten, transport en schoonmaak. Dit zorgt ervoor dat je totale energie zich onvoldoende kan opbouwen, herstellen en verschonen. Het houdt het algehele niveau van je energie in een vicieuze cirkel of brengt het zelfs in een neerwaartse spiraal.'

    text += '<br/><br/><b>Energiereserve: </b>'
    if(Number(data.energyLevel.energiereserves) <= 2.5 && Number(data.energyLevel.energiereserves) >= 1.6) text += 'Je symptomen laten zien dat je je lichaamsreserves aan het verbruiken bent zonder ze voldoende op te bouwen. Dit zijn de reserves aan bouwstoffen, afweerstoffen, transportmiddelen en energieopslag. Je kunt nog wel een bepaalde balans hierin behouden, maar wanneer je energie verder af zal nemen, zullen ook je reserves verdwijnen en zal er op dit gebied een vicieuze cirkel of zelfs negatieve spiraal ontstaan.'
    if(Number(data.energyLevel.energiereserves) <= 1.5) text += 'Je lichaamsreserves zijn zover verminderd dat ze de normale circulatie van je energie verstoren. Dit zijn de reserves aan bouwstoffen, afweerstoffen, transportmiddelen en energieopslag. Door te weinig lichamelijke reserves, brand je op van binnen en komen je organen en/of je geest te weinig tot rust. Hierdoor worden de reserves niet aangevuld en een negatieve spiraal ontstaat. Deze zal snel omgekeerd moet worden zodat je systeem niet verder achteruitgaat met als eindresultaat een complete ineenstorting.'
    
    text += '<br/><br/><b>Blokerings niveau: </b>'
    if(Number(data.energyLevel.blokkade) <= 2.5 && Number(data.energyLevel.blokkade) >= 1.7) text += 'Je bent iemand die snel alles wat om je heen gebeurt in je opneemt. Daarmee blokkeer je op lichamelijke en geestelijke stressmomenten.'
    if(Number(data.energyLevel.blokkade) <= 1.6 && Number(data.energyLevel.blokkade) >= 1.1) text += 'Je manier waarop je dingen omgaat zorgt ervoor dat lichamelijk en emotioneel blokkeert. Ook al voel je dat niet altijd, sla je de dingen die om je heen gebeuren op en loop je daarop vast; Op je spieren, je bindweefsel, je organen en/of je bloedvoorziening.'
    if(Number(data.energyLevel.blokkade) <= 1.0) text += 'De stress in je leven, de manier van omgaan en je ritme zorgen ervoor dat je veel te veel blokkeert in je lijf. Processen in de spieren, in de zuivering van je lichaam, in je organen en in je bloedsomloop verlopen niet zoals het hoort.'
    
    text += '<br/><br/><b>Hypersensiviteit niveau: </b>'
    if(Number(data.energyLevel.hyper) <= 2.2 && Number(data.energyLevel.hyper) >= 1.6) text += 'Je gevoeligheid is hoger dan bij de gemiddelde mens. Je reageert daarom meer op de prikkels om je heen. Dit kost je energie. Je kunt deze verloren energie wel een rustige omgeving terugkrijgen.'
    if(Number(data.energyLevel.hyper) <= 1.5 && Number(data.energyLevel.hyper) >= 1.1) text += 'Je bent eigenlijk constant overprikkeld. Dit gaat ten koste van je energieopbouw en je energiezuivering. De overprikkeling wegnemen lukt je niet in de maatschappij waarin je leeft. Beter is het om je energielevel en daarmee je tolerantie te verhogen.'
    if(Number(data.energyLevel.hyper) <= 1.0) text += 'Je overprikkeling is op het hoogste niveau. Je energielevel en de mate van de overprikkeling houden elkaar in een zeer negatieve stand. Je gaat je terugtrekken en afzonderen waardoor de situatie alleen verslechtert. Je energie laat het echter niet toe om de ommekeer te maken. Dit moet vanuit het totale energielevel aangepakt worden.'

    text += '<br/><br/><b>Focus niveau: </b>'
    if(Number(data.energyLevel.focus) <= 2.4 && Number(data.energyLevel.focus) >= 1.6) text += 'Jezelf organiseren en je ergens op focussen is minder dan normaal. Dit hoeft nog geen problemen op te leveren, maar het is wel een aandachtspunt wat je zou kunnen aanpakken en trainen zodat er geen energie meer hierdoor verloren gaat.'
    if(Number(data.energyLevel.focus) <= 1.5 && Number(data.energyLevel.focus) >= 1.1) text += 'Je algehele niveau van focus is beneden peil. Er zijn zeker zaken in je leven die dit negatief beïnvloeden. Het schaadt je energie. Je levensritme en je rust en je energieniveau moeten verbeteren om dit aan te pakken.'
    if(Number(data.energyLevel.focus) <= 1.0) text += 'Je gebrek aan focus beïnvloedt het level van je energie en vice versa. De chaos in je hoofd en in je leven zorgen voor verder energieverlies. Alleen leren focussen of je geest tot rust brengen is niet genoeg. Er zullen zowel op lichamelijk, energetisch als geestelijk gebied verbeteringen ingezet moeten worden'

    text += '<h4>Let op deze uitslag geeft onze eerste bevinding. Wil je een meer diepgaande en uitgebreidere diagnose.  Vul dan je gegevens in en plan een gratis intake.</h4>'
    text += '<img src="https://i.imgur.com/OgnG0az.png" alt="Logo"></img>'
    text += `<br/><b>Met vriendelijke Groet</b>,<br/>Stanley van Lamoen<br/>www.amantiya.com<br/>+34 604 422875`

    sendEmail('Amanitya Burnout Quiz', data.email, title, text)
    
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