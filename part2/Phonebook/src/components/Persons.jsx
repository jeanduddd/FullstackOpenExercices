const Persons = ({persons, filter}) => {
    return (
        <>
            {persons.map(person => person.name.toLowerCase().includes(filter.toLowerCase()) ? <p key={person.name}>{person.name}  {person.number}</p> : <div key={person.name}></div>)}
        </>
    )
}

export default Persons