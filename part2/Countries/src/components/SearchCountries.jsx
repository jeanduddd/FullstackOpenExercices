const SearchCountries = ({searchedValue, onChange}) => {
    return (
        <>
        <p>find countries</p>
        <input value={searchedValue} onChange={onChange}></input>
        </>
    )
}

export default SearchCountries