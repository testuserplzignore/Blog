class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :username, :email, :authorization, :created_at, :updated_at
  attribute :token do |user, params|
    params[:token]
  end

end
