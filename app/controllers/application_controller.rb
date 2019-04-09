class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :ensure_signed_in
  def encode(payload)
    payload[:token] = JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def decode(token)
    begin
    body = JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
    HashWithIndifferentAccess.new body
    rescue
      nil
    end

  end

  def current_user
    @current_user ||= find_current_user
  end

  def find_current_user
    authenticate_with_http_token do | token, options |
      data = decode(token)
      data && User.find(data[:id])
    end
  end

  def ensure_signed_in
    return if current_user
    render nothing: true, status: 401
  end
end
