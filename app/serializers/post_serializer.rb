class PostSerializer
  include FastJsonapi::ObjectSerializer
  set_id :id
  attributes :id, :title, :content, :created_at, :updated_at
  attribute :poster, &:user
  attribute :poster do |object|
    {
      poster_id: object.user.id,
      username: "#{object.user.username}",
      email: "#{object.user.email}"
    }
  end
end
