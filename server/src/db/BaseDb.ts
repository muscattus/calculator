import MongoOperations from './mongo/MongoOperations';
import PostgresOperations from './postgres/PostgresOperations';

export function selectDb () {
  const envName = process.env.NODE_ENV?.trim();
  switch (envName) {
      case 'dev':
        return PostgresOperations;
      case 'test':
        return MongoOperations;
      default:
        return PostgresOperations
  }    
}