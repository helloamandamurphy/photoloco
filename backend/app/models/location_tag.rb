class LocationTag < ApplicationRecord
  belongs_to :location
  belongs_to :tag
end
