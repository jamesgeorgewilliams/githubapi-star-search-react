import React from 'react';
import axios from 'axios';
import Canvas from './components/Canvas'
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

    if (search) {
      getRepos(search);
    }
  }

  function createQuery(language: string, minStars=10000) {
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
      setState(response.data["items"].slice(0, 12).map((item: ItemKeys) => ({
        language: item.language,
        stargazers_count: item.stargazers_count,
        name: item.name
      }) as ItemKeys))
      return response.data["items"].map((item: ItemKeys) => ({
        language: item.language,
        stargazers_count: item.stargazers_count,
        name: item.name
      }) as ItemKeys);
    }
  }


  return (
    <div className="App">
      <Canvas />
      <main className="page">
        <div className="container">
          <p className="logo"><b>github</b><span>stars</span></p>
          <form action="" onSubmit={onSubmit}>
            <label htmlFor="search">Language</label>
            <input type="text" id="search" aria-label="Search through git repos"></input>
            <input type="submit"/>
          </form>
          <div className="list">
            <ul>
              {state && state.map((item: ItemKeys) => <Card {...item} key={item.name} />)}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
