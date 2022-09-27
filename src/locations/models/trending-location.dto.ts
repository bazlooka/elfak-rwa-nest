import { Grade } from '../grades/models/grade.model';

export class TrendingLocationDto {
  id: number;
  name: string;
  description: string;
  imagePath: string | null;
  publicationTime: Date;
  gradecount: number;
  averageGrade: number;
  typeName: string;
  myGrade?: Grade | any;
}
