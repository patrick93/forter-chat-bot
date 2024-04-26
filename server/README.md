# Requirements

- NodeJS >= 20
- Docker or an instance of ElasticSearch

# Recommended Setup

- Run docker-compose file as it would start an instance of ElasticSearch and Kibana

  ```
  docker-compose up
  ```

  - ElasticSearch running on port 9200
  - Kibana running on port 5601

# Setup

- Run command to set ElasticSearch index schema

  ```
  npm run sync-es-schema
  ```

  By default, it assumes that the ElasticSearch instance is running on `http://localhost:9200`. You cna change the ElasticSearch host by setting the env variable `ES_URL`

- Run command to install dependencies

  ```
  npm install
  ```

- Run application

  ```
  npm run start:dev
  ```
