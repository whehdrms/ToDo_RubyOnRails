class CreateMemos < ActiveRecord::Migration
  def change
    create_table :memos do |t|
      t.string :title
      t.text :content
      t.datetime :due, default: nil
      t.integer :priority, default: 1
      t.boolean :completed, default: false

      t.timestamps null: false
    end
  end
end
