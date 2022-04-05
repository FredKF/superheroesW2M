import { Appearance } from "./appearance";
import { Biography } from "./biography";
import { Connections } from "./connections";
import { Powerstats } from "./power-stats";
import { Work } from "./work";
import { Images } from "./images";

export interface SuperHero {
  id: number;
  name: string;
  slug: string;
  powerstats?: Powerstats;
  appearance?: Appearance;
  biography?: Biography;
  work?: Work;
  connections?: Connections;
  images?: Images;
}