class Issue < ApplicationRecord
  belongs_to :project
  belongs_to :assignee, class_name: "User", foreign_key: "assignee_id", optional: true

  validates :title, presence: true, uniqueness: { scope: :project_id, message: "should be unique within this project" }
end
