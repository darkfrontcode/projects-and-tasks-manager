import { Container } from "inversify";

export interface IOCPlug {
  plug: (container: Container) => void;
}
