class ApplicationController < ActionController::API
  before_action :authenticate_user!

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def authenticate_user!
    unless current_user
      render json: { error: "Not authenticated" }, status: :unauthorized
    end
  end
end
