import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Field, ID, ObjectType } from 'type-graphql'

import { Message } from './message'
import { Post } from './post'
import { User } from './user'

@ObjectType()
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
@index({
  sender: 1,
  updatedAt: -1
})
@index({
  receiver: 1,
  updatedAt: -1
})
export class Thread extends TimeStamps {
  @Field(() => ID)
  id!: string

  @Field(() => Message)
  @prop({
    ref: 'Message'
  })
  last!: Ref<Message>

  @Field(() => Post)
  @prop({
    ref: 'Post',
    required: true
  })
  post!: Ref<Post>

  @Field(() => User)
  @prop({
    ref: 'User',
    required: true
  })
  sender!: Ref<User>

  @Field(() => User)
  @prop({
    ref: 'User',
    required: true
  })
  receiver!: Ref<User>

  @Field()
  @prop({
    default: false,
    type: Boolean
  })
  ended!: boolean

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

export const ThreadModel = getModelForClass(Thread)
