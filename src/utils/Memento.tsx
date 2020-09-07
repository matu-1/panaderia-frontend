export class Memento {
  private state: object;
  constructor(state: object) {
    this.state = state;
  }

  public getState(): Object {
    return { state: this.state };
  }
}
