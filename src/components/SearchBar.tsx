import Button from './Forms/Button';
import Input from './Forms/Input';
import styles from './SearchBar.module.css';
import React from 'react';
import useFetch from '../Hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import useMedia from '../Hooks/useMedia';
import arrow from '../assets/arrow.png';
import { useForm } from 'react-hook-form';

type Data = {
  results: Pokemon[];
};

type Pokemon = {
  name: string;
  url: string;
};

const SearchBar = () => {
  const [pokemons, setPokemons] = React.useState<string[]>([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<string[] | null>(null);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const mobile = useMedia('(max-width: 40rem)');
  const navigate = useNavigate();
  const { data } = useFetch<Data>('https://pokeapi.co/api/v2/pokemon-species?limit=2000&offset=0');
  const { register } = useForm();

  React.useEffect(() => {
    if (data) {
      data.results.map((pokemon) => {
        setPokemons((p) => [...p, pokemon.name]);
      });
    }
  }, [data]);

  const onChangeHandler = (value: string) => {
    let matches: string[] = [];
    if (value.length) {
      matches = pokemons.filter((pokemon) => {
        const regex = new RegExp(`${value}`, 'gi');
        return pokemon.match(regex);
      });
    }
    setSuggestions(matches);
    setSearchValue(value);
  };

  const randomSearch = () => {
    const randomNumber = Math.floor(Math.random() * 1016);
    navigate(`/pokemon/${pokemons[randomNumber]}`);
  };

  return (
    <>
      <div className={`${styles.searchBar} ${mobile && styles.mobile} ${mobileMenu && mobile && styles.active}`}>
        <div>
          <div className={styles.suggestionsWrapper}>
            <Input
              name="search"
              label="Search"
              register={register}
              onChange={(e) => onChangeHandler(e.target.value)}
              onClick={() => setSearchValue('')}
              value={searchValue}
            />
            <div className={styles.suggestions}>
              <ul>
                {suggestions &&
                  suggestions.map((suggestion) => (
                    <Link key={suggestion} onClick={() => setSuggestions(null)} to={`/pokemon/${suggestion}`}>
                      <li>{suggestion}</li>
                    </Link>
                  ))}
              </ul>
            </div>
          </div>
          <span>Search a Pokemon by its name or pokedex number!</span>
        </div>
        <div>
          <Button onClick={randomSearch}>Pick a random one</Button>
          <span>Let us pick a random Pokemon for you!</span>
        </div>
      </div>
      {mobile && (
        <div className={styles.mobileContainer}>
          <Button className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} onClick={() => setMobileMenu(!mobileMenu)}>
            <img src={arrow} alt="" width={30} />
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchBar;
