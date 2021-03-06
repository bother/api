const { MONGO_URI } = process.env

import { connect } from 'mongoose'

connect(MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export { Comment, CommentModel } from './comment'
export { Like, LikeModel } from './like'
export { Message, MessageModel } from './message'
export { Notification, NotificationModel } from './notification'
export { Post, PostModel } from './post'
export { Report, ReportModel } from './report'
export { Thread, ThreadModel } from './thread'
export { User, UserModel } from './user'
