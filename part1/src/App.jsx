import { useState } from "react";

//Buttons for student's feedback
const Button = ({text, variable, setVar}) => {
    const handleClick = () => {
        setVar(variable + 1)
    } 

    return(<button onClick={handleClick}>{text}</button>)
}

//Component displaying a single statistic
const StatisticsLine = ({text, value}) => {
    return(
        <>
            <td>{text}</td>
            <td>{value}</td>
        </>
    )
}

//Statistics component for feedback 
const Statistics = ({good, neutral, bad}) => {
    if(good > 0 || neutral > 0 || bad > 0) {
        let statesSum = good + bad + neutral

        return(
            <>
                <table>
                    <tbody>
                        <tr>
                            <StatisticsLine text={"good"} value={good}/>
                        </tr>
                        <tr>
                            <StatisticsLine text={"neutral"} value={neutral}/>
                        </tr>
                        <tr>
                            <StatisticsLine text={"bad"} value={bad}/>
                        </tr>
                        <tr>
                            <StatisticsLine text={"all"} value={statesSum}/>
                        </tr>
                        <tr>
                            <StatisticsLine text={"average"} value={(good - bad) / statesSum}/>
                        </tr>
                        <tr>
                            <StatisticsLine text={"positive"} value={good / statesSum * 100 + " %"}/>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    } else 
        return(<div>No feedback given</div>)
}

//Component for rating the anecdote
const VotingButton = ({settingVote, votingArray, selectedEl}) => {
    const handleClick = () => {
        const copy = [...votingArray]        
        copy[selectedEl] += 1

        settingVote(copy)
    }

    return(<button onClick={handleClick}>vote</button>)
}

//Component that displays the random anecdote
const NextAnecdote = ({anecdotesLength, selectedVal}) => {
    const handleClick = () => {
        const randomNumber = Math.floor(Math.random() * anecdotesLength)
        
        selectedVal(randomNumber)
    }

    return(<button onClick={handleClick}>next anecdote</button>)
}

//Finding the anecdote that has the most votes
const AnecdoteFinder = ({anecdotesArray, votingArray}) => {
    //Linear search
    let votingMax = votingArray[0]
    
    votingArray.forEach(element => {
        if(element > votingMax)
            votingMax = element
    })

    const votingMaxIndex = votingArray.indexOf(votingMax)

    return(
        <>
            <div>{anecdotesArray[votingMaxIndex]}</div>
            <div>has {votingArray[votingMaxIndex]} votes</div>
        </>
    )
}

//Root component
const App = () => {
    const anecdotes = [
        "If it hurts, do it more often",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 90 percent of the development time... The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well."
    ]

    const [selected, setSelected] = useState(0)

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const [vote, setVote] = useState(() => Array(anecdotes.length).fill(0))

    return(
        <div>
            <h2>give feedback</h2>

            <Button text={"good"} variable={good} setVar={setGood}/>
            <Button text={"neutral"} variable={neutral} setVar={setNeutral}/>
            <Button text={"bad"} variable={bad} setVar={setBad}/>
            
            <h2>statistics</h2>

            <Statistics good={good} neutral={neutral} bad={bad}/>

            <br />
            <div>{anecdotes[selected]}</div>
            <div>has {vote[selected]} votes</div>
            <VotingButton settingVote={setVote} votingArray={vote} selectedEl={selected}/>
            <NextAnecdote selectedVal={setSelected} anecdotesLength={anecdotes.length}/>

            <h2>Anecdote with most votes</h2>

            <AnecdoteFinder anecdotesArray={anecdotes} votingArray={vote}/>
        </div>
    )
}

export default App