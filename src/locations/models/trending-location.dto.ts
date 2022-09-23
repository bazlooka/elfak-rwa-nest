export class TrendingLocationDto {
  id: number;
  name: string;
  description: string;
  imagePath: string | null;
  publicationTime: Date;
  gradecount: number;
  averageGrade: number;
  typeName: string;
}
