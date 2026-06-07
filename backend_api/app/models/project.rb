class Project < ApplicationRecord
  has_many :project_users, dependent: :destroy
  has_many :users, through: :project_users
  has_many :issues, dependent: :destroy

  validates :name, presence: true
end
