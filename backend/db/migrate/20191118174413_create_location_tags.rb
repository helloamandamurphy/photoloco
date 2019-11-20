class CreateLocationTags < ActiveRecord::Migration[5.2]
  def change
    create_table :location_tags do |t|
      t.belongs_to :location
      t.belongs_to :tag
      t.timestamps
    end
  end
end
