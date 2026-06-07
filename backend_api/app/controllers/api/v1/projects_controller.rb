module Api
  module V1
    class ProjectsController < ApplicationController
      before_action :set_project, only: [ :show, :update, :destroy ]

      def index
        @projects = current_user.projects
        render json: @projects
      end

      def show
        render json: @project, include: :issues
      end

      def create
        @project = Project.new(project_params)

        Project.transaction do
          if @project.save
            @project.project_users.create!(user: current_user)

            render json: @project, status: :created
          else
            render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
          end
        rescue ActiveRecord::RecordInvalid => e
          render json: { errors: [ e.message ] }, status: :unprocessable_entity
        end
      end

      def update
        if @project.update(project_params)
          render json: @project
        else
          render json: { errors: @project.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @project.destroy
        head :no_content
      end

      private

      def set_project
        @project = current_user.projects.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Project not found" }, status: :not_found
      end

      def project_params
        params.expect(project: [ :name, :description ])
      end
    end
  end
end
