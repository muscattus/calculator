export class DBError {
  message: string;
  name: string;
  constructor(message: string, name: string) {
    this.message = message;
    this.name = name;
  }

  static matchError() {
    return new DBError('Match search failed on db', 'SearchError');
  }

  static historyError() {
    return new DBError('History could not be loaded', 'HistoryLoadError');
  }

  static insertError() {
    return new DBError('Entry could not be inserted', 'InsertError');
  }
}