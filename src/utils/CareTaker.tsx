import { Memento } from "./Memento";

export class CareTaker {
  private estados: Memento[] = [];
  private position: number = -1;
  public addMemento(estado: Memento) {
    if (!this.sincronizar()) {
      this.estados = this.estados.slice(0, this.position + 1);
    }
    this.estados.push(estado);
    this.position++;
  }

  public getMemento(index: number): Memento {
    return this.estados.slice(index, index).pop();
  }

  public stateLength(): number {
    return this.estados.length;
  }

  public getPosition(): Memento {
    if (this.position > -1) {
      return this.estados[this.position];
    }
    throw Error("Fuera de rango");
  }

  public getPositionIndex(): number {
    return this.position;
  }

  private sincronizar() {
    return this.position === this.stateLength() - 1;
  }

  public back(): Memento {
    if (this.position === -1) throw Error("No se puede volver atras");

    if (this.position === 0) {
      return this.estados[0];
    }
    this.position--;
    return this.estados.slice(this.position, this.position + 1).pop();
  }

  public forward(): Memento {
    if (this.position === -1) throw Error("No se puede ir adelante");
    if (this.position === this.stateLength() - 1) {
      return this.estados[this.position];
    }
    this.position++;
    return this.estados.slice(this.position, this.position + 1).pop();
  }

  public removeLast() {
    this.estados.pop();
  }
}
