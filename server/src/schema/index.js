import { Client } from '@elastic/elasticsearch';
import schema from './es-index-schema.json' assert { type: 'json' };

export async function initEsSchema(esClient) {
  const promises = Object.keys(schema).map(async (indexName) => {
    const exists = await esClient.indices.exists({
      index: indexName,
    });
    if (!exists) {
      await esClient.indices.create({
        index: indexName,
        mappings: schema[indexName].mappings,
      });
    }
    await esClient.indices.putMapping({
      index: indexName,
      ...schema[indexName].mappings
    });
  });
  await Promise.all(promises);
}