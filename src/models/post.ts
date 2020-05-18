import {
  arrayProp,
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Field, Float, ID, Int, ObjectType } from 'type-graphql'

import { Comment } from './comment'
import { User } from './user'

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
@index({
  createdAt: -1,
  user: 1
})
@index({
  coordinates: '2d'
})
export class Post extends TimeStamps {
  @Field(() => ID)
  id!: string

  @Field()
  @prop({
    required: true
  })
  body!: string

  @Field(() => [Float])
  @prop({
    items: Number,
    required: true
  })
  coordinates!: [number]

  @Field(() => Int)
  @prop({
    default: 1
  })
  likes!: number

  @Field(() => [Comment])
  @arrayProp({
    foreignField: 'post',
    localField: '_id',
    options: {
      sort: {
        createdAt: 1
      }
    },
    ref: 'Comment'
  })
  comments!: Ref<Comment>[]

  @Field(() => User)
  @prop({
    ref: 'User',
    required: true
  })
  user!: Ref<User>

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

export const PostModel = getModelForClass(Post)
