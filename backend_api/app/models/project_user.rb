class ProjectUser < ApplicationRecord
  belongs_to :user
  belongs_to :project

  # validates :user_id, uniqueness: {
  #   scope: :project_id,
  #   message: "already has a project with this name"
  # }
end
