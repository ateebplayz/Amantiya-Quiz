import _ from "lodash";

export interface Question {
  question: string,
  answer: number,
  startVal: string,
  endVal: string,
  category: 'Energielevel' | 'Peil activerende energie' | 'Blokkade' | 'Naveau van focus' | 'Hypersensiviteit' | 'Energiereserves'
}

export interface Result {
    algemeenGrads: number,
    type: 'De Overload Burnout' | 'De Chaotic Burnout' | 'De Hypersensitive Burnout' | 'De Rockbottom Burnout' | 'De Burnout Shutdown',
    energyLevel: {
        energielevel: number,
        activerende: number,
        blokkade: number,
        focus: number,
        hyper: number,
        energiereserves: number
    }
}

export interface EnergyLevels {
    energielevel: number, 
    activerende: number, 
    blokkade: number, 
    focus: number, 
    hyper: number, 
    energiereserves: number
}

function energyLevel(questions: Question[]): EnergyLevels {
    // Active Energie Level
    let activeEnergyLevel = 0
    let activeEnergyQuestions = questions.filter(q=>q.category=='Peil activerende energie')
    activeEnergyQuestions.sort((a,b)=>a.answer-b.answer)
    let activeEnergyQuestionsLowFour = activeEnergyQuestions.slice(0,4)
    activeEnergyQuestionsLowFour.forEach(q=>{activeEnergyLevel+=q.answer; console.log(`active energy level ${q.answer}`)})
    activeEnergyLevel = activeEnergyLevel/8
    activeEnergyLevel = Number(activeEnergyLevel.toFixed(1))
    
    // Energyreserves
    let reservedEnergyLevel = 0
    let reservedEnergyLevelQuestions = questions.filter(q=>q.category=='Energiereserves')
    reservedEnergyLevelQuestions.sort((a,b)=>a.answer-b.answer)
    let reservedEnergyLevelQuestionsLowFour = reservedEnergyLevelQuestions.slice(0,4)
    reservedEnergyLevelQuestionsLowFour.forEach(q=>reservedEnergyLevel+=q.answer)
    reservedEnergyLevel = reservedEnergyLevel/8
    reservedEnergyLevel = Number(reservedEnergyLevel.toFixed(1))

    // EnergieLevelAlgemeen
    let firstEnergyLevel = 0
    let firstEnergyQuestions = questions.filter((q)=>q.category=='Energielevel')
    firstEnergyQuestions.forEach(q=>firstEnergyLevel += q.answer)
    firstEnergyLevel = (firstEnergyLevel / 13) / 2
    firstEnergyLevel = Number(firstEnergyLevel.toFixed(1))
    if(activeEnergyLevel <= 1.2 && firstEnergyLevel > 1) firstEnergyLevel -= 1
    if(reservedEnergyLevel <= 1.2 && firstEnergyLevel > 1) firstEnergyLevel -= 1
    
    // Blokkade
    let blockingLevel = 0
    let blockingLevelQuestions = questions.filter(q=>q.category=='Blokkade')
    blockingLevelQuestions.sort((a,b)=>a.answer-b.answer)
    let blockingLevelQuestionsLowFour = blockingLevelQuestions.slice(0,4)
    blockingLevelQuestionsLowFour.forEach(q=>blockingLevel+=q.answer)
    blockingLevel = blockingLevel/8
    blockingLevel = Number(blockingLevel.toFixed(1))
    
    // Hyper
    let hypersensitivityLevel = 0
    let hypersensitivityLevelQuestions = questions.filter(q=>q.category=='Hypersensiviteit')
    hypersensitivityLevelQuestions.sort((a,b)=>a.answer-b.answer)
    let hypersensitivityLevelQuestionsLowFour = hypersensitivityLevelQuestions.slice(0,3)
    hypersensitivityLevelQuestionsLowFour.forEach(q=>hypersensitivityLevel+=q.answer)
    hypersensitivityLevel = hypersensitivityLevel/6
    hypersensitivityLevel = Number(hypersensitivityLevel.toFixed(1))
    
    // Focus
    let focusLevel = 0
    let focusLevelQuestions = questions.filter(q=>q.category=='Naveau van focus')
    focusLevelQuestions.sort((a,b)=>a.answer-b.answer)
    let focusLevelQuestionsLowFour = focusLevelQuestions.slice(0,3)
    focusLevelQuestionsLowFour.forEach(q=>focusLevel+=q.answer)
    focusLevel = focusLevel/6
    focusLevel = Number(focusLevel.toFixed(1))

	return {
        energielevel: firstEnergyLevel,
        activerende: activeEnergyLevel,
        blokkade: blockingLevel,
        focus: focusLevel,
        hyper: hypersensitivityLevel,
        energiereserves: reservedEnergyLevel
    }
}

export function getResults(questions: Array<Question>): Result {
    // Getting energy Levels
    const energyLevels = energyLevel(questions)
    // Initialization
    let result: Result = {
        algemeenGrads: 0,
        type: 'De Overload Burnout',
        energyLevel: energyLevels
    }
    // Calculating algemeen Grads
    if(energyLevels.energielevel <= 2.8 && energyLevels.energielevel > 2.2) result.algemeenGrads = 1
    if(energyLevels.energielevel <= 2.2 && energyLevels.energielevel > 1.6) result.algemeenGrads = 2
    if(energyLevels.energielevel <= 1.5) result.algemeenGrads = 3

    // Calculating type
    if(energyLevels.energielevel <= 2.8 && energyLevels.energielevel >= 2.2) result.type = 'De Overload Burnout'
    if(energyLevels.energielevel <= 2.2 && energyLevels.focus >= 1.5) result.type = 'De Chaotic Burnout'
    if(energyLevels.energielevel <= 2.2 && energyLevels.hyper >= 1.5) result.type = 'De Hypersensitive Burnout'
    if(energyLevels.energielevel <= 1.5 && energyLevels.energiereserves <= 1.5) result.type = 'De Rockbottom Burnout'
    if(energyLevels.energielevel <= 1.5 && energyLevels.blokkade <= 1.0) result.type = 'De Burnout Shutdown'
    return result
}