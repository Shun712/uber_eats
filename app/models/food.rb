class Food < ApplicationRecord
  belongs_to :restaurant
  # optional: trueは関連付け先が存在しなくても良い。
  belongs_to :order, optional: true
  has_one :line_food
end
