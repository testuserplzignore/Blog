# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create(
  [
    {
      username: 'bob',
      email: 'bob@bob.com',
      password: 'pass',
    },
    {
      username: 'tom',
      email: 'tom@tom.com',
      password: 'pass',
    },
  ]
)

# posts = Post.create(
#   [
#     {
#       title: 'inoffensive title',
#       content: 'My favorite things',
#       user_id: 1,
#     },
#     {
#       title: 'more inoffensive',
#       content: 'meant to list this with the others but I forgot',
#       user_id: 1,
#     },
#   ]
# )
#
# comments = Comment.create(
#   [
#     {
#       title: 'inoffensive comment',
#       content: 'inoffensive content',
#       user_id: 2,
#       post_id: 1,
#     },
#     {
#       title: 'good point',
#       content: "I'll make a new post",
#       user_id: 1,
#       post_id: 1,
#     },
#   ]
# )
