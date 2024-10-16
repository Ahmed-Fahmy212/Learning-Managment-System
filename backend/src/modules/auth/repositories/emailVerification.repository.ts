import { BaseEntity, DataSource, Repository } from "typeorm";
import { Injectable, Inject } from "@nestjs/common";
import { EmailVerification } from "src/modules/users/entities/email-verification.entity";
import { BaseRepository } from "src/common/base-repository";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { IFilterEmailVerification } from "../interfaces/filter-email-verification.interface";
import { ICreateEmailVerification } from "../interfaces/create-email-verification.interface";

@Injectable()
export class EmailVerificationRepository extends BaseRepository {

  constructor(dataSource: DataSource, @Inject(REQUEST) req: Request) {
    super(dataSource, req);
  }

  public async getEmailVerificationData(payload: IFilterEmailVerification) {
    const query = this.getRepository(EmailVerification).createQueryBuilder('emailVerification');


    const x = await query.where('emailVerification.email = :email', { email: payload.email }).getOne();
    console.log('payload', payload)
    console.log('💛💛query', x)
    return x
  }

  public async createEmailVerification(payload: ICreateEmailVerification) {
    return await this.getRepository(EmailVerification)
      .createQueryBuilder('emailVerification')
      .insert()
      .values(payload)
      .execute();
  }
  public async deleteForgottenPasswordTokenById(id: string) {
    return this.getRepository(EmailVerification).delete(id);
  }

}
