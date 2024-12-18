import { useState, useEffect } from "react";

const useFetch = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"
      );
      const data = await response.json();
      setLanguages(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepositories = async (language) => {
    try {
      if (!language) {
        throw new Error("Nenhuma linguagem selecionada.");
      }
      setErro(null);
      setLoading(true);

      const response = await fetch(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`
      );

      const data = await response.json();
      const randomRep = Math.floor(Math.random() * data.items.length);
      setRepository(data.items[randomRep]);
    } catch (err) {
      setErro(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    languages,
    loading,
    erro,
    repository,
    fetchLanguages,
    fetchRepositories,
  };
};

export default useFetch;
