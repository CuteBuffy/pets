import { useState, useEffect } from 'react'

export default function Search() {

  const [timeoutId, setTimeoutId] = useState();
  const [textValue, setTextValue] = useState('')

  const [petsData, setPetsData] = useState(null)
  const [petsRap, setPetsRap] = useState(null)

  const getText = e => {
    const { value } = e.target
    setTextValue(value)
  }

  useEffect(() => {
    const getPets = async () => {
      try {
        const res = await fetch("/api/collection/Pets");
        const data = await res.json();
        setPetsData(data);
      } catch (error) {
        console.error("Error fetching pets data:", error);
      }
    };

    getPets();
  }, []);

  useEffect(() => {
    const getRap = async () => {
      try {
        const res = await fetch("/api/rap");
        const data = await res.json();
        setPetsRap(data);
      } catch (error) {
        console.error("Error fetching rap data:", error);
      }
    };

    getRap();
  }, []);

  const handleClick = () => {
    console.log(petsRap)
  }

  const petElem = petsData ? petsData.data.filter(pet => {
    return textValue === '' ? pet.configName : pet.configName.toLowerCase().includes(textValue)
  }).map(pet => {
    return (
      (pet.category === 'Huge' || pet.category === 'Titanic') && <div key={pet.configName} className="pet__container">
        <h3 className='pet__name'>{pet.configName}</h3>
        <p className='pet__rap'>{petsRap.data.map(petRap => {
          return (!petRap.configData.hasOwnProperty("pt") && !petRap.configData.hasOwnProperty("sh")) && petRap.configData.id === pet.configName && petRap.value
        })}</p>
      </div>
    )
  }) : <p className='loading__text'>Loading...</p>

  return (
    <>
      <div className="search__wrapper">
        <input
          onChange={getText}
          className="search__input"
          placeholder="Search For Pet" />
        <button onClick={handleClick} className="search__btn">
          <img className="search__img" src="./icons/search.svg" alt="" />
        </button>
      </div>
      <div className="pets__container">
        {petElem}
      </div>
    </>
  );
}