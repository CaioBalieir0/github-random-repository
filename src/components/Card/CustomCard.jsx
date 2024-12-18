import { Card, Form, Spinner, Button, Alert, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GoRepoForked, GoStarFill } from "react-icons/go";
import "./style.css";

export default function CustomCard() {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [repository, setRepository] = useState([]);

  const fetchSelectLanguage = async () => {
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

  useEffect(() => {
    fetchSelectLanguage();
  }, []);

  const handleChange = (event) => setSelectedLanguage(event.target.value);

  return (
    <Card>
      <Card.Body>
        <Card.Title className="d-flex justify-content-center align-items-center gap-2">
          <div className="logo-span"></div>
          GitHub Repository Finder
        </Card.Title>
        <Card.Text>
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <Form.Select
              className="mt-5 mb-4"
              onChange={handleChange}
              value={selectedLanguage}
            >
              {languages.map((item) => {
                return (
                  <option key={item.value} value={item.value}>
                    {item.title}
                  </option>
                );
              })}
            </Form.Select>
          )}
          <div>
            {loading ? (
              <Alert variant="secondary">
                Loading, please wait <Spinner />
              </Alert>
            ) : erro ? (
              !selectedLanguage ? (
                <Alert variant="secondary">Please select a language</Alert>
              ) : (
                <Alert variant="danger">{erro}</Alert>
              )
            ) : (
              <div className="rep p-4">
                <h2>
                  <a href={repository.html_url} target="_blank">
                    {repository.name}
                  </a>
                </h2>
                <p className="lead fs-6 mt-3">{repository.description}</p>
                <Stack direction="horizontal" gap={3}>
                  <div className="d-flex align-items-bottom gap-1">
                    <GoStarFill style={{ color: "gold" }} />
                    <p>{repository.stargazers_count}</p>
                  </div>
                  <div className="d-flex align-items-bottom">
                    <GoRepoForked style={{ color: "black" }} />
                    <p>{repository.forks_count}</p>
                  </div>
                </Stack>
              </div>
            )}
          </div>
          {selectedLanguage && !erro && (
            <Button
              variant="info"
              onClick={() => fetchRepositories(selectedLanguage)}
              className="mt-4"
            >
              Refresh
            </Button>
          )}
          {selectedLanguage && erro && (
            <Button
              variant="danger"
              onClick={() => fetchRepositories(selectedLanguage)}
              className="mt-4"
            >
              Retry
            </Button>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
