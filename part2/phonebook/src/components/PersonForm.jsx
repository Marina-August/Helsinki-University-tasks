
const PersonForm =({submitHandler, newName, changeNameHandler, newNumber, changeNumberHandler})=>{
    return(
        <form onSubmit={submitHandler}>
        <div>
          name: <input 
          value={newName}
          onChange={changeNameHandler}/>
        </div>
        <div>number: <input 
        value={newNumber}
        onChange={changeNumberHandler}/>
        </div>
        <div>
          <button type="submit" className="button">add</button>
        </div>
      </form>
    )
}

export default PersonForm