import { Card, Form, Spinner, Button, Alert, Stack } from "react-bootstrap";
import { useState } from "react";
import { GoRepoForked, GoStarFill } from "react-icons/go";
import useFetch from "./hooks/useFetch";
import "./style.css";

export default function CustomCard() {
  const { languages, loading, erro, repository, fetchRepositories } =
    useFetch();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

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
            {selectedLanguage === null ? (
              <Alert variant="secondary">Please select a language</Alert>
            ) : loading ? (
              <Alert variant="secondary">
                Loading, please wait <Spinner />
              </Alert>
            ) : erro ? (
              <Alert variant="danger">{erro}</Alert>
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
