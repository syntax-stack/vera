module Api
  module V1
    class IssuesController < ApplicationController
      before_action :set_project, only: [ :index, :create ]
      before_action :set_issue, only: [ :show, :update, :destroy ]

      def index
        @issues = @project.issues
        render json: @issues
      end

      def show
        render json: @issue
      end

      def create
        @issue = @project.issues.new(issue_params)

        if @issue.save
          render json: @issue, status: :created
        else
          render json: { errors: @issue.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        if @issue.update(issue_params)
          render json: @issue
        else
          render json: { errors: @issue.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @issue.destroy
        head :no_content
      end

      private

      def set_project
        @project = current_user.projects.find(params[:project_id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Project not found" }, status: :not_found
      end

      def set_issue
        @issue = Issue.find(params[:id])

        unless current_user.projects.exists?(@issue.project_id)
          render json: { error: "Issue not found" }, status: :not_found
        end
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Issue not found" }, status: :not_found
      end

      def issue_params
        params.expect(issue: [ :title, :description, :assignee_id ])
      end
    end
  end
end
