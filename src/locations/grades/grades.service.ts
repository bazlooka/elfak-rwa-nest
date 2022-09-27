import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/models/user.model';
import { Grade } from './models/grade.model';
import { GradeUpdateDto } from './models/grade.update.dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>,
  ) {}

  public getUserGrade(locationId: number, userId: number) {
    return this.gradeRepository
      .createQueryBuilder('grade')
      .where('grade.locationId = :locationId and grade.gradedById = :userId', {
        locationId,
        userId,
      })
      .getOne();
  }

  public async gradeLocation(dto: GradeUpdateDto, user: User) {
    if (!dto.locationId) {
      return null;
    }
    const grade = await this.getUserGrade(dto.locationId, user.id);

    let savedGrade;

    if (grade) {
      savedGrade = await this.gradeRepository.save({ ...grade, ...dto });
    } else {
      const newGrade = this.gradeRepository.create({
        ...dto,
        gradedBy: user,
        location: { id: dto.locationId },
      });
      savedGrade = await this.gradeRepository.save(newGrade);
    }

    const locationGrades = await this.gradeRepository.findBy({
      location: { id: dto.locationId },
    });

    const sum = locationGrades
      .map((grade) => grade.rating)
      .reduce((acc, curr) => acc + curr, 0);

    const averageGrade = Math.round((sum / locationGrades.length) * 10) / 10;

    return {
      locationId: dto.locationId,
      savedGrade,
      averageGrade,
      gradeCount: locationGrades.length,
    };
  }
}
