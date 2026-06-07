class User < ApplicationRecord
  has_secure_password

  has_many :project_users, dependent: :destroy
  has_many :projects, through: :project_users

  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP, message: "Must be a valid email address" }, length: { maximum: 255 }
  validates :password, length: { minimum: 8 } # allow_nil: true ; by allowing nil we can update user profile without typing password

  before_save :downcase_email

  private

  def downcase_email
    self.email = email.downcase if email.present?
  end
end
