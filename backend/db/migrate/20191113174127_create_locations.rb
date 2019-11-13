class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name
      t.decimal :lat, precision: 9, scale: 6
      t.decimal :long, precision: 9, scale: 6

      t.timestamps
    end
  end
end
