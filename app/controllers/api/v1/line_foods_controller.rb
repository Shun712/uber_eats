module Api
  module V1
    class LineFoodsController < ApplicationController
      def index
        line_foods = LineFood.active
        if line_foods.exists?
          render json: {
            line_foods_ids: line_foods.map(&:id),
            restaurant: line_foods[0].restaurant,
            count: line_foods.sum(&:count),
            amount: line_foods.sum(&:total_amount)
          }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def create
        @ordered_food = Food.find(params[:food_id])
        # すでに他店舗の仮予約があれば、処理を中止
        if LineFood.active.other_restaurant(@ordered_food.restaurant.id).exists?
          return render json: {
            existing_restaurant: LineFood.other_restaurant(@ordered_food.restaurant.id).first.restaurant.name,
            new_restaurant: Food.find([:food_id]).restaurant.name
          }, status: :not_acceptable
        end

        # 予約するfoodをセットする
        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      def replace
        @ordered_food = Food.find(params[:food_id])
        Linefood.active.other_restaurant(@ordered_food.restaurant.id).each do |line_food|
          line_food.update(:active, false)
        end

        set_line_food(@ordered_food)

        if @line_food.save
          render json: {
            line_food: @line_food
          }, status: :created
        else
          render json: {}, status: :internal_server_error
        end
      end

      private

      def set_line_food(ordered_food)
        # 同じfoodなら追加する数を更新
        if ordered_food.line_food.present?
          @line_food = ordered_food.line_food
          @line_food.attributes = {
            count: ordered_food.line_food.count + params[:count],
            active: true
          }
        else
          # 新規のfoodなら数を登録
          @line_food = ordered_food.build_line_food(
            count: params[:count],
            restaurant: ordered_food.restaurant,
            active: true
          )
        end
      end
    end
  end
end
