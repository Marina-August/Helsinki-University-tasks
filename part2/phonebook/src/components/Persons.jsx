
const Persons =({persons, deleteHandler})=>{
    return(
        <div>
            {persons.map(person=>
                <div key={person.id} className="person_container">
                    {person.name} {person.number}
                    <button className="button" onClick={()=>deleteHandler(person.id, person.name)}>delete</button>
                </div>)}
        </div>
    )
}

export default Persons