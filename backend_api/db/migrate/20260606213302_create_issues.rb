class CreateIssues < ActiveRecord::Migration[8.1]
  def change
    create_table :issues do |t|
      t.string :title, null: false
      t.text :description
      t.string :status, null: false, default: "To Do"
      t.references :project, null: false, foreign_key: true
      t.references :assignee, null: true, foreign_key: { to_table: :users }

      t.timestamps
    end

    add_index :issues, [ :project_id, :title ], unique: true
  end
end
