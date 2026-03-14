const Filter = ({ filterPersons, handleFilter }) => {
    return(
        <div>filter shown with <input value={filterPersons} onChange={handleFilter}/></div>
    )
}

export default Filter