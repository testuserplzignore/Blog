class User < ApplicationRecord
  has_secure_password
  validates_uniqueness_of :email, :username

  has_many :posts
  has_many :comments
  has_many :posts, through: :comments

  def self.find_by_credentials(email, password)
    user = self.find_by(email: email)
    return nil unless user
    user if user.is_password?(password)
  end

  def is_password?(password_attempt)
    BCrypt::Password.new(password_digest).is_password?(password_attempt)
  end
end
