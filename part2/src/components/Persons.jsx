const Persons = ({ persons, filterPersons }) => {
    //Filtriran niz za search
    const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterPersons.toLowerCase()))

    return(
        <div>{personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>
    )
}

export default Persons