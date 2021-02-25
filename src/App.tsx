import React from 'react';
import axios from 'axios';
import Card from './components/Card'

function App() {

  const [state, setState] = React.useState([]);
  const GITHUB_API_URL = "https://api.github.com/search/repositories";

  function onSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    const search = target.search.value; 
    getRepos(search);
  }

  function createQuery(language: string, minStars=50000) {
    let query = `stars:>${minStars} language:${language}`;
    return query;
  }

  interface ItemKeys {language: string, stargazers_count: number, name: string }


  async function getRepos(language: string, sort="stars", order="desc"): Promise<{}[]> {
    let query = createQuery(language);
    let params = {"q": query, "sort": sort, "order": order}

    // For Testing - Due to rate limits on github API
    // let res =  await axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => res);
    // let resStatus = res.status;

    let response = await axios.get(GITHUB_API_URL, { params });
    let responseStatus = response.status;

    if (responseStatus !== 200) {
        throw new Error(`${response.status}, Request was unsuccessful`);
    } else {
      setState(response.data["items"].map((item: any) => ({
        language: item.language,
        stargazers_count: item.stargazers_count,
        name: item.name
      }) as ItemKeys))
      // return response.data["items"];
      return response.data["items"].map((item: any) => ({
        language: item.language,
        stargazers_count: item.stargazers_count,
        name: item.name
      }) as ItemKeys);
    }
  }


  return (
    <div className="App">
      <form action="" onSubmit={onSubmit}>
        <label htmlFor="search">Search Git Repos:</label>
        <input type="text" id="search" aria-label="Search through git repos"></input>
        <input type="submit"/>
      </form>
      {state && state.map((item: any) => <Card />)}
    </div>
  );
}

export default App;
