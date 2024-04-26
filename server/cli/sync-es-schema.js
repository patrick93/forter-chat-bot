import { Client } from '@elastic/elasticsearch';
import { CONFIG } from '../src/config/index.js';
import { initEsSchema } from '../src/schema/index.js';

async function run() {
  const esClient = new Client({ node: CONFIG.ES_URL });
  await initEsSchema(esClient);
}

run()
  .then(() => console.log('Done'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });