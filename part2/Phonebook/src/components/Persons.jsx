const Persons = ({ persons, filter, deletion }) => {
  return (
    <>
      {persons.map((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase()) ? (
          <div key={person.name}>
            {" "}
            <p>
              {person.name} {person.number}
            </p>{" "}
            <button onClick={() => deletion(person)}>delete</button>{" "}
          </div>
        ) : (
          <div key={person.name}></div>
        ),
      )}
    </>
  );
};

export default Persons;
