module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_user!, only: [ :create ]

      def create
        user = User.find_by(email: params[:email]&.downcase)
        if user && user.authenticate(params[:password])
          session[:user_id] = user.id
          render json: { message: "Logged in successfully", user: user.slice(:id, :email) }, status: :ok
        else
          render json: { message: "The specified credentials are incorrect" }, status: :unauthorized
        end
      end

      def show
        render json: { user: current_user.slice(:id, :email) }, status: :ok
      end
    end
  end
end
